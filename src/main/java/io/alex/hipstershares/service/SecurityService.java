package io.alex.hipstershares.service;

import io.alex.hipstershares.domain.Security;
import io.alex.hipstershares.repository.SecurityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Security.
 */
@Service
@Transactional
public class SecurityService {

    private final Logger log = LoggerFactory.getLogger(SecurityService.class);
    
    @Inject
    private SecurityRepository securityRepository;

    /**
     * Save a security.
     *
     * @param security the entity to save
     * @return the persisted entity
     */
    public Security save(Security security) {
        log.debug("Request to save Security : {}", security);
        Security result = securityRepository.save(security);
        return result;
    }

    /**
     *  Get all the securities.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Security> findAll() {
        log.debug("Request to get all Securities");
        List<Security> result = securityRepository.findAll();

        return result;
    }

    /**
     *  Get one security by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Security findOne(Long id) {
        log.debug("Request to get Security : {}", id);
        Security security = securityRepository.findOne(id);
        return security;
    }

    /**
     *  Delete the  security by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Security : {}", id);
        securityRepository.delete(id);
    }
}
