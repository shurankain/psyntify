package com.psyntify.backend.config;

import com.psyntify.backend.model.Plant;
import com.psyntify.backend.model.User;
import com.psyntify.backend.repository.PlantRepository;
import com.psyntify.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SeedDataConfig {

    @Bean
    CommandLineRunner seed(UserRepository userRepo, PlantRepository plantRepo, PasswordEncoder encoder) {
        return args -> {
            if (userRepo.findByUsername("demo").isEmpty()) {
                User demo = new User();
                demo.setUsername("demo");
                demo.setPassword(encoder.encode("demo")); // password = demo
                demo.setDisplayName("Demo User");
                demo.setBio("Just a plant lover");

                User savedUser = userRepo.save(demo);

                plantRepo.save(new Plant(null, "Ficus", "Loves indirect sunlight", savedUser));
                plantRepo.save(new Plant(null, "Monstera", "Big dramatic leaves", savedUser));
            }
        };
    }
}
