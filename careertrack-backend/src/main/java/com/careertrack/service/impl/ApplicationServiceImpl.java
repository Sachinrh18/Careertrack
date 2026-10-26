package com.careertrack.service.impl;

import com.careertrack.entity.Application;
import com.careertrack.entity.enums.ApplicationStatus;
import com.careertrack.repository.ApplicationRepository;
import com.careertrack.service.ApplicationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Override
    public Application saveApplication(Application application) {
        return applicationRepository.save(application);
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
    }

    @Override
    public Application updateStatusAndNotes(Long id,
                                            ApplicationStatus status,
                                            String notes) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);
        application.setNotes(notes);

        return applicationRepository.save(application);
    }

    @Override
    public void deleteApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        applicationRepository.delete(application);
    }

    @Override
    public List<Application> searchByCompany(String companyName) {
        return applicationRepository.findByCompanyNameContainingIgnoreCase(companyName);
    }

    @Override
    public List<Application> getApplicationsByStatus(ApplicationStatus status) {
        return applicationRepository.findByStatus(status);
    }
}