package com.psyntify.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.psyntify.backend.dto.PlantRequestDto;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MyPlantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private User testUser;

    @BeforeEach
    void setup() {
        testUser = userRepository.findByUsername("demo").orElseThrow();

        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(testUser, null, List.of());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    @WithMockUser(username = "demo")
    void shouldGetOwnPlants() throws Exception {
        mockMvc.perform(get("/my/plants"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @WithMockUser(username = "demo")
    void shouldCreatePlant() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                "test image content".getBytes()
        );

        mockMvc.perform(multipart("/my/plants")
                        .file(file)
                        .param("name", "Test Plant")
                        .param("description", "Loves sun"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Plant"));
    }

    @Test
    @WithMockUser(username = "demo")
    void shouldUpdatePlant() throws Exception {
        Plant plant = new Plant();
        plant.setName("Old");
        plant.setDescription("Desc");
        plant.setOwner(testUser);
        plant = plantRepository.save(plant);

        PlantRequestDto update = new PlantRequestDto();
        update.setName("Updated");
        update.setDescription("Updated description");

        mockMvc.perform(put("/my/plants/" + plant.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(update)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated"));
    }

    @Test
    @WithMockUser(username = "demo")
    void shouldDeletePlant() throws Exception {
        Plant plant = new Plant();
        plant.setName("ToDelete");
        plant.setDescription("Soon");
        plant.setOwner(testUser);
        plant = plantRepository.save(plant);

        mockMvc.perform(delete("/my/plants/" + plant.getId()))
                .andExpect(status().isNoContent());

        Optional<Plant> deleted = plantRepository.findById(plant.getId());
        assertThat(deleted).isEmpty();
    }
}