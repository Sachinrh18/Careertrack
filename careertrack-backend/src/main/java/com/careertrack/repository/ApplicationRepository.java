package com.careertrack.repository;

import com.careertrack.entity.Application;
import com.careertrack.entity.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByCompanyNameContainingIgnoreCase(String companyName);

    List<Application> findByStatus(ApplicationStatus status);

}