package com.psyntify.backend.mapper;

import com.psyntify.backend.dto.PlantRequestDto;
import com.psyntify.backend.dto.PlantResponseDto;
import com.psyntify.backend.model.Plant;
import com.psyntify.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class PlantMapper {

    public Plant toEntity(PlantRequestDto dto, User owner) {
        return new Plant(null, dto.getName(), dto.getDescription(), null, null, owner);
    }

    public PlantResponseDto toDto(Plant plant) {
        PlantResponseDto dto = new PlantResponseDto();
        dto.setId(plant.getId());
        dto.setName(plant.getName());
        dto.setDescription(plant.getDescription());
        dto.setHasImage(plant.getImage() != null);
        dto.setImageType(plant.getImageType());
        return dto;
    }

    public void updateEntity(Plant plant, PlantRequestDto dto) {
        plant.setName(dto.getName());
        plant.setDescription(dto.getDescription());
        // при обновлении картинку не трогаем — это другой use-case
    }
}