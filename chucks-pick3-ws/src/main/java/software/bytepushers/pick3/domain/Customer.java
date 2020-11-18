package software.bytepushers.pick3.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Customer {

    @Id
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ID_GENERATOR")
    private Long id;

    @NotNull
    @Size(min = 2, max = 255, message = "first.name.required.max.255.min.2")
    protected String firstName;

    @Size(min = 1, max = 255, message = "middle.name.required.max.255.min.2")
    protected String middleName;

    @Size(min = 2, max = 255, message = "last.name.required.max.255.min.2")
    protected String lastName;

    @NotNull
    @Size(min = 6, max = 255, message = "email.required.max.255.min.6")
    protected String email;

    @Pattern(regexp = "(^$|[0-9]{10})", message = "phone.number.invalid")
    protected String phoneNumber;

    @NotNull
    @Size(max = 50, message = "last.name.required.max.50")
    protected String state;

    @NotNull
    @Pattern(regexp = "(^$|[0-9]{5})", message = "zip.code.invalid")
    protected String zipCode;

    @NotNull
    @Size(max = 25, message = "cell.phone.type.required.max.25")
    protected String cellPhoneType;

    @NotNull
    @Size(max = 25, message = "gamble.frequency.required.max.25")
    protected String gambleFrequency;

    protected Boolean isDisabled = Boolean.FALSE;

    public Customer(String firstName, String email, String state, String zipCode, String cellPhoneType, String gambleFrequency) {
        this.firstName = firstName;
        this.email = email;
        this.state = state;
        this.zipCode = zipCode;
        this.cellPhoneType = cellPhoneType;
        this.gambleFrequency = gambleFrequency;
    }
}
