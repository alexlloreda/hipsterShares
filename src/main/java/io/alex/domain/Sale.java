package io.alex.domain;


import javax.persistence.*;
import java.io.Serializable;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "units")
    private Integer units;

    @Column(name = "local_date")
    private LocalDate localDate;

    @ManyToOne
    private Security owns;

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

    public LocalDate getLocalDate() {
        return localDate;
    }

    public Sale localDate(LocalDate localDate) {
        this.localDate = localDate;
        return this;
    }

    public void setLocalDate(LocalDate localDate) {
        this.localDate = localDate;
    }

    public Security getOwns() {
        return owns;
    }

    public Sale owns(Security security) {
        this.owns = security;
        return this;
    }

    public void setOwns(Security security) {
        this.owns = security;
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
            ", localDate='" + localDate + "'" +
            '}';
    }
}
