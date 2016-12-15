package io.alex.hipstershares.repository.search;

import io.alex.hipstershares.domain.Security;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data ElasticSearch repository for the Security entity.
 */
public interface SecuritySearchRepository extends ElasticsearchRepository<Security, Long> {
}
