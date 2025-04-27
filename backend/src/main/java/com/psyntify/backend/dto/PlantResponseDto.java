package com.psyntify.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlantResponseDto {
    private Long id;
    private String name;
    private String description;
    private Long ownerId;
    private String imageType;
    private String base64Image;
}

