package com.psyntify.backend;

import com.psyntify.backend.model.Plant;
import com.psyntify.backend.repository.PlantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class PlantRepositoryTest {

    @Autowired
    PlantRepository repo;

    @Test
    void testSaveAndFetch() {
        repo.save(new Plant(null, "Test Plant", "Just testing"));
        List<Plant> all = repo.findAll();
        assertFalse(all.isEmpty());
    }
}
