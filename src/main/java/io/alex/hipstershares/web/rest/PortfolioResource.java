package io.alex.hipstershares.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.alex.hipstershares.domain.Portfolio;
import io.alex.hipstershares.service.PortfolioService;
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

/**
 * REST controller for managing Portfolio.
 */
@RestController
@RequestMapping("/api")
public class PortfolioResource {

    private final Logger log = LoggerFactory.getLogger(PortfolioResource.class);
        
    @Inject
    private PortfolioService portfolioService;

    /**
     * POST  /portfolios : Create a new portfolio.
     *
     * @param portfolio the portfolio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new portfolio, or with status 400 (Bad Request) if the portfolio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/portfolios")
    @Timed
    public ResponseEntity<Portfolio> createPortfolio(@RequestBody Portfolio portfolio) throws URISyntaxException {
        log.debug("REST request to save Portfolio : {}", portfolio);
        if (portfolio.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("portfolio", "idexists", "A new portfolio cannot already have an ID")).body(null);
        }
        Portfolio result = portfolioService.save(portfolio);
        return ResponseEntity.created(new URI("/api/portfolios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("portfolio", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /portfolios : Updates an existing portfolio.
     *
     * @param portfolio the portfolio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated portfolio,
     * or with status 400 (Bad Request) if the portfolio is not valid,
     * or with status 500 (Internal Server Error) if the portfolio couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/portfolios")
    @Timed
    public ResponseEntity<Portfolio> updatePortfolio(@RequestBody Portfolio portfolio) throws URISyntaxException {
        log.debug("REST request to update Portfolio : {}", portfolio);
        if (portfolio.getId() == null) {
            return createPortfolio(portfolio);
        }
        Portfolio result = portfolioService.save(portfolio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("portfolio", portfolio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /portfolios : get all the portfolios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of portfolios in body
     */
    @GetMapping("/portfolios")
    @Timed
    public List<Portfolio> getAllPortfolios() {
        log.debug("REST request to get all Portfolios");
        return portfolioService.findAll();
    }

    /**
     * GET  /portfolios/:id : get the "id" portfolio.
     *
     * @param id the id of the portfolio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the portfolio, or with status 404 (Not Found)
     */
    @GetMapping("/portfolios/{id}")
    @Timed
    public ResponseEntity<Portfolio> getPortfolio(@PathVariable Long id) {
        log.debug("REST request to get Portfolio : {}", id);
        Portfolio portfolio = portfolioService.findOne(id);
        return Optional.ofNullable(portfolio)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /portfolios/:id : delete the "id" portfolio.
     *
     * @param id the id of the portfolio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/portfolios/{id}")
    @Timed
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        log.debug("REST request to delete Portfolio : {}", id);
        portfolioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("portfolio", id.toString())).build();
    }

}
