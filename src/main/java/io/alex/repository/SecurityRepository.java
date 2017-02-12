package io.alex.repository;

import io.alex.domain.Security;

import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Security entity.
 */
public interface SecurityRepository extends JpaRepository<Security,Long> {
	Optional<Security> findByTicker(String ticker);
}
