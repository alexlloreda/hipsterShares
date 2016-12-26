package io.alex.hipstershares.domain;


import javax.persistence.*;
import java.io.Serializable;
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

    public Purchase units(Integer units) {
        this.units = units;
        return this;
    }

    public void setUnits(Integer units) {
        this.units = units;
    }

    public LocalDate getLocalDate() {
        return localDate;
    }

    public Purchase localDate(LocalDate localDate) {
        this.localDate = localDate;
        return this;
    }

    public void setLocalDate(LocalDate localDate) {
        this.localDate = localDate;
    }

    public Security getOwns() {
        return owns;
    }

    public Purchase owns(Security security) {
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
            ", localDate='" + localDate + "'" +
            '}';
    }
}
