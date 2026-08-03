package com.dhanush.dinely.service;

import com.dhanush.dinely.entity.MealPreference;
import com.dhanush.dinely.repository.MealPreferenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealPreferenceService {

    private final MealPreferenceRepository repository;

    public MealPreferenceService(MealPreferenceRepository repository) {
        this.repository = repository;
    }

    public List<MealPreference> getAllMeals() {
        return repository.findAll();
    }

    public MealPreference saveMeal(MealPreference mealPreference) {
        return repository.save(mealPreference);
    }

    public void deleteAllMeals() {
        repository.deleteAll();
    }
}