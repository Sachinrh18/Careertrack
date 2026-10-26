package com.careertrack.entity;

import com.careertrack.entity.enums.ApplicationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Role is required")
    private String role;

    @NotNull(message = "Applied date is required")
    private LocalDate appliedDate;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status is required")
    private ApplicationStatus status;

    @Column(length = 1000)
    private String notes;

    private String jobLink;

    private String resumeVersion;
}