package com.psyntify.backend.controller;

import com.psyntify.backend.model.Plant;
import com.psyntify.backend.model.User;
import com.psyntify.backend.repository.PlantRepository;
import com.psyntify.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class PublicPlantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlantRepository plantRepository;

    private User demoUser;

    @BeforeEach
    void setup() {
        demoUser = userRepository.findByUsername("demo").orElseThrow();
        Plant plant = new Plant();
        plant.setName("PublicPlant");
        plant.setDescription("Visible to all");
        plant.setOwner(demoUser);
        plantRepository.save(plant);
    }

    @Test
    void shouldAllowAccessToPublicPlantById() throws Exception {
        Plant plant = plantRepository.findByOwner(demoUser).get(0);

        mockMvc.perform(get("/plants/" + plant.getId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Monstera"));
    }

    @Test
    void shouldAllowAccessToPlantsByUsername() throws Exception {
        mockMvc.perform(get("/plants/user/" + demoUser.getUsername())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("[0].name").value("Monstera"));
    }
}