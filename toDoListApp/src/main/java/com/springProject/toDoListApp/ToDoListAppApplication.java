package com.springProject.toDoListApp;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.crypto.SecretKey;
import java.util.Base64;

import java.security.SecureRandom;
import java.util.Base64;

@SpringBootApplication
@EnableTransactionManagement
public class ToDoListAppApplication {

	public static void main(String[] args) {

		SpringApplication.run(ToDoListAppApplication.class, args);

	}

	@Bean
	public PlatformTransactionManager falana(MongoDatabaseFactory dbFactory) {
		return new MongoTransactionManager(dbFactory);
	}

//
//	@Bean
//	public RestTemplate restTemplate() {
//		return new RestTemplate();
//	}

}
