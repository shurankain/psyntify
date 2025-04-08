package com.psyntify.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlantResponseDto {
    private Long id;
    private String name;
    private String description;
}
