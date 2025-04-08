package com.psyntify.backend.service;

import com.psyntify.backend.dto.PlantRequestDto;
import com.psyntify.backend.dto.PlantResponseDto;
import com.psyntify.backend.mapper.PlantMapper;
import com.psyntify.backend.model.Plant;
import com.psyntify.backend.repository.PlantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlantService {

    private final PlantRepository repository;
    private final PlantMapper mapper;

    public PlantService(PlantRepository repository, PlantMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<PlantResponseDto> getAll() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public Optional<PlantResponseDto> getById(Long id) {
        return repository.findById(id).map(mapper::toDto);
    }

    public PlantResponseDto create(PlantRequestDto dto) {
        Plant saved = repository.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    public Optional<PlantResponseDto> update(Long id, PlantRequestDto dto) {
        return repository.findById(id).map(existing -> {
            mapper.updateEntity(existing, dto);
            repository.save(existing);
            return mapper.toDto(existing);
        });
    }

    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
