package io.alex.hipstershares.repository;

import io.alex.hipstershares.domain.Dividend;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Dividend entity.
 */
@SuppressWarnings("unused")
public interface DividendRepository extends JpaRepository<Dividend,Long> {

}
