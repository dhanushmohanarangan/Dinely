package com.dhanush.dinely.controller;

import com.dhanush.dinely.entity.MealPreference;
import com.dhanush.dinely.service.MealPreferenceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/meals")
public class MealPreferenceController {

    private final MealPreferenceService service;

    public MealPreferenceController(MealPreferenceService service) {
        this.service = service;
    }

    @GetMapping
    public List<MealPreference> getAllMeals() {
        return service.getAllMeals();
    }

    @PostMapping
    public MealPreference saveMeal(@RequestBody MealPreference mealPreference) {
        return service.saveMeal(mealPreference);
    }

    @DeleteMapping
    public void deleteAllMeals() {
        service.deleteAllMeals();
    }
}