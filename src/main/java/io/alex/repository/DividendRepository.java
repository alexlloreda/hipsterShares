package io.alex.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.alex.domain.Dividend;

/**
 * Spring Data JPA repository for the Dividend entity.
 */
@SuppressWarnings("unused")
public interface DividendRepository extends JpaRepository<Dividend, Long> {

}
