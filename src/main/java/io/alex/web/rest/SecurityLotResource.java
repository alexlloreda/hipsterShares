package io.alex.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.alex.domain.SecurityLot;

import io.alex.repository.SecurityLotRepository;
import io.alex.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SecurityLot.
 */
@RestController
@RequestMapping("/api")
public class SecurityLotResource {

    private final Logger log = LoggerFactory.getLogger(SecurityLotResource.class);

    private static final String ENTITY_NAME = "securityLot";
        
    private final SecurityLotRepository securityLotRepository;

    public SecurityLotResource(SecurityLotRepository securityLotRepository) {
        this.securityLotRepository = securityLotRepository;
    }

    /**
     * POST  /security-lots : Create a new securityLot.
     *
     * @param securityLot the securityLot to create
     * @return the ResponseEntity with status 201 (Created) and with body the new securityLot, or with status 400 (Bad Request) if the securityLot has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/security-lots")
    @Timed
    public ResponseEntity<SecurityLot> createSecurityLot(@RequestBody SecurityLot securityLot) throws URISyntaxException {
        log.debug("REST request to save SecurityLot : {}", securityLot);
        if (securityLot.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new securityLot cannot already have an ID")).body(null);
        }
        SecurityLot result = securityLotRepository.save(securityLot);
        return ResponseEntity.created(new URI("/api/security-lots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /security-lots : Updates an existing securityLot.
     *
     * @param securityLot the securityLot to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated securityLot,
     * or with status 400 (Bad Request) if the securityLot is not valid,
     * or with status 500 (Internal Server Error) if the securityLot couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/security-lots")
    @Timed
    public ResponseEntity<SecurityLot> updateSecurityLot(@RequestBody SecurityLot securityLot) throws URISyntaxException {
        log.debug("REST request to update SecurityLot : {}", securityLot);
        if (securityLot.getId() == null) {
            return createSecurityLot(securityLot);
        }
        SecurityLot result = securityLotRepository.save(securityLot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, securityLot.getId().toString()))
            .body(result);
    }

    /**
     * GET  /security-lots : get all the securityLots.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of securityLots in body
     */
    @GetMapping("/security-lots")
    @Timed
    public List<SecurityLot> getAllSecurityLots() {
        log.debug("REST request to get all SecurityLots");
        List<SecurityLot> securityLots = securityLotRepository.findAll();
        return securityLots;
    }

    /**
     * GET  /security-lots/:id : get the "id" securityLot.
     *
     * @param id the id of the securityLot to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the securityLot, or with status 404 (Not Found)
     */
    @GetMapping("/security-lots/{id}")
    @Timed
    public ResponseEntity<SecurityLot> getSecurityLot(@PathVariable Long id) {
        log.debug("REST request to get SecurityLot : {}", id);
        SecurityLot securityLot = securityLotRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(securityLot));
    }

    /**
     * DELETE  /security-lots/:id : delete the "id" securityLot.
     *
     * @param id the id of the securityLot to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/security-lots/{id}")
    @Timed
    public ResponseEntity<Void> deleteSecurityLot(@PathVariable Long id) {
        log.debug("REST request to delete SecurityLot : {}", id);
        securityLotRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
