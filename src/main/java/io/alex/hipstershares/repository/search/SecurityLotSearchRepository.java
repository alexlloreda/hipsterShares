package io.alex.hipstershares.repository.search;

import io.alex.hipstershares.domain.SecurityLot;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the SecurityLot entity.
 */
public interface SecurityLotSearchRepository extends ElasticsearchRepository<SecurityLot, Long> {
}
