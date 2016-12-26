package io.alex.hipstershares.web.rest;

import io.alex.hipstershares.HipsterSharesApp;

import io.alex.hipstershares.domain.SecurityLot;
import io.alex.hipstershares.repository.SecurityLotRepository;
import io.alex.hipstershares.service.SecurityLotService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SecurityLotResource REST controller.
 *
 * @see SecurityLotResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HipsterSharesApp.class)
public class SecurityLotResourceIntTest {

    private static final BigDecimal DEFAULT_PURCHASE_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PURCHASE_PRICE = new BigDecimal(2);

    private static final LocalDate DEFAULT_PURCHASE_LOCAL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PURCHASE_LOCAL_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_SELL_LOCAL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SELL_LOCAL_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_SELL_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_SELL_PRICE = new BigDecimal(2);

    private static final Integer DEFAULT_UNITS = 1;
    private static final Integer UPDATED_UNITS = 2;

    @Inject
    private SecurityLotRepository securityLotRepository;

    @Inject
    private SecurityLotService securityLotService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restSecurityLotMockMvc;

    private SecurityLot securityLot;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SecurityLotResource securityLotResource = new SecurityLotResource();
        ReflectionTestUtils.setField(securityLotResource, "securityLotService", securityLotService);
        this.restSecurityLotMockMvc = MockMvcBuilders.standaloneSetup(securityLotResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SecurityLot createEntity(EntityManager em) {
        SecurityLot securityLot = new SecurityLot()
                .purchasePrice(DEFAULT_PURCHASE_PRICE)
                .purchaseLocalDate(DEFAULT_PURCHASE_LOCAL_DATE)
                .sellLocalDate(DEFAULT_SELL_LOCAL_DATE)
                .sellPrice(DEFAULT_SELL_PRICE)
                .units(DEFAULT_UNITS);
        return securityLot;
    }

    @Before
    public void initTest() {
        securityLot = createEntity(em);
    }

    @Test
    @Transactional
    public void createSecurityLot() throws Exception {
        int databaseSizeBeforeCreate = securityLotRepository.findAll().size();

        // Create the SecurityLot

        restSecurityLotMockMvc.perform(post("/api/security-lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(securityLot)))
            .andExpect(status().isCreated());

        // Validate the SecurityLot in the database
        List<SecurityLot> securityLotList = securityLotRepository.findAll();
        assertThat(securityLotList).hasSize(databaseSizeBeforeCreate + 1);
        SecurityLot testSecurityLot = securityLotList.get(securityLotList.size() - 1);
        assertThat(testSecurityLot.getPurchasePrice()).isEqualTo(DEFAULT_PURCHASE_PRICE);
        assertThat(testSecurityLot.getPurchaseLocalDate()).isEqualTo(DEFAULT_PURCHASE_LOCAL_DATE);
        assertThat(testSecurityLot.getSellLocalDate()).isEqualTo(DEFAULT_SELL_LOCAL_DATE);
        assertThat(testSecurityLot.getSellPrice()).isEqualTo(DEFAULT_SELL_PRICE);
        assertThat(testSecurityLot.getUnits()).isEqualTo(DEFAULT_UNITS);
    }

    @Test
    @Transactional
    public void createSecurityLotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = securityLotRepository.findAll().size();

        // Create the SecurityLot with an existing ID
        SecurityLot existingSecurityLot = new SecurityLot();
        existingSecurityLot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSecurityLotMockMvc.perform(post("/api/security-lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingSecurityLot)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<SecurityLot> securityLotList = securityLotRepository.findAll();
        assertThat(securityLotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSecurityLots() throws Exception {
        // Initialize the database
        securityLotRepository.saveAndFlush(securityLot);

        // Get all the securityLotList
        restSecurityLotMockMvc.perform(get("/api/security-lots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(securityLot.getId().intValue())))
            .andExpect(jsonPath("$.[*].purchasePrice").value(hasItem(DEFAULT_PURCHASE_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].purchaseLocalDate").value(hasItem(DEFAULT_PURCHASE_LOCAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].sellLocalDate").value(hasItem(DEFAULT_SELL_LOCAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].sellPrice").value(hasItem(DEFAULT_SELL_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].units").value(hasItem(DEFAULT_UNITS)));
    }

    @Test
    @Transactional
    public void getSecurityLot() throws Exception {
        // Initialize the database
        securityLotRepository.saveAndFlush(securityLot);

        // Get the securityLot
        restSecurityLotMockMvc.perform(get("/api/security-lots/{id}", securityLot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(securityLot.getId().intValue()))
            .andExpect(jsonPath("$.purchasePrice").value(DEFAULT_PURCHASE_PRICE.intValue()))
            .andExpect(jsonPath("$.purchaseLocalDate").value(DEFAULT_PURCHASE_LOCAL_DATE.toString()))
            .andExpect(jsonPath("$.sellLocalDate").value(DEFAULT_SELL_LOCAL_DATE.toString()))
            .andExpect(jsonPath("$.sellPrice").value(DEFAULT_SELL_PRICE.intValue()))
            .andExpect(jsonPath("$.units").value(DEFAULT_UNITS));
    }

    @Test
    @Transactional
    public void getNonExistingSecurityLot() throws Exception {
        // Get the securityLot
        restSecurityLotMockMvc.perform(get("/api/security-lots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSecurityLot() throws Exception {
        // Initialize the database
        securityLotService.save(securityLot);

        int databaseSizeBeforeUpdate = securityLotRepository.findAll().size();

        // Update the securityLot
        SecurityLot updatedSecurityLot = securityLotRepository.findOne(securityLot.getId());
        updatedSecurityLot
                .purchasePrice(UPDATED_PURCHASE_PRICE)
                .purchaseLocalDate(UPDATED_PURCHASE_LOCAL_DATE)
                .sellLocalDate(UPDATED_SELL_LOCAL_DATE)
                .sellPrice(UPDATED_SELL_PRICE)
                .units(UPDATED_UNITS);

        restSecurityLotMockMvc.perform(put("/api/security-lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSecurityLot)))
            .andExpect(status().isOk());

        // Validate the SecurityLot in the database
        List<SecurityLot> securityLotList = securityLotRepository.findAll();
        assertThat(securityLotList).hasSize(databaseSizeBeforeUpdate);
        SecurityLot testSecurityLot = securityLotList.get(securityLotList.size() - 1);
        assertThat(testSecurityLot.getPurchasePrice()).isEqualTo(UPDATED_PURCHASE_PRICE);
        assertThat(testSecurityLot.getPurchaseLocalDate()).isEqualTo(UPDATED_PURCHASE_LOCAL_DATE);
        assertThat(testSecurityLot.getSellLocalDate()).isEqualTo(UPDATED_SELL_LOCAL_DATE);
        assertThat(testSecurityLot.getSellPrice()).isEqualTo(UPDATED_SELL_PRICE);
        assertThat(testSecurityLot.getUnits()).isEqualTo(UPDATED_UNITS);
    }

    @Test
    @Transactional
    public void updateNonExistingSecurityLot() throws Exception {
        int databaseSizeBeforeUpdate = securityLotRepository.findAll().size();

        // Create the SecurityLot

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSecurityLotMockMvc.perform(put("/api/security-lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(securityLot)))
            .andExpect(status().isCreated());

        // Validate the SecurityLot in the database
        List<SecurityLot> securityLotList = securityLotRepository.findAll();
        assertThat(securityLotList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSecurityLot() throws Exception {
        // Initialize the database
        securityLotService.save(securityLot);

        int databaseSizeBeforeDelete = securityLotRepository.findAll().size();

        // Get the securityLot
        restSecurityLotMockMvc.perform(delete("/api/security-lots/{id}", securityLot.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SecurityLot> securityLotList = securityLotRepository.findAll();
        assertThat(securityLotList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
