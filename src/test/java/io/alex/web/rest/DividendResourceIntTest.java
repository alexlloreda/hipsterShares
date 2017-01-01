package io.alex.web.rest;

import io.alex.SimpleApp;

import io.alex.domain.Dividend;
import io.alex.repository.DividendRepository;
import io.alex.service.DividendService;

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
 * Test class for the DividendResource REST controller.
 *
 * @see DividendResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SimpleApp.class)
public class DividendResourceIntTest {

    private static final LocalDate DEFAULT_RECORD_LOCAL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_RECORD_LOCAL_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_EX_LOCAL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EX_LOCAL_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_PAYMENT_LOCAL_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PAYMENT_LOCAL_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_DPS = new BigDecimal(1);
    private static final BigDecimal UPDATED_DPS = new BigDecimal(2);

    private static final BigDecimal DEFAULT_FRANKING = new BigDecimal(1);
    private static final BigDecimal UPDATED_FRANKING = new BigDecimal(2);

    @Inject
    private DividendRepository dividendRepository;

    @Inject
    private DividendService dividendService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restDividendMockMvc;

    private Dividend dividend;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DividendResource dividendResource = new DividendResource();
        ReflectionTestUtils.setField(dividendResource, "dividendService", dividendService);
        this.restDividendMockMvc = MockMvcBuilders.standaloneSetup(dividendResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Dividend createEntity(EntityManager em) {
        Dividend dividend = new Dividend()
                .recordLocalDate(DEFAULT_RECORD_LOCAL_DATE)
                .exLocalDate(DEFAULT_EX_LOCAL_DATE)
                .paymentLocalDate(DEFAULT_PAYMENT_LOCAL_DATE)
                .dps(DEFAULT_DPS)
                .franking(DEFAULT_FRANKING);
        return dividend;
    }

    @Before
    public void initTest() {
        dividend = createEntity(em);
    }

    @Test
    @Transactional
    public void createDividend() throws Exception {
        int databaseSizeBeforeCreate = dividendRepository.findAll().size();

        // Create the Dividend

        restDividendMockMvc.perform(post("/api/dividends")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dividend)))
            .andExpect(status().isCreated());

        // Validate the Dividend in the database
        List<Dividend> dividendList = dividendRepository.findAll();
        assertThat(dividendList).hasSize(databaseSizeBeforeCreate + 1);
        Dividend testDividend = dividendList.get(dividendList.size() - 1);
        assertThat(testDividend.getRecordLocalDate()).isEqualTo(DEFAULT_RECORD_LOCAL_DATE);
        assertThat(testDividend.getExLocalDate()).isEqualTo(DEFAULT_EX_LOCAL_DATE);
        assertThat(testDividend.getPaymentLocalDate()).isEqualTo(DEFAULT_PAYMENT_LOCAL_DATE);
        assertThat(testDividend.getDps()).isEqualTo(DEFAULT_DPS);
        assertThat(testDividend.getFranking()).isEqualTo(DEFAULT_FRANKING);
    }

    @Test
    @Transactional
    public void createDividendWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dividendRepository.findAll().size();

        // Create the Dividend with an existing ID
        Dividend existingDividend = new Dividend();
        existingDividend.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDividendMockMvc.perform(post("/api/dividends")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingDividend)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Dividend> dividendList = dividendRepository.findAll();
        assertThat(dividendList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDividends() throws Exception {
        // Initialize the database
        dividendRepository.saveAndFlush(dividend);

        // Get all the dividendList
        restDividendMockMvc.perform(get("/api/dividends?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dividend.getId().intValue())))
            .andExpect(jsonPath("$.[*].recordLocalDate").value(hasItem(DEFAULT_RECORD_LOCAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].exLocalDate").value(hasItem(DEFAULT_EX_LOCAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].paymentLocalDate").value(hasItem(DEFAULT_PAYMENT_LOCAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].dps").value(hasItem(DEFAULT_DPS.intValue())))
            .andExpect(jsonPath("$.[*].franking").value(hasItem(DEFAULT_FRANKING.intValue())));
    }

    @Test
    @Transactional
    public void getDividend() throws Exception {
        // Initialize the database
        dividendRepository.saveAndFlush(dividend);

        // Get the dividend
        restDividendMockMvc.perform(get("/api/dividends/{id}", dividend.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dividend.getId().intValue()))
            .andExpect(jsonPath("$.recordLocalDate").value(DEFAULT_RECORD_LOCAL_DATE.toString()))
            .andExpect(jsonPath("$.exLocalDate").value(DEFAULT_EX_LOCAL_DATE.toString()))
            .andExpect(jsonPath("$.paymentLocalDate").value(DEFAULT_PAYMENT_LOCAL_DATE.toString()))
            .andExpect(jsonPath("$.dps").value(DEFAULT_DPS.intValue()))
            .andExpect(jsonPath("$.franking").value(DEFAULT_FRANKING.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDividend() throws Exception {
        // Get the dividend
        restDividendMockMvc.perform(get("/api/dividends/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDividend() throws Exception {
        // Initialize the database
        dividendService.save(dividend);

        int databaseSizeBeforeUpdate = dividendRepository.findAll().size();

        // Update the dividend
        Dividend updatedDividend = dividendRepository.findOne(dividend.getId());
        updatedDividend
                .recordLocalDate(UPDATED_RECORD_LOCAL_DATE)
                .exLocalDate(UPDATED_EX_LOCAL_DATE)
                .paymentLocalDate(UPDATED_PAYMENT_LOCAL_DATE)
                .dps(UPDATED_DPS)
                .franking(UPDATED_FRANKING);

        restDividendMockMvc.perform(put("/api/dividends")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDividend)))
            .andExpect(status().isOk());

        // Validate the Dividend in the database
        List<Dividend> dividendList = dividendRepository.findAll();
        assertThat(dividendList).hasSize(databaseSizeBeforeUpdate);
        Dividend testDividend = dividendList.get(dividendList.size() - 1);
        assertThat(testDividend.getRecordLocalDate()).isEqualTo(UPDATED_RECORD_LOCAL_DATE);
        assertThat(testDividend.getExLocalDate()).isEqualTo(UPDATED_EX_LOCAL_DATE);
        assertThat(testDividend.getPaymentLocalDate()).isEqualTo(UPDATED_PAYMENT_LOCAL_DATE);
        assertThat(testDividend.getDps()).isEqualTo(UPDATED_DPS);
        assertThat(testDividend.getFranking()).isEqualTo(UPDATED_FRANKING);
    }

    @Test
    @Transactional
    public void updateNonExistingDividend() throws Exception {
        int databaseSizeBeforeUpdate = dividendRepository.findAll().size();

        // Create the Dividend

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDividendMockMvc.perform(put("/api/dividends")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dividend)))
            .andExpect(status().isCreated());

        // Validate the Dividend in the database
        List<Dividend> dividendList = dividendRepository.findAll();
        assertThat(dividendList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDividend() throws Exception {
        // Initialize the database
        dividendService.save(dividend);

        int databaseSizeBeforeDelete = dividendRepository.findAll().size();

        // Get the dividend
        restDividendMockMvc.perform(delete("/api/dividends/{id}", dividend.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Dividend> dividendList = dividendRepository.findAll();
        assertThat(dividendList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
