
package com.hospital.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HospitalController {

    @GetMapping("/api/health")
    public String healthCheck() {
        return "Hospital Appointment System Backend is running!";
    }
}

