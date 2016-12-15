package io.alex.hipstershares.repository.search;

import io.alex.hipstershares.domain.Portfolio;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Portfolio entity.
 */
public interface PortfolioSearchRepository extends ElasticsearchRepository<Portfolio, Long> {
}
