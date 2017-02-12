package io.alex.service;

import io.alex.domain.Portfolio;
import io.alex.domain.Purchase;
import io.alex.domain.Security;
import io.alex.domain.SecurityLot;
import io.alex.repository.PurchaseRepository;
import io.alex.repository.SecurityLotRepository;
import io.alex.repository.SecurityRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Purchase.
 */
@Service
@Transactional
public class PurchaseService {

    private final Logger log = LoggerFactory.getLogger(PurchaseService.class);
    
    private final PurchaseRepository purchaseRepo;
    private final SecurityRepository securityRepo;
    private final SecurityLotRepository securityLotRepo;

    public PurchaseService(PurchaseRepository purchaseRepo, 
    		SecurityRepository securityRepo, 
    		SecurityLotRepository securityLotRepo) {
    	
        this.purchaseRepo = purchaseRepo;
        this.securityRepo = securityRepo;
        this.securityLotRepo = securityLotRepo;
    }

    /**
     * Purchase a security lot
     *
     * @param purchase the entity to save
     * @return the persisted entity
     */
    public Optional<Purchase> doPurchase(Purchase purchase) {
    	log.debug("Request to save Purchase : {}", purchase);
    	return securityRepo.findOneByTicker(purchase.getOfSecurity().getTicker())
    		.map(s -> securityLotRepo.save(buildLot(purchase, s)))
    		.map(sl -> purchaseRepo.save(purchase));
    }

    private SecurityLot buildLot(Purchase purchase, Security s) {
    	SecurityLot lot = new SecurityLot();
        lot.setOfSecurity(s);
        lot.setPortfolio(getPortfolio());
        lot.setPurchaseLocalDate(purchase.getPurchaseDate());
        lot.setPurchasePrice(purchase.getPrice());
        lot.setUnits(purchase.getUnits());
    	return lot;
    }
    
    // FIXME This should get the portfolio of the current user
    private Portfolio getPortfolio() {
		Portfolio p = new Portfolio();
		p.setId(1L);
		return p;
	}

	/**
     *  Get all the purchases.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Purchase> findAll() {
        log.debug("Request to get all Purchases");
        List<Purchase> result = purchaseRepo.findAll();

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
        Purchase purchase = purchaseRepo.findOne(id);
        return purchase;
    }

    /**
     *  Delete the  purchase by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Purchase : {}", id);
        purchaseRepo.delete(id);
    }
}
