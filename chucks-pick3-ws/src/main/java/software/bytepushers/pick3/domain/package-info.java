@org.hibernate.annotations.GenericGenerator(
        name = "ID_GENERATOR",
        strategy = "enhanced-sequence",
        parameters = {
                @org.hibernate.annotations.Parameter(name="sequence_name", value="CUSTOMER_SEQUENCE"),
                @org.hibernate.annotations.Parameter(name="initial_value", value="0")
        }
)
package software.bytepushers.pick3.domain;