package io.alex.hipstershares.repository.search;

import io.alex.hipstershares.domain.Dividend;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Dividend entity.
 */
public interface DividendSearchRepository extends ElasticsearchRepository<Dividend, Long> {
}
