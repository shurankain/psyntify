package com.psyntify.backend;

import com.psyntify.backend.model.Plant;
import com.psyntify.backend.model.User;
import com.psyntify.backend.repository.PlantRepository;
import com.psyntify.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@ActiveProfiles("test")
public class PlantRepositoryTest {

    @Autowired
    PlantRepository plantRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    void testSaveAndFetch() {
        // Create and save a real user first
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("encoded-password"); // optional
        user.setDisplayName("Test User");
        user = userRepository.save(user); // <-- persist to get ID

        // Create and save a plant with valid owner
        Plant plant = new Plant(
                null,
                "Ficus",
                "Loves indirect sunlight",
                null,
                null,
                user
        );
        plantRepository.save(plant);

        // Fetch and verify
        List<Plant> all = plantRepository.findAll();
        assertFalse(all.isEmpty());
    }

}
