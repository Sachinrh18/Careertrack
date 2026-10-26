package com.careertrack.service;

import com.careertrack.entity.Application;
import com.careertrack.entity.enums.ApplicationStatus;

import java.util.List;

public interface ApplicationService {

    Application saveApplication(Application application);

    List<Application> getAllApplications();

    Application getApplicationById(Long id);

    Application updateStatusAndNotes(Long id,
                                     ApplicationStatus status,
                                     String notes);

    void deleteApplication(Long id);

    List<Application> searchByCompany(String companyName);

    List<Application> getApplicationsByStatus(ApplicationStatus status);
}