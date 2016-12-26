package io.alex.hipstershares.service;

import io.alex.hipstershares.domain.SecurityLot;
import io.alex.hipstershares.repository.SecurityLotRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing SecurityLot.
 */
@Service
@Transactional
public class SecurityLotService {

    private final Logger log = LoggerFactory.getLogger(SecurityLotService.class);
    
    @Inject
    private SecurityLotRepository securityLotRepository;

    /**
     * Save a securityLot.
     *
     * @param securityLot the entity to save
     * @return the persisted entity
     */
    public SecurityLot save(SecurityLot securityLot) {
        log.debug("Request to save SecurityLot : {}", securityLot);
        SecurityLot result = securityLotRepository.save(securityLot);
        return result;
    }

    /**
     *  Get all the securityLots.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<SecurityLot> findAll() {
        log.debug("Request to get all SecurityLots");
        List<SecurityLot> result = securityLotRepository.findAll();

        return result;
    }

    /**
     *  Get one securityLot by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public SecurityLot findOne(Long id) {
        log.debug("Request to get SecurityLot : {}", id);
        SecurityLot securityLot = securityLotRepository.findOne(id);
        return securityLot;
    }

    /**
     *  Delete the  securityLot by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SecurityLot : {}", id);
        securityLotRepository.delete(id);
    }
}
