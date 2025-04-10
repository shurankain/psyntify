package com.psyntify.backend.repository;

import com.psyntify.backend.model.Plant;
import com.psyntify.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByOwner(User owner);
}

