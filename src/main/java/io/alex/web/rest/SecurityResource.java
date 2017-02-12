package io.alex.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.alex.domain.Security;

import io.alex.repository.SecurityRepository;
import io.alex.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Security.
 */
@RestController
@RequestMapping("/api")
public class SecurityResource {

    private final Logger log = LoggerFactory.getLogger(SecurityResource.class);

    private static final String ENTITY_NAME = "security";
        
    private final SecurityRepository securityRepository;

    public SecurityResource(SecurityRepository securityRepository) {
        this.securityRepository = securityRepository;
    }

    /**
     * POST  /securities : Create a new security.
     *
     * @param security the security to create
     * @return the ResponseEntity with status 201 (Created) and with body the new security, or with status 400 (Bad Request) if the security has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/securities")
    @Timed
    public ResponseEntity<Security> createSecurity(@Valid @RequestBody Security security) throws URISyntaxException {
        log.debug("REST request to save Security : {}", security);
        if (security.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new security cannot already have an ID")).body(null);
        }
        Security result = securityRepository.save(security);
        return ResponseEntity.created(new URI("/api/securities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /securities : Updates an existing security.
     *
     * @param security the security to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated security,
     * or with status 400 (Bad Request) if the security is not valid,
     * or with status 500 (Internal Server Error) if the security couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/securities")
    @Timed
    public ResponseEntity<Security> updateSecurity(@Valid @RequestBody Security security) throws URISyntaxException {
        log.debug("REST request to update Security : {}", security);
        if (security.getId() == null) {
            return createSecurity(security);
        }
        Security result = securityRepository.save(security);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, security.getId().toString()))
            .body(result);
    }

    /**
     * GET  /securities : get all the securities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of securities in body
     */
    @GetMapping("/securities")
    @Timed
    public List<Security> getAllSecurities() {
        log.debug("REST request to get all Securities");
        List<Security> securities = securityRepository.findAll();
        return securities;
    }

    /**
     * GET  /securities/:id : get the "id" security.
     *
     * @param id the id of the security to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the security, or with status 404 (Not Found)
     */
    @GetMapping("/securities/{id}")
    @Timed
    public ResponseEntity<Security> getSecurity(@PathVariable Long id) {
        log.debug("REST request to get Security : {}", id);
        Security security = securityRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(security));
    }

    /**
     * DELETE  /securities/:id : delete the "id" security.
     *
     * @param id the id of the security to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/securities/{id}")
    @Timed
    public ResponseEntity<Void> deleteSecurity(@PathVariable Long id) {
        log.debug("REST request to delete Security : {}", id);
        securityRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
