package software.bytepushers.pick3.config;

import org.hibernate.service.spi.InjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Profile("aws | local")
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "software.bytepushers.pick3.repositories")
public class JpaConfig {
    @Value("${spring.datasource.driver-class-name:}")
    private String jpaDriverClassName;

    @Value("${spring.datasource.url:}")
    private String jpaDatasourceUrl;

    @Value("${spring.datasource.username:}")
    private String jpaDatasourceUsername;

    @Value("${spring.datasource.password:}")
    private String jpaDatasourcePassword;

    @Value("${spring.jpa.hibernate.ddl-auto:}")
    private String jpaDdlAuto;

    @Value("${spring.jpa.database-platform:}")
    private String jpaDialect;

    @Value("${spring.jpa.show-sql:}")
    private String jpaShowSql;

    @Value("${spring.jpa.properties.hibernate.format_sql:}")
    private String jpaFormatSql;

    @Autowired
    DataSource dataSource;

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        //vendorAdapter.setDatabase(Database.MYSQL);
        //vendorAdapter.setGenerateDdl(true);

        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("software.bytepushers.pick3.domain");
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalProperties());

        return em;
    }

    /*@Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan(new String[] { "software.bytepushers.pick3.domain" });

        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalProperties());

        return em;
    }*/

    @Bean
    public DataSource dataSource() {
        System.out.println("******************JpaConfig.dataSource() - driver class name = " + jpaDriverClassName);
        System.out.println("******************JpaConfig.dataSource() - data source url = " + jpaDatasourceUrl);
        System.out.println("******************JpaConfig.dataSource() - db username = " + jpaDatasourceUsername);
        System.out.println("******************JpaConfig.dataSource() - db password = " + jpaDatasourcePassword);
        return DataSourceBuilder.create()
                .driverClassName(jpaDriverClassName)
                .url(jpaDatasourceUrl)
                .username(jpaDatasourceUsername)
                .password(jpaDatasourcePassword)
                .build();
    }

    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(emf);

        return transactionManager;
    }

    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
        return new PersistenceExceptionTranslationPostProcessor();
    }

    private Properties additionalProperties() {
        Properties properties = new Properties();
        properties.setProperty("hibernate.hbm2ddl.auto", jpaDdlAuto);
        //properties.setProperty("hibernate.hbm2ddl.auto", "update");
        properties.setProperty("hibernate.dialect", jpaDialect);
        //properties.setProperty("hibernate.dialect", jpaDialect);
        //properties.setProperty("hibernate.dialect", env.getProperty("spring.jpa.properties.hibernate.dialect"));
        //properties.setProperty("hibernate.current_session_context_class", env.getProperty("spring.jpa.properties.hibernate.current_session_context_class"));
        //properties.setProperty("hibernate.jdbc.lob.non_contextual_creation", env.getProperty("spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation"));
        properties.setProperty("hibernate.show_sql", jpaShowSql);
        //properties.setProperty("hibernate.show_sql", "false");
        properties.setProperty("hibernate.format_sql", jpaFormatSql);
        //properties.setProperty("hibernate.format_sql", "false");
        return properties;
    }
}