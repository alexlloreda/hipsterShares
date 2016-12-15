package io.alex.hipstershares.domain;

import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A SecurityLot.
 */
@Entity
@Table(name = "security_lot")
@Document(indexName = "securitylot")
public class SecurityLot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "purchase_price", precision=10, scale=2)
    private BigDecimal purchasePrice;

    @Column(name = "purchase_local_date")
    private LocalDate purchaseLocalDate;

    @Column(name = "sell_local_date")
    private LocalDate sellLocalDate;

    @Column(name = "sell_price", precision=10, scale=2)
    private BigDecimal sellPrice;

    @Column(name = "units")
    private Integer units;

    @ManyToOne
    private Security owns;

    @ManyToOne
    private Portfolio portfolio;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public SecurityLot purchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
        return this;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public LocalDate getPurchaseLocalDate() {
        return purchaseLocalDate;
    }

    public SecurityLot purchaseLocalDate(LocalDate purchaseLocalDate) {
        this.purchaseLocalDate = purchaseLocalDate;
        return this;
    }

    public void setPurchaseLocalDate(LocalDate purchaseLocalDate) {
        this.purchaseLocalDate = purchaseLocalDate;
    }

    public LocalDate getSellLocalDate() {
        return sellLocalDate;
    }

    public SecurityLot sellLocalDate(LocalDate sellLocalDate) {
        this.sellLocalDate = sellLocalDate;
        return this;
    }

    public void setSellLocalDate(LocalDate sellLocalDate) {
        this.sellLocalDate = sellLocalDate;
    }

    public BigDecimal getSellPrice() {
        return sellPrice;
    }

    public SecurityLot sellPrice(BigDecimal sellPrice) {
        this.sellPrice = sellPrice;
        return this;
    }

    public void setSellPrice(BigDecimal sellPrice) {
        this.sellPrice = sellPrice;
    }

    public Integer getUnits() {
        return units;
    }

    public SecurityLot units(Integer units) {
        this.units = units;
        return this;
    }

    public void setUnits(Integer units) {
        this.units = units;
    }

    public Security getOwns() {
        return owns;
    }

    public SecurityLot owns(Security security) {
        this.owns = security;
        return this;
    }

    public void setOwns(Security security) {
        this.owns = security;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public SecurityLot portfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
        return this;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SecurityLot securityLot = (SecurityLot) o;
        if (securityLot.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, securityLot.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "SecurityLot{" +
            "id=" + id +
            ", purchasePrice='" + purchasePrice + "'" +
            ", purchaseLocalDate='" + purchaseLocalDate + "'" +
            ", sellLocalDate='" + sellLocalDate + "'" +
            ", sellPrice='" + sellPrice + "'" +
            ", units='" + units + "'" +
            '}';
    }
}
