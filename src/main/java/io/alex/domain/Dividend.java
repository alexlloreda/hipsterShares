package io.alex.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Dividend.
 */
@Entity
@Table(name = "dividend")
public class Dividend implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "record_local_date")
    private LocalDate recordLocalDate;

    @Column(name = "ex_local_date")
    private LocalDate exLocalDate;

    @Column(name = "payment_local_date")
    private LocalDate paymentLocalDate;

    @Column(name = "dps", precision=10, scale=2)
    private BigDecimal dps;

    @Column(name = "franking", precision=10, scale=2)
    private BigDecimal franking;

    @ManyToOne
    private Security ofSecurity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getRecordLocalDate() {
        return recordLocalDate;
    }

    public Dividend recordLocalDate(LocalDate recordLocalDate) {
        this.recordLocalDate = recordLocalDate;
        return this;
    }

    public void setRecordLocalDate(LocalDate recordLocalDate) {
        this.recordLocalDate = recordLocalDate;
    }

    public LocalDate getExLocalDate() {
        return exLocalDate;
    }

    public Dividend exLocalDate(LocalDate exLocalDate) {
        this.exLocalDate = exLocalDate;
        return this;
    }

    public void setExLocalDate(LocalDate exLocalDate) {
        this.exLocalDate = exLocalDate;
    }

    public LocalDate getPaymentLocalDate() {
        return paymentLocalDate;
    }

    public Dividend paymentLocalDate(LocalDate paymentLocalDate) {
        this.paymentLocalDate = paymentLocalDate;
        return this;
    }

    public void setPaymentLocalDate(LocalDate paymentLocalDate) {
        this.paymentLocalDate = paymentLocalDate;
    }

    public BigDecimal getDps() {
        return dps;
    }

    public Dividend dps(BigDecimal dps) {
        this.dps = dps;
        return this;
    }

    public void setDps(BigDecimal dps) {
        this.dps = dps;
    }

    public BigDecimal getFranking() {
        return franking;
    }

    public Dividend franking(BigDecimal franking) {
        this.franking = franking;
        return this;
    }

    public void setFranking(BigDecimal franking) {
        this.franking = franking;
    }

    public Security getOfSecurity() {
        return ofSecurity;
    }

    public Dividend ofSecurity(Security security) {
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
        Dividend dividend = (Dividend) o;
        if (dividend.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, dividend.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Dividend{" +
            "id=" + id +
            ", recordLocalDate='" + recordLocalDate + "'" +
            ", exLocalDate='" + exLocalDate + "'" +
            ", paymentLocalDate='" + paymentLocalDate + "'" +
            ", dps='" + dps + "'" +
            ", franking='" + franking + "'" +
            '}';
    }
}
