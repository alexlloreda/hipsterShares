package io.alex.hipstershares.repository.search;

import io.alex.hipstershares.domain.Sale;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Sale entity.
 */
public interface SaleSearchRepository extends ElasticsearchRepository<Sale, Long> {
}
