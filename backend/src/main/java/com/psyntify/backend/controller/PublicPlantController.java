package com.psyntify.backend.controller;

import com.psyntify.backend.dto.PlantResponseDto;
import com.psyntify.backend.service.PlantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/plants")
public class PublicPlantController {

    private final PlantService service;

    public PublicPlantController(PlantService service) {
        this.service = service;
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<PlantResponseDto>> getByUsername(@PathVariable String username) {
        return ResponseEntity.ok(service.getByUsername(username));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantResponseDto> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
