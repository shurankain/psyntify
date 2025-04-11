package com.psyntify.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.psyntify.backend.dto.AuthRequestDto;
import com.psyntify.backend.model.User;
import com.psyntify.backend.service.AuthService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @SuppressWarnings("unused")
    @MockitoBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testRegister() throws Exception {
        AuthRequestDto dto = new AuthRequestDto("testuser", "password123");
        User mockUser = new User();
        mockUser.setUsername("testuser");
        mockUser.setId(1L);

        Mockito.when(authService.register(dto)).thenReturn(mockUser);

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("testuser")))
                .andExpect(jsonPath("$.id", is(1)));
    }

    @Test
    void testLogin() throws Exception {
        AuthRequestDto dto = new AuthRequestDto("testuser", "password123");
        String token = "mocked.jwt.token";

        Mockito.when(authService.login(dto)).thenReturn(token);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", is(token)));
    }
}
