package com.psyntify.backend.service;

import com.psyntify.backend.dto.PlantRequestDto;
import com.psyntify.backend.dto.PlantResponseDto;
import com.psyntify.backend.mapper.PlantMapper;
import com.psyntify.backend.model.Plant;
import com.psyntify.backend.model.User;
import com.psyntify.backend.repository.PlantRepository;
import com.psyntify.backend.repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlantService {

    private final PlantRepository repository;
    private final PlantMapper mapper;
    private final UserRepository userRepository;

    public PlantService(PlantRepository repository, PlantMapper mapper, UserRepository userRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.userRepository = userRepository;
    }

    public List<PlantResponseDto> getAll(User user) {
        return repository.findByOwner(user).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public Optional<PlantResponseDto> getById(Long id) {
        return repository.findById(id).map(mapper::toDto);
    }

    public List<PlantResponseDto> getByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return repository.findByOwner(user).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public PlantResponseDto create(PlantRequestDto dto, MultipartFile file, User user) {
        Plant plant = new Plant();
        plant.setName(dto.getName());
        plant.setDescription(dto.getDescription());
        plant.setOwner(user);

        if (file != null && !file.isEmpty()) {
            try {
                plant.setImage(file.getBytes());
                plant.setImageType(file.getContentType());
            } catch (IOException e) {
                throw new RuntimeException("Failed to read image file", e);
            }
        }

        Plant saved = repository.save(plant);
        return mapper.toDto(saved);
    }

    public Optional<PlantResponseDto> update(Long id, PlantRequestDto dto, User user) {
        return repository.findById(id).map(existing -> {
            if (!existing.getOwner().getId().equals(user.getId())) {
                throw new AccessDeniedException("You do not own this plant");
            }
            mapper.updateEntity(existing, dto);
            repository.save(existing);
            return mapper.toDto(existing);
        });
    }

    public boolean delete(Long id, User user) {
        return repository.findById(id).map(plant -> {
            if (!plant.getOwner().getId().equals(user.getId())) {
                throw new AccessDeniedException("You do not own this plant");
            }
            repository.deleteById(id);
            return true;
        }).orElse(false);
    }
}
