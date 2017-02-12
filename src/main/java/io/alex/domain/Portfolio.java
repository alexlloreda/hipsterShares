package io.alex.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Portfolio.
 */
@Entity
@Table(name = "portfolio")
public class Portfolio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnore
    private Set<SecurityLot> owns = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Portfolio name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<SecurityLot> getOwns() {
        return owns;
    }

    public Portfolio owns(Set<SecurityLot> securityLots) {
        this.owns = securityLots;
        return this;
    }

    public Portfolio addOwns(SecurityLot securityLot) {
        this.owns.add(securityLot);
        securityLot.setPortfolio(this);
        return this;
    }

    public Portfolio removeOwns(SecurityLot securityLot) {
        this.owns.remove(securityLot);
        securityLot.setPortfolio(null);
        return this;
    }

    public void setOwns(Set<SecurityLot> securityLots) {
        this.owns = securityLots;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Portfolio portfolio = (Portfolio) o;
        if (portfolio.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, portfolio.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Portfolio{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
