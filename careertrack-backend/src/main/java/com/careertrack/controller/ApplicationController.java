package com.careertrack.controller;

import com.careertrack.entity.Application;
import com.careertrack.entity.enums.ApplicationStatus;
import com.careertrack.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public Application saveApplication(@RequestBody Application application) {
        return applicationService.saveApplication(application);
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id);
    }

    @PutMapping("/{id}/status")
    public Application updateStatusAndNotes(@PathVariable Long id,
                                            @RequestParam ApplicationStatus status,
                                            @RequestParam String notes) {
        return applicationService.updateStatusAndNotes(id, status, notes);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
    }

    @GetMapping("/search")
    public List<Application> searchByCompany(@RequestParam String companyName) {
        return applicationService.searchByCompany(companyName);
    }

    @GetMapping("/status")
    public List<Application> getApplicationsByStatus(@RequestParam ApplicationStatus status) {
        return applicationService.getApplicationsByStatus(status);
    }
}