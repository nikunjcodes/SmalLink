package com.example.urlshortner;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.util.Objects;

@SpringBootApplication()
public class UrlShortnerApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();
        System.setProperty("DATABASE_URL", Objects.requireNonNull(dotenv.get("DATABASE_URL")));
        System.setProperty("DATABASE_USERNMAE", Objects.requireNonNull(dotenv.get("DATABASE_USERNAME")));
        System.setProperty("DATABASE_PASSWORD", Objects.requireNonNull(dotenv.get("DATABASE_PASSWORD")));
        System.setProperty("JWT_SECRET_KEY", Objects.requireNonNull(dotenv.get("JWT_SECRET_KEY")));
        System.setProperty("FRONTEND_URL", Objects.requireNonNull(dotenv.get("FRONTEND_URL")));
        SpringApplication.run(UrlShortnerApplication.class, args);
    }

}
