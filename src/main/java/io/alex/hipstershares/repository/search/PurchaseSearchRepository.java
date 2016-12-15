package io.alex.hipstershares.repository.search;

import io.alex.hipstershares.domain.Purchase;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Purchase entity.
 */
public interface PurchaseSearchRepository extends ElasticsearchRepository<Purchase, Long> {
}
