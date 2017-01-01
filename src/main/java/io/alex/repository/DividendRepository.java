package io.alex.repository;

import io.alex.domain.Dividend;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Dividend entity.
 */
@SuppressWarnings("unused")
public interface DividendRepository extends JpaRepository<Dividend,Long> {

}
