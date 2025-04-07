package com.psyntify.backend.config;

import com.psyntify.backend.model.Plant;
import com.psyntify.backend.repository.PlantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeedDataConfig {

    @Bean
    CommandLineRunner seed(PlantRepository repo) {
        return args -> {
            repo.save(new Plant(null, "Ficus", "Loves indirect sunlight"));
            repo.save(new Plant(null, "Monstera", "Big dramatic leaves"));
        };
    }
}
