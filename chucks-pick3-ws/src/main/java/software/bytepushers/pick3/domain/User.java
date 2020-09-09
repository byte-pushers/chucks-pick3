package software.bytepushers.pick3.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * User DTO class
 */
@Data
@Entity
public class User {

    @Id
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ID_GENERATOR")
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column
    private String phone;

    @Column
    private String state;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

}
