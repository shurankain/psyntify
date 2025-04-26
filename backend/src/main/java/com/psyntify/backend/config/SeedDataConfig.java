package com.psyntify.backend.config;

import com.psyntify.backend.model.Plant;
import com.psyntify.backend.model.User;
import com.psyntify.backend.repository.PlantRepository;
import com.psyntify.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.nio.file.Files;

@Configuration
public class SeedDataConfig {
    @Bean
    CommandLineRunner seed(UserRepository userRepo, PlantRepository plantRepo, PasswordEncoder encoder) {
        return args -> {
            if (userRepo.findByUsername("demo").isEmpty()) {
                User demo = new User();
                demo.setUsername("demo");
                demo.setPassword(encoder.encode("demo"));
                demo.setDisplayName("Demo User");
                demo.setBio("Just a plant lover");

                User savedUser = userRepo.save(demo);

                byte[] ficusImage = loadSeedImage("seed/ficus.jpg");
                byte[] monsteraImage = loadSeedImage("seed/monstera.jpg");

                Plant ficus = new Plant(null, "Ficus", "Loves indirect sunlight", ficusImage, "image/jpeg", savedUser);
                Plant monstera = new Plant(null, "Monstera", "Big dramatic leaves", monsteraImage, "image/jpeg", savedUser);

                plantRepo.save(ficus);
                plantRepo.save(monstera);
            }
        };
    }

    private byte[] loadSeedImage(String path) throws IOException {
        return Files.readAllBytes(new ClassPathResource(path).getFile().toPath());
    }
}