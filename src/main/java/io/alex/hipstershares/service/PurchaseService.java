package io.alex.hipstershares.service;

import io.alex.hipstershares.domain.Purchase;
import io.alex.hipstershares.repository.PurchaseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Purchase.
 */
@Service
@Transactional
public class PurchaseService {

    private final Logger log = LoggerFactory.getLogger(PurchaseService.class);
    
    @Inject
    private PurchaseRepository purchaseRepository;

    /**
     * Save a purchase.
     *
     * @param purchase the entity to save
     * @return the persisted entity
     */
    public Purchase save(Purchase purchase) {
        log.debug("Request to save Purchase : {}", purchase);
        Purchase result = purchaseRepository.save(purchase);
        return result;
    }

    /**
     *  Get all the purchases.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Purchase> findAll() {
        log.debug("Request to get all Purchases");
        List<Purchase> result = purchaseRepository.findAll();

        return result;
    }

    /**
     *  Get one purchase by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Purchase findOne(Long id) {
        log.debug("Request to get Purchase : {}", id);
        Purchase purchase = purchaseRepository.findOne(id);
        return purchase;
    }

    /**
     *  Delete the  purchase by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Purchase : {}", id);
        purchaseRepository.delete(id);
    }
}
