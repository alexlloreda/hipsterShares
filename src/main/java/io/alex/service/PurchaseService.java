package io.alex.service;

import io.alex.domain.Purchase;
import io.alex.domain.SecurityLot;
import io.alex.repository.PurchaseRepository;
import io.alex.repository.SecurityLotRepository;
import io.alex.repository.SecurityRepository;

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
    
    @Inject
    private SecurityRepository securityRepo;
    
    @Inject
    private SecurityLotRepository securityLotRepo;

    /**
     * Purchase a security lot
     *
     * @param purchase the entity to save
     * @return the persisted entity
     */
    public Purchase doPurchase(Purchase purchase) {
        log.debug("Request to save Purchase : {}", purchase);
        // get the security referenced
        return securityRepo.findByTicker(purchase.getOwns().getTicker())
        	.map(s -> {
                // create a new security block
        		SecurityLot lot = new SecurityLot();
                lot.setPurchaseLocalDate(purchase.getLocalDate());
                //lot.setPurchasePrice(purchase.getPrice());
                //securityLotRepo.save(buildLot(ticker, amount, purchasePrice))
                // save the transaction as a purchase
                return purchaseRepository.save(purchase);
        	})
        	.orElseThrow(RuntimeException::new);
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
