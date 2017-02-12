package io.alex.web.rest;

import io.alex.SimpleApp;

import io.alex.domain.Security;
import io.alex.repository.SecurityRepository;
import io.alex.service.SecurityService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.alex.domain.enumeration.Currency;
/**
 * Test class for the SecurityResource REST controller.
 *
 * @see SecurityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SimpleApp.class)
public class SecurityResourceIntTest {

    private static final String DEFAULT_TICKER = "AAAAAAAAAA";
    private static final String UPDATED_TICKER = "BBBBBBBBBB";

    private static final Long DEFAULT_ISSUED_UNITS = 1L;
    private static final Long UPDATED_ISSUED_UNITS = 2L;

    private static final BigDecimal DEFAULT_SPOT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_SPOT_PRICE = new BigDecimal(2);

    private static final Currency DEFAULT_CURRENCY = Currency.AUD;
    private static final Currency UPDATED_CURRENCY = Currency.USD;

    @Inject
    private SecurityRepository securityRepository;

    @Inject
    private SecurityService securityService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restSecurityMockMvc;

    private Security security;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SecurityResource securityResource = new SecurityResource();
        ReflectionTestUtils.setField(securityResource, "securityService", securityService);
        this.restSecurityMockMvc = MockMvcBuilders.standaloneSetup(securityResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Security createEntity(EntityManager em) {
        Security security = new Security()
                .ticker(DEFAULT_TICKER)
                .issuedUnits(DEFAULT_ISSUED_UNITS)
                .spotPrice(DEFAULT_SPOT_PRICE)
                .currency(DEFAULT_CURRENCY);
        return security;
    }

    @Before
    public void initTest() {
        security = createEntity(em);
    }

    @Test
    @Transactional
    public void createSecurity() throws Exception {
        int databaseSizeBeforeCreate = securityRepository.findAll().size();

        // Create the Security

        restSecurityMockMvc.perform(post("/api/securities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(security)))
            .andExpect(status().isCreated());

        // Validate the Security in the database
        List<Security> securityList = securityRepository.findAll();
        assertThat(securityList).hasSize(databaseSizeBeforeCreate + 1);
        Security testSecurity = securityList.get(securityList.size() - 1);
        assertThat(testSecurity.getTicker()).isEqualTo(DEFAULT_TICKER);
        assertThat(testSecurity.getIssuedUnits()).isEqualTo(DEFAULT_ISSUED_UNITS);
        assertThat(testSecurity.getSpotPrice()).isEqualTo(DEFAULT_SPOT_PRICE);
        assertThat(testSecurity.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
    }

    @Test
    @Transactional
    public void createSecurityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = securityRepository.findAll().size();

        // Create the Security with an existing ID
        Security existingSecurity = new Security();
        existingSecurity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSecurityMockMvc.perform(post("/api/securities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingSecurity)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Security> securityList = securityRepository.findAll();
        assertThat(securityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTickerIsRequired() throws Exception {
        int databaseSizeBeforeTest = securityRepository.findAll().size();
        // set the field null
        security.setTicker(null);

        // Create the Security, which fails.

        restSecurityMockMvc.perform(post("/api/securities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(security)))
            .andExpect(status().isBadRequest());

        List<Security> securityList = securityRepository.findAll();
        assertThat(securityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSecurities() throws Exception {
        // Initialize the database
        securityRepository.saveAndFlush(security);

        // Get all the securityList
        restSecurityMockMvc.perform(get("/api/securities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(security.getId().intValue())))
            .andExpect(jsonPath("$.[*].ticker").value(hasItem(DEFAULT_TICKER.toString())))
            .andExpect(jsonPath("$.[*].issuedUnits").value(hasItem(DEFAULT_ISSUED_UNITS.intValue())))
            .andExpect(jsonPath("$.[*].spotPrice").value(hasItem(DEFAULT_SPOT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())));
    }

    @Test
    @Transactional
    public void getSecurity() throws Exception {
        // Initialize the database
        securityRepository.saveAndFlush(security);

        // Get the security
        restSecurityMockMvc.perform(get("/api/securities/{id}", security.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(security.getId().intValue()))
            .andExpect(jsonPath("$.ticker").value(DEFAULT_TICKER.toString()))
            .andExpect(jsonPath("$.issuedUnits").value(DEFAULT_ISSUED_UNITS.intValue()))
            .andExpect(jsonPath("$.spotPrice").value(DEFAULT_SPOT_PRICE.intValue()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSecurity() throws Exception {
        // Get the security
        restSecurityMockMvc.perform(get("/api/securities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSecurity() throws Exception {
        // Initialize the database
        securityService.save(security);

        int databaseSizeBeforeUpdate = securityRepository.findAll().size();

        // Update the security
        Security updatedSecurity = securityRepository.findOne(security.getId());
        updatedSecurity
                .ticker(UPDATED_TICKER)
                .issuedUnits(UPDATED_ISSUED_UNITS)
                .spotPrice(UPDATED_SPOT_PRICE)
                .currency(UPDATED_CURRENCY);

        restSecurityMockMvc.perform(put("/api/securities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSecurity)))
            .andExpect(status().isOk());

        // Validate the Security in the database
        List<Security> securityList = securityRepository.findAll();
        assertThat(securityList).hasSize(databaseSizeBeforeUpdate);
        Security testSecurity = securityList.get(securityList.size() - 1);
        assertThat(testSecurity.getTicker()).isEqualTo(UPDATED_TICKER);
        assertThat(testSecurity.getIssuedUnits()).isEqualTo(UPDATED_ISSUED_UNITS);
        assertThat(testSecurity.getSpotPrice()).isEqualTo(UPDATED_SPOT_PRICE);
        assertThat(testSecurity.getCurrency()).isEqualTo(UPDATED_CURRENCY);
    }

    @Test
    @Transactional
    public void updateNonExistingSecurity() throws Exception {
        int databaseSizeBeforeUpdate = securityRepository.findAll().size();

        // Create the Security

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSecurityMockMvc.perform(put("/api/securities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(security)))
            .andExpect(status().isCreated());

        // Validate the Security in the database
        List<Security> securityList = securityRepository.findAll();
        assertThat(securityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSecurity() throws Exception {
        // Initialize the database
        securityService.save(security);

        int databaseSizeBeforeDelete = securityRepository.findAll().size();

        // Get the security
        restSecurityMockMvc.perform(delete("/api/securities/{id}", security.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Security> securityList = securityRepository.findAll();
        assertThat(securityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
