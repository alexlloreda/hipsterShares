package io.alex.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Sale.
 */
@Entity
@Table(name = "sale")
public class Sale implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "units")
    private Integer units;

    @Column(name = "price", precision=10, scale=2)
    private BigDecimal price;

    @Column(name = "sale_date")
    private LocalDate saleDate;

    @ManyToOne
    private Security ofSecurity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUnits() {
        return units;
    }

    public Sale units(Integer units) {
        this.units = units;
        return this;
    }

    public void setUnits(Integer units) {
        this.units = units;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Sale price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public LocalDate getSaleDate() {
        return saleDate;
    }

    public Sale saleDate(LocalDate saleDate) {
        this.saleDate = saleDate;
        return this;
    }

    public void setSaleDate(LocalDate saleDate) {
        this.saleDate = saleDate;
    }

    public Security getOfSecurity() {
        return ofSecurity;
    }

    public Sale ofSecurity(Security security) {
        this.ofSecurity = security;
        return this;
    }

    public void setOfSecurity(Security security) {
        this.ofSecurity = security;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Sale sale = (Sale) o;
        if (sale.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, sale.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Sale{" +
            "id=" + id +
            ", units='" + units + "'" +
            ", price='" + price + "'" +
            ", saleDate='" + saleDate + "'" +
            '}';
    }
}
