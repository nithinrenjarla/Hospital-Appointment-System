
package com.hospital.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entity.Appointment;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {


    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public AppointmentController(
            AppointmentRepository appointmentRepository,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    @PostMapping
    public Appointment book(@RequestBody Appointment appointment) {
        if (!patientRepository.existsById(appointment.getPatientId())) {
            throw new RuntimeException("Patient not found");
        }

        if (!doctorRepository.existsById(appointment.getDoctorId())) {
            throw new RuntimeException("Doctor not found");
        }

        return appointmentRepository.save(appointment);
    }

    @GetMapping
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public String cancel(@PathVariable Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new RuntimeException("Appointment not found");
        }

        appointmentRepository.deleteById(id);
        return "Appointment cancelled successfully";
    }
}
