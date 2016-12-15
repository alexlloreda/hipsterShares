package io.alex.hipstershares.domain;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

import io.alex.hipstershares.domain.enumeration.Currency;

/**
 * A Security.
 */
@Entity
@Table(name = "security")
@Document(indexName = "security")
public class Security implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "ticker", nullable = false)
    private String ticker;

    @Column(name = "issued_units")
    private Long issuedUnits;

    @Column(name = "spot_price", precision=10, scale=2)
    private BigDecimal spotPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency")
    private Currency currency;

    @ManyToOne
    private Company company;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicker() {
        return ticker;
    }

    public Security ticker(String ticker) {
        this.ticker = ticker;
        return this;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Long getIssuedUnits() {
        return issuedUnits;
    }

    public Security issuedUnits(Long issuedUnits) {
        this.issuedUnits = issuedUnits;
        return this;
    }

    public void setIssuedUnits(Long issuedUnits) {
        this.issuedUnits = issuedUnits;
    }

    public BigDecimal getSpotPrice() {
        return spotPrice;
    }

    public Security spotPrice(BigDecimal spotPrice) {
        this.spotPrice = spotPrice;
        return this;
    }

    public void setSpotPrice(BigDecimal spotPrice) {
        this.spotPrice = spotPrice;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Security currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Company getCompany() {
        return company;
    }

    public Security company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Security security = (Security) o;
        if (security.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, security.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Security{" +
            "id=" + id +
            ", ticker='" + ticker + "'" +
            ", issuedUnits='" + issuedUnits + "'" +
            ", spotPrice='" + spotPrice + "'" +
            ", currency='" + currency + "'" +
            '}';
    }
}
