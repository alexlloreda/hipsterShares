package io.alex.hipstershares.repository;

import io.alex.hipstershares.domain.Security;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Security entity.
 */
@SuppressWarnings("unused")
public interface SecurityRepository extends JpaRepository<Security,Long> {

}
