package io.alex.repository;

import io.alex.domain.Security;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Security entity.
 */
@SuppressWarnings("unused")
public interface SecurityRepository extends JpaRepository<Security,Long> {

}
