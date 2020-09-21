package software.bytepushers.pick3.config;

import com.amazonaws.services.rds.AmazonRDS;
import com.amazonaws.services.rds.AmazonRDSClientBuilder;
import com.amazonaws.services.rds.model.DBInstance;
import com.amazonaws.services.rds.model.DescribeDBInstancesRequest;
import com.amazonaws.services.rds.model.DescribeDBInstancesResult;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.List;
import java.util.Properties;
import java.util.TimeZone;

/**
 * Custom database configuration for the application.
 */
@Log4j2
@Profile("aws | local")
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "software.bytepushers.pick3.repositories")
@PropertySource(value = "classpath:application.properties", ignoreResourceNotFound = false)
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

    @Value("spring.jpa.properties.hibernate.jdbc.time_zone")
    private String jpaTimezone;

    @Value("${spring.profiles.active:}")
    private String activeProfiles;

    //Used in addition of @PropertySource
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @PostConstruct
    void started() {
        TimeZone.setDefault(TimeZone.getTimeZone(jpaTimezone));
        String[] ids = TimeZone.getAvailableIDs();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setDatabase(Database.MYSQL);
        //vendorAdapter.setGenerateDdl(true);

        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan("software.bytepushers.pick3.domain");
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalProperties());

        return em;
    }

    @Bean
    public DataSource dataSource() {
        log.info("JpaConfig.dataSource() - driver class name = " + jpaDriverClassName);
        log.info("JpaConfig.dataSource() - data source url = " + jpaDatasourceUrl);
        log.info("JpaConfig.dataSource() - db username = " + jpaDatasourceUsername);
        log.info("JpaConfig.dataSource() - db password = " + jpaDatasourcePassword);
        return DataSourceBuilder.create()
                .driverClassName(jpaDriverClassName)
                .url(generateDatasourceUrl())
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

    private String generateDatasourceUrl() {
        String datasourceUrl = null;
        String[] targetProfiles = {"aws", "aws-runtime"};
        log.info("JpaConfig.generateDatasourceUrl() - start ");

        if (hasActiveProfiles(targetProfiles)) {
            log.info("JpaConfig.generateDatasourceUrl() - has found active profiles. ");
            datasourceUrl = generateDatasourceUrlFromAws();
        } else {
            log.info("JpaConfig.generateDatasourceUrl() - does not have active profiles. ");
            datasourceUrl = jpaDatasourceUrl;
        }

        log.info("JpaConfig.generateDatasourceUrl() - end: datasourceUrl: " + datasourceUrl);
        return datasourceUrl;
    }

    private String generateDatasourceUrlFromAws() {
        String datasourceUrl = null;
        log.info("JpaConfig.generateDatasourceUrlFromAws() - start ");

        AmazonRDS rdsClient = AmazonRDSClientBuilder.defaultClient();

        DescribeDBInstancesRequest request = new DescribeDBInstancesRequest();
        DescribeDBInstancesResult result = rdsClient.describeDBInstances(request);
        List<DBInstance> list = result.getDBInstances();
        log.info("JpaConfig.generateDatasourceUrlFromAws() - list length = {}", list.size());
        datasourceUrl = list.get(0).getEndpoint().getAddress();

        log.info("JpaConfig.generateDatasourceUrlFromAws() - end: datasourceUrl: {}", datasourceUrl);
        return datasourceUrl;
    }

    private boolean hasActiveProfiles(String[] targetProfiles) {
        int matchedActiveProfiles = 0;
        log.info("JpaConfig.hasActiveProfiles() - start");

        if (activeProfiles != null) {
            for (String profileName : activeProfiles.split(",")) {
                log.info("JpaConfig.hasActiveProfiles() - Currently active profile - '{}'", profileName);
                for (String targetProfile : targetProfiles) {
                    log.info("JpaConfig.hasActiveProfiles() - Currently target profile - '{}'", targetProfile);
                    if (profileName.equals(targetProfile)) {
                        matchedActiveProfiles++;
                    }
                }
            }
        } else {
            log.info("JpaConfig.hasActiveProfiles() - Currently NO active profiles.");
        }

        log.info("JpaConfig.hasActiveProfiles() - end: matchedActiveProfiles: {} targetProfiles.length: {}", matchedActiveProfiles, targetProfiles.length);

        return matchedActiveProfiles == targetProfiles.length;
    }
}
