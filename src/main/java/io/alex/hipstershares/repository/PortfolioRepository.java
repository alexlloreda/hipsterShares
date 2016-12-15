package io.alex.hipstershares.repository;

import io.alex.hipstershares.domain.Portfolio;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Portfolio entity.
 */
@SuppressWarnings("unused")
public interface PortfolioRepository extends JpaRepository<Portfolio,Long> {

}
