package io.alex.hipstershares.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.alex.hipstershares.domain.Dividend;

import io.alex.hipstershares.repository.DividendRepository;
import io.alex.hipstershares.repository.search.DividendSearchRepository;
import io.alex.hipstershares.web.rest.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Dividend.
 */
@RestController
@RequestMapping("/api")
public class DividendResource {

    private final Logger log = LoggerFactory.getLogger(DividendResource.class);
        
    @Inject
    private DividendRepository dividendRepository;

    @Inject
    private DividendSearchRepository dividendSearchRepository;

    /**
     * POST  /dividends : Create a new dividend.
     *
     * @param dividend the dividend to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dividend, or with status 400 (Bad Request) if the dividend has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dividends")
    @Timed
    public ResponseEntity<Dividend> createDividend(@RequestBody Dividend dividend) throws URISyntaxException {
        log.debug("REST request to save Dividend : {}", dividend);
        if (dividend.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("dividend", "idexists", "A new dividend cannot already have an ID")).body(null);
        }
        Dividend result = dividendRepository.save(dividend);
        dividendSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/dividends/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("dividend", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dividends : Updates an existing dividend.
     *
     * @param dividend the dividend to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dividend,
     * or with status 400 (Bad Request) if the dividend is not valid,
     * or with status 500 (Internal Server Error) if the dividend couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dividends")
    @Timed
    public ResponseEntity<Dividend> updateDividend(@RequestBody Dividend dividend) throws URISyntaxException {
        log.debug("REST request to update Dividend : {}", dividend);
        if (dividend.getId() == null) {
            return createDividend(dividend);
        }
        Dividend result = dividendRepository.save(dividend);
        dividendSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("dividend", dividend.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dividends : get all the dividends.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dividends in body
     */
    @GetMapping("/dividends")
    @Timed
    public List<Dividend> getAllDividends() {
        log.debug("REST request to get all Dividends");
        List<Dividend> dividends = dividendRepository.findAll();
        return dividends;
    }

    /**
     * GET  /dividends/:id : get the "id" dividend.
     *
     * @param id the id of the dividend to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dividend, or with status 404 (Not Found)
     */
    @GetMapping("/dividends/{id}")
    @Timed
    public ResponseEntity<Dividend> getDividend(@PathVariable Long id) {
        log.debug("REST request to get Dividend : {}", id);
        Dividend dividend = dividendRepository.findOne(id);
        return Optional.ofNullable(dividend)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /dividends/:id : delete the "id" dividend.
     *
     * @param id the id of the dividend to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dividends/{id}")
    @Timed
    public ResponseEntity<Void> deleteDividend(@PathVariable Long id) {
        log.debug("REST request to delete Dividend : {}", id);
        dividendRepository.delete(id);
        dividendSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("dividend", id.toString())).build();
    }

    /**
     * SEARCH  /_search/dividends?query=:query : search for the dividend corresponding
     * to the query.
     *
     * @param query the query of the dividend search 
     * @return the result of the search
     */
    @GetMapping("/_search/dividends")
    @Timed
    public List<Dividend> searchDividends(@RequestParam String query) {
        log.debug("REST request to search Dividends for query {}", query);
        return StreamSupport
            .stream(dividendSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}