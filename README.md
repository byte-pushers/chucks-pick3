# chucks-pick-3
![Travis CI Build](https://travis-ci.org/byte-pushers/chucks-pick3.svg?branch=master)

# Dev Setup
Software needed to be installed
1. Install Open JDK 11
2. Install MySQL.
   https://dev.mysql.com/doc/refman/5.7/en/macos-installation-pkg.html
3. Install Git and configure SSH to clone the project

Setup Project
1. Clone project from https://github.com/byte-pushers/chucks-pick3 <br/>
   `git clone git@github.com:byte-pushers/chucks-pick3.git`
2. Open project in IntelliJ Idea as Maven project
3. Add following property in application.properties <br/>
   `application.security.token=chuckspick3chuckspick3chuckspick3chuckspick3chuckspick3`
4. Add following dependency in root pom.xml file
```xml
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
   <version>${mysql.version}</version>
</dependency>
<dependency>
   <groupId>com.h2database</groupId>
   <artifactId>h2</artifactId>
   <version>1.4.200</version>
   <scope>runtime</scope>
</dependency>
```
5. Build Maven project <br/>
   `mvn clean install`
6. Verify database details in `application-local.properties` file
7. Run following query to insert master data
```mysql-sql
   INSERT INTO Role(id, name) VALUES (1, 'ROLE_GUEST'), (2, 'ROLE_BASIC'), (3, 'ROLE_PREMIUM');
   INSERT INTO AccountType(id, name) VALUES (1, 'GUEST'), (2, 'BASIC'), (3, 'PREMIUM');
```   
8. Create new run configuration in IntelliJ Idea for Application
```
VM option: -Dspring.profiles.active=local
Main Class: software.bytepushers.pick3.ChucksPick3Application
Class Path: -cp chucks-pick3-ws
```
Refer screenshot:
![Run Configuration.png](.%2Fpostman%2FRun%20Configuration.png)
9. Run the above configuration
10. To check local server status call following URL.
```shell
curl --location --request GET 'http://localhost:8080/customers/ping'
```
11. Use following postman collection and environment variable to validate local server. <br/>
    Postman Collection: [Chucks Pick3 WebServices.postman_collection.json](.%2Fpostman%2FChucks%20Pick3%20WebServices.postman_collection.json) <br/>
    Postman Environment: [ChucksPick3-local.postman_environment.json](.%2Fpostman%2FChucksPick3-local.postman_environment.json)

# Deploy to AWS Lambda
1. AWS CLI should be configured for development environment.
2. Following properties should be added in environment variable
   1. DATASOURCE_URL
   2. JWT_TOKEN_SECRET
   3. DATASOURCE_USERNAME
   4. DATASOURCE_PASSWORD
3. Run following command and build the project <br />
```mvn clean install -P aws```
4. Run following command to copy jar file <br />
```cp ./chucks-pick3-ws/target/chucks-pick3-ws.jar ./chucks-pick3-ws/target/bytepushers-pick3-lambda.jar```
5. Copy jar file to AWS S3 bucket <br />
```aws s3 cp ./chucks-pick3-ws/target/bytepushers-pick3-lambda.jar s3://com.bytepushers.chucks-pick3.webservice/bytepushers-pick3-lambda.jar```
6. Run this command to update AWS lambda code with the jar file from the S3 bucket
```aws lambda update-function-code --publish --function-name bytepushers-chucks-pick3-ws --s3-bucket com.bytepushers.chucks-pick3.webservice --s3-key bytepushers-pick3-lambda.jar --region us-east-2```
7. To check AWS lambda status call following URL. <br />
```curl --location --request GET 'https://api-dev.chuckspick3.com/customers/ping'```
8. Use following postman collection and environment variable to validate local server. <br/>
   Postman Collection: [Chucks Pick3 WebServices.postman_collection.json](.%2Fpostman%2FChucks%20Pick3%20WebServices.postman_collection.json) <br/>
   Postman Environment: [ChucksPick3-Dev.postman_environment.json](.%2Fpostman%2FChucksPick3-Dev.postman_environment.json)

# Pick 3 Lottery App
curl -v https://cp1jlhg207.execute-api.us-east-2.amazonaws.com/Prod/numbers\?winNumber\=385\&winDrawDate\=2018-09-11\&futureDrawDate\=2018-09-17\&winDrawTime\=MORNING\&futureDrawTime\=MORNING

curl -X POST localhost:8080/customers -H 'Content-Type:application/json' -d '{"firstName": "Zoe", "middleName": "T", "lastName": "Maxx", "email": "zoe@gmail.com", "phoneNumber": "2144441234", "state": "Texas", "zipCode": "76227", "cellPhoneType": "iPhone", "gambleFrequency": "always"}'

http://localhost:8080/numbers?winNumber=309&winDrawDate=2019-10-28&futureDrawDate=2019-11-29&winDrawTime=MORNING&futureDrawTime=DAY