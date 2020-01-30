package software.bytepushers.pick3.config;

import com.amazonaws.services.rds.AmazonRDS;
import com.amazonaws.services.rds.AmazonRDSClientBuilder;
import com.amazonaws.services.rds.model.DBInstance;
import com.amazonaws.services.rds.model.DescribeDBInstancesRequest;
import com.amazonaws.services.rds.model.DescribeDBInstancesResult;
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

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.List;
import java.util.Properties;

@Profile("aws | local")
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "software.bytepushers.pick3.repositories")
@PropertySource(value = "classpath:application.properties", ignoreResourceNotFound=false)
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

    @Value("${spring.profiles.active:}")
    private String activeProfiles;

    //Used in addition of @PropertySource
    @Bean
    public static PropertySourcesPlaceholderConfigurer   propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
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
        System.out.println("JpaConfig.dataSource() - driver class name = " + jpaDriverClassName);
        System.out.println("JpaConfig.dataSource() - data source url = " + jpaDatasourceUrl);
        System.out.println("JpaConfig.dataSource() - db username = " + jpaDatasourceUsername);
        System.out.println("JpaConfig.dataSource() - db password = " + jpaDatasourcePassword);
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
        System.out.println("JpaConfig.generateDatasourceUrl() - start ");

        if (hasActiveProfiles(targetProfiles)) {
            System.out.println("JpaConfig.generateDatasourceUrl() - has found active profiles. ");
            datasourceUrl = generateDatasourceUrlFromAws();
        } else {
            System.out.println("JpaConfig.generateDatasourceUrl() - does not have active profiles. ");
            datasourceUrl = jpaDatasourceUrl;
        }

        System.out.println("JpaConfig.generateDatasourceUrl() - end: datasourceUrl: " + datasourceUrl);
        return datasourceUrl;
    }

    private String generateDatasourceUrlFromAws() {
        String datasourceUrl = null;
        System.out.println("JpaConfig.generateDatasourceUrlFromAws() - start ");

        AmazonRDS rdsClient = AmazonRDSClientBuilder.defaultClient();

        DescribeDBInstancesRequest request = new DescribeDBInstancesRequest();
        DescribeDBInstancesResult result = rdsClient.describeDBInstances(request);
        List<DBInstance> list = result.getDBInstances();
        System.out.println("JpaConfig.generateDatasourceUrlFromAws() - list length = " + list.size());
        datasourceUrl = list.get(0).getEndpoint().getAddress();

        System.out.println("JpaConfig.generateDatasourceUrlFromAws() - end: datasourceUrl: " + datasourceUrl);
        return datasourceUrl;
    }
    private boolean hasActiveProfiles(String[] targetProfiles) {
        int matchedActiveProfiles = 0;
        System.out.println("JpaConfig.hasActiveProfiles() - start");

        if (activeProfiles != null) {
            for (String profileName : activeProfiles.split(",")) {
                System.out.println("JpaConfig.hasActiveProfiles() - Currently active profile - '" + profileName + "'");
                for (String targetProfile : targetProfiles) {
                    System.out.println("JpaConfig.hasActiveProfiles() - Currently target profile - '" + targetProfile + "'");
                    if (profileName.equals(targetProfile)) {
                        matchedActiveProfiles++;
                    }
                }
            }
        } else {
            System.out.println("JpaConfig.hasActiveProfiles() - Currently NO active profiles.");
        }

        System.out.println("JpaConfig.hasActiveProfiles() - end: matchedActiveProfiles: " + matchedActiveProfiles + " targetProfiles.length: " + targetProfiles.length);

        return matchedActiveProfiles == targetProfiles.length;
    }
}