```sh
 sdk install java 23-oracle
 sdk install maven 3.9.9
 sdk install springboot 3.3.4

```

https://docs.spring.io/spring-boot/tutorial/first-application/index.html

## From https://docs.spring.io/spring-boot/cli/using-the-cli.html

<!-- https://www.baeldung.com/java-jar-war-packaging -->

```sh
# spring help init
spring init --build 'maven' --language 'java' --java-version=23 --dependencies=web --packaging='jar' ./

```

```sh
# Upgrading project
# -f, --force                  Force overwrite of existing files  
`spring init ./ --force --build 'maven'`
```

## Build the Project

```sh
mvn clean package
```

## Run the Application
```sh
java -jar target/demo-0.0.1-SNAPSHOT.jar
```
