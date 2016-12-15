package io.alex.hipstershares.repository;

import io.alex.hipstershares.domain.Purchase;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Purchase entity.
 */
@SuppressWarnings("unused")
public interface PurchaseRepository extends JpaRepository<Purchase,Long> {

}
