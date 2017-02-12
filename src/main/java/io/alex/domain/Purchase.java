package io.alex.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Purchase.
 */
@Entity
@Table(name = "purchase")
public class Purchase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "units")
    private Integer units;

    @Column(name = "price", precision=10, scale=2)
    private BigDecimal price;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

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

    public Purchase units(Integer units) {
        this.units = units;
        return this;
    }

    public void setUnits(Integer units) {
        this.units = units;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Purchase price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public Purchase purchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
        return this;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public Security getOfSecurity() {
        return ofSecurity;
    }

    public Purchase ofSecurity(Security security) {
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
        Purchase purchase = (Purchase) o;
        if (purchase.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, purchase.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Purchase{" +
            "id=" + id +
            ", units='" + units + "'" +
            ", price='" + price + "'" +
            ", purchaseDate='" + purchaseDate + "'" +
            '}';
    }
}
