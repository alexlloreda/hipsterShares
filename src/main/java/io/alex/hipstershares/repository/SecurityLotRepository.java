package io.alex.hipstershares.repository;

import io.alex.hipstershares.domain.SecurityLot;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SecurityLot entity.
 */
@SuppressWarnings("unused")
public interface SecurityLotRepository extends JpaRepository<SecurityLot,Long> {

}
