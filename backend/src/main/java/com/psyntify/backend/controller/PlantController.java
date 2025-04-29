package com.psyntify.backend.controller;

import com.psyntify.backend.dto.PlantRequestDto;
import com.psyntify.backend.dto.PlantResponseDto;
import com.psyntify.backend.model.User;
import com.psyntify.backend.service.PlantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plants")
public class PlantController {

    private final PlantService service;

    public PlantController(PlantService service) {
        this.service = service;
    }

    @GetMapping
    public List<PlantResponseDto> getAll(@AuthenticationPrincipal User user) {
        return service.getAll(user)
                .stream()
                .sorted(Comparator.comparing(PlantResponseDto::getId))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantResponseDto> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<PlantResponseDto> create(@RequestParam("name") String name,
                                                   @RequestParam("description") String description,
                                                   @RequestParam(value = "file", required = false) MultipartFile file,
                                                   @AuthenticationPrincipal User user) {
        PlantRequestDto dto = new PlantRequestDto();
        dto.setName(name);
        dto.setDescription(description);

        return ResponseEntity.ok(service.create(dto, file, user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlantResponseDto> update(@PathVariable Long id,
                                                   @Valid @RequestBody PlantRequestDto dto,
                                                   @AuthenticationPrincipal User user) {
        return service.update(id, dto, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
                                       @AuthenticationPrincipal User user) {
        return service.delete(id, user)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
