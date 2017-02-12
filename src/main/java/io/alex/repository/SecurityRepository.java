package io.alex.repository;

import io.alex.domain.Security;

import org.springframework.data.jpa.repository.*;

import java.util.Optional;

public interface SecurityRepository extends JpaRepository<Security,Long> {

	Optional<Security> findOneByTicker(String ticker);
}
