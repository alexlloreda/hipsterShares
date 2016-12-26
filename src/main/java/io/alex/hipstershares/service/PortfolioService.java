package io.alex.hipstershares.service;

import io.alex.hipstershares.domain.Portfolio;
import io.alex.hipstershares.repository.PortfolioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Portfolio.
 */
@Service
@Transactional
public class PortfolioService {

    private final Logger log = LoggerFactory.getLogger(PortfolioService.class);
    
    @Inject
    private PortfolioRepository portfolioRepository;

    /**
     * Save a portfolio.
     *
     * @param portfolio the entity to save
     * @return the persisted entity
     */
    public Portfolio save(Portfolio portfolio) {
        log.debug("Request to save Portfolio : {}", portfolio);
        Portfolio result = portfolioRepository.save(portfolio);
        return result;
    }

    /**
     *  Get all the portfolios.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Portfolio> findAll() {
        log.debug("Request to get all Portfolios");
        List<Portfolio> result = portfolioRepository.findAll();

        return result;
    }

    /**
     *  Get one portfolio by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Portfolio findOne(Long id) {
        log.debug("Request to get Portfolio : {}", id);
        Portfolio portfolio = portfolioRepository.findOne(id);
        return portfolio;
    }

    /**
     *  Delete the  portfolio by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Portfolio : {}", id);
        portfolioRepository.delete(id);
    }
}
