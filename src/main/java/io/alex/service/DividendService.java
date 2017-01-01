package io.alex.service;

import io.alex.domain.Dividend;
import io.alex.repository.DividendRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Dividend.
 */
@Service
@Transactional
public class DividendService {

    private final Logger log = LoggerFactory.getLogger(DividendService.class);
    
    @Inject
    private DividendRepository dividendRepository;

    /**
     * Save a dividend.
     *
     * @param dividend the entity to save
     * @return the persisted entity
     */
    public Dividend save(Dividend dividend) {
        log.debug("Request to save Dividend : {}", dividend);
        Dividend result = dividendRepository.save(dividend);
        return result;
    }

    /**
     *  Get all the dividends.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Dividend> findAll() {
        log.debug("Request to get all Dividends");
        List<Dividend> result = dividendRepository.findAll();

        return result;
    }

    /**
     *  Get one dividend by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Dividend findOne(Long id) {
        log.debug("Request to get Dividend : {}", id);
        Dividend dividend = dividendRepository.findOne(id);
        return dividend;
    }

    /**
     *  Delete the  dividend by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Dividend : {}", id);
        dividendRepository.delete(id);
    }
}
