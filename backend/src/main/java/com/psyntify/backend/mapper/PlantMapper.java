package com.psyntify.backend.mapper;

import com.psyntify.backend.dto.PlantRequestDto;
import com.psyntify.backend.dto.PlantResponseDto;
import com.psyntify.backend.model.Plant;
import com.psyntify.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class PlantMapper {

    public Plant toEntity(PlantRequestDto dto, User owner) {
        return new Plant(null, dto.getName(), dto.getDescription(), owner);
    }

    public PlantResponseDto toDto(Plant plant) {
        return new PlantResponseDto(
                plant.getId(),
                plant.getName(),
                plant.getDescription(),
                plant.getOwner().getId()
        );
    }

    public void updateEntity(Plant plant, PlantRequestDto dto) {
        plant.setName(dto.getName());
        plant.setDescription(dto.getDescription());
    }
}
