package software.bytepushers.pick3.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * Account type entity/database model.
 */
@Getter
@Setter
@Entity
public class AccountType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ID_GENERATOR")
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private long id;

    private String name;

}