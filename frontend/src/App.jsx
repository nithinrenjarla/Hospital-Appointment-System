
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
const [patientError, setPatientError] = useState('')
const [loadingDoctors, setLoadingDoctors] = useState(false)
const [doctorError, setDoctorError] = useState('')

const [appointments, setAppointments] = useState([])
const [appointmentError, setAppointmentError] = useState('')
const [appointmentMessage, setAppointmentMessage] = useState('')
const [booking, setBooking] = useState(false)

const [appointmentForm, setAppointmentForm] = useState({
  patientId: '',
  doctorId: '',
  appointmentDateTime: '',
  reason: '',
  status: 'BOOKED',
})

useEffect(() => {
  if (activeTab !== 'Appointments') return

  setAppointmentError('')
  setAppointmentMessage('')

  fetch('http://localhost:8080/api/appointments')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load appointments')
      }
      return response.json()
    })
    .then((data) => {
      setAppointments(data)
    })
    .catch(() => {
      setAppointmentError(
        'Could not load appointments. Check that the backend is running.'
      )
    })
}, [activeTab])



useEffect(() => {
  if (activeTab !== 'Doctors' && activeTab !== 'Appointments') return

  setLoadingDoctors(true)
  setDoctorError('')

  fetch('http://localhost:8080/api/doctors')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load doctors')
      }
      return response.json()
    })
    .then((data) => {
      setDoctors(data)
    })
    .catch(() => {
      setDoctorError('Could not load doctors. Check that the backend is running.')
    })
    .finally(() => {
      setLoadingDoctors(false)
    })
}, [activeTab])

  



useEffect(() => {
  if (activeTab !== 'Patients' && activeTab !== 'Appointments') return

  setPatientError('')

  fetch('http://localhost:8080/api/patients')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to load patients')
      return response.json()
    })
    .then((data) => setPatients(data))
    .catch(() => {
      setPatientError('Could not load patients. Check that the backend is running.')
    })
}, [activeTab])



const handleBookAppointment = (event) => {
  event.preventDefault()

  setBooking(true)
  setAppointmentError('')
  setAppointmentMessage('')

  fetch('http://localhost:8080/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patientId: Number(appointmentForm.patientId),
      doctorId: Number(appointmentForm.doctorId),
      appointmentDateTime: appointmentForm.appointmentDateTime,
      reason: appointmentForm.reason,
      status: 'BOOKED',
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Booking failed. Check the selected patient and doctor.')
      }
      return response.json()
    })
    .then((newAppointment) => {
      setAppointments((previous) => [...previous, newAppointment])
      setAppointmentMessage('Appointment booked successfully!')
      setAppointmentForm({
        patientId: '',
        doctorId: '',
        appointmentDateTime: '',
        reason: '',
        status: 'BOOKED',
      })
    })
    .catch((error) => {
      setAppointmentError(error.message || 'Could not book appointment.')
    })
    .finally(() => {
      setBooking(false)
    })
}

useEffect(() => {
  if (activeTab !== 'Appointments') return

  setAppointmentError('')

  fetch('http://localhost:8080/api/appointments')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load appointments')
      }
      return response.json()
    })
    .then((data) => {
      setAppointments(data)
    })
    .catch(() => {
      setAppointmentError(
        'Could not load appointments. Check that the backend is running.'
      )
    })
}, [activeTab])

const menuItems = [
    { name: 'Dashboard', icon: '▦' },
    { name: 'Doctors', icon: '⚕' },
    { name: 'Patients', icon: '♙' },
    { name: 'Appointments', icon: '▣' },
  ]

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">+</div>
          <div>
            <h2>CarePoint</h2>
            <span>HOSPITAL MANAGEMENT</span>
          </div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="support-icon">?</div>
          <div>
            <strong>Need help?</strong>
            <p>Contact your administrator</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Pages / {activeTab}</p>
            <h1>{activeTab}</h1>
          </div>
          <div className="profile">
            <div className="notification">♧</div>
            <div className="avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <p>Hospital Admin</p>
            </div>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <>
            <section className="welcome-banner">
              <div>
                <p className="eyebrow">HOSPITAL OVERVIEW</p>
                <h2>Welcome to CarePoint</h2>
                <p>Manage doctors, patients and appointments in one place.</p>
              </div>
              <div className="welcome-symbol">✚</div>
            </section>

            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue">⚕</div>
                <p>Total Doctors</p>
                <h2>Manage doctors</h2>
                <span>View and add doctors</span>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">♙</div>
                <p>Total Patients</p>
                <h2>Manage patients</h2>
                <span>Register new patients</span>
              </div>
              <div className="stat-card">
                <div className="stat-icon purple">▣</div>
                <p>Appointments</p>
                <h2>Manage bookings</h2>
                <span>Book or cancel visits</span>
              </div>
            </section>

            <section className="content-card">
              <div className="section-heading">
                <div>
                  <h2>Quick Actions</h2>
                  <p>Choose what you want to do next.</p>
                </div>
              </div>

              <div className="actions-grid">
                <button onClick={() => setActiveTab('Doctors')}>
                  <span className="action-icon blue">⚕</span>
                  <span>
                    <strong>View Doctors</strong>
                    <small>Browse available doctors</small>
                  </span>
                  <span className="arrow">→</span>
                </button>

                <button onClick={() => setActiveTab('Patients')}>
                  <span className="action-icon green">♙</span>
                  <span>
                    <strong>Register Patient</strong>
                    <small>Add patient information</small>
                  </span>
                  <span className="arrow">→</span>
                </button>

                <button onClick={() => setActiveTab('Appointments')}>
                  <span className="action-icon purple">▣</span>
                  <span>
                    <strong>Book Appointment</strong>
                    <small>Schedule a doctor visit</small>
                  </span>
                  <span className="arrow">→</span>
                </button>
              </div>
            </section>
          </>
        )}

        


{activeTab === 'Doctors' ? (
  <section className="content-card">
    <div className="section-heading">
      <h2>Our Doctors</h2>
      <p>Doctor details from your hospital database.</p>
    </div>

    {doctorError && <p className="error-message">{doctorError}</p>}
    {doctors.length === 0 && !doctorError && <p>No doctors found.</p>}

    <div className="doctor-grid">
      {doctors.map((doctor) => (
        <div className="doctor-card" key={doctor.id}>
          <div className="doctor-avatar">⚕</div>
          <h3>{doctor.name}</h3>
          <p>{doctor.specialization}</p>
          <p>{doctor.email}</p>
          <p>Phone: {doctor.phone}</p>
          <strong>Consultation fee: ₹{doctor.consultationFee}</strong>
        </div>
      ))}
    </div>
  </section>
) : activeTab === 'Patients' ? (
  <section className="content-card">
    <div className="section-heading">
      <h2>Our Patients</h2>
      <p>Patient details from your hospital database.</p>
    </div>

    {patientError && <p className="error-message">{patientError}</p>}
    {patients.length === 0 && !patientError && <p>No patients found.</p>}

    <div className="doctor-grid">
      {patients.map((patient) => (
        <div className="doctor-card" key={patient.id}>
          <div className="doctor-avatar">♙</div>
          <h3>{patient.name}</h3>
          <p>Age: {patient.age}</p>
          <p>Gender: {patient.gender}</p>
          <p>{patient.email}</p>
          <p>Phone: {patient.phone}</p>
          <p>Address: {patient.address}</p>
        </div>
      ))}
    </div>
  </section>
) : activeTab === 'Appointments' ? (
  <AppointmentSection doctors={doctors} patients={patients} />
) : null}



        <footer>
          CarePoint Hospital Management System
          <span>Built with React and Spring Boot</span>
        </footer>
      </main>
    </div>
  )

function AppointmentSection({ doctors }) {
  const [patient, setPatient] = useState({
  name: '',
  phone: '',
})
console.log('Doctors for booking:', doctors)
console.log('Patients for booking:', patients)
  const [appointments, setAppointments] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [booking, setBooking] = useState(false)

  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    appointmentDateTime: '',
    reason: '',
    status: 'BOOKED',
  })

  useEffect(() => {
    loadAppointments()
  }, [])

  function loadAppointments() {
    fetch('http://localhost:8080/api/appointments')
      .then((response) => {
        if (!response.ok) throw new Error()
        return response.json()
      })
      .then(setAppointments)
      .catch(() => setError('Could not load appointments.'))
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  
async function handleSubmit(event) {
  event.preventDefault()
  setError('')
  setMessage('')

  if (
    !patient.name.trim() ||
    !patient.phone.trim() ||
    !form.doctorId ||
    !form.appointmentDateTime ||
    !form.reason.trim()
  ) {
    setError('Please fill in all fields.')
    return
  }

  setBooking(true)

  try {
    // Step 1: Register the new patient
    const patientResponse = await fetch('http://localhost:8080/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
  name: patient.name.trim(),
  age: 0,
  gender: '',
  email: '',
  phone: patient.phone.trim(),
  address: '',
}),
    })

    if (!patientResponse.ok) {
      throw new Error('Could not register patient. Please check the details.')
    }

    const savedPatient = await patientResponse.json()

    // Step 2: Book the appointment for that patient
    const appointmentResponse = await fetch(
      'http://localhost:8080/api/appointments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: savedPatient.id,
          doctorId: Number(form.doctorId),
          appointmentDateTime: form.appointmentDateTime,
          reason: form.reason.trim(),
          status: 'BOOKED',
        }),
      }
    )

    if (!appointmentResponse.ok) {
      throw new Error(
        'Patient registered, but appointment booking failed. Please check the doctor and appointment details.'
      )
    }

    setMessage('Appointment booked successfully!')

    setPatient({ name: '', phone: '' })

    setForm({
      patientId: '',
      doctorId: '',
      appointmentDateTime: '',
      reason: '',
      status: 'BOOKED',
    })

    loadAppointments()
  } catch (err) {
    setError(err.message || 'Could not book appointment.')
  } finally {
    setBooking(false)
  }
}

  async function cancelAppointment(id) {
    if (!window.confirm('Cancel this appointment?')) return

    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/${id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) throw new Error('Could not cancel appointment.')

      setMessage('Appointment cancelled.')
      loadAppointments()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="content-card">
      <div className="section-heading">
        <h2>Book an Appointment</h2>
        <p>Select a registered patient and doctor.</p>
      </div>

      <form onSubmit={handleSubmit} className="appointment-form">
        <label>Patient Name</label>
<input
  name="name"
  value={patient.name}
  onChange={(e) => setPatient({ ...patient, name: e.target.value })}
  placeholder="Enter patient name"
  required
/>

<label>Phone Number</label>
<input
  name="phone"
  type="tel"
  value={patient.phone}
  onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
  placeholder="Enter phone number"
  required
/>
        

        <label>Doctor</label>
        <select name="doctorId" value={form.doctorId}
          onChange={handleChange} required>
          <option value="">Select doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.specialization}
            </option>
          ))}
        </select>

        <label>Date and time</label>
        <input type="datetime-local" name="appointmentDateTime"
          value={form.appointmentDateTime} onChange={handleChange} required />

        <label>Reason for visit</label>
        <input name="reason" value={form.reason}
          onChange={handleChange} placeholder="e.g. General checkup" required />

        <button className="primary-button" type="submit" disabled={booking}>
          {booking ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>

      {message && <p>{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="section-heading">
        <h2>Existing Appointments</h2>
      </div>

      {appointments.length === 0 && <p>No appointments found.</p>}

      {appointments.map((a) => (
        <div className="doctor-card" key={a.id}>
          <h3>Appointment #{a.id}</h3>
          <p>Patient ID: {a.patientId}</p>
          <p>Doctor ID: {a.doctorId}</p>
          <p>Date: {a.appointmentDateTime}</p>
          <p>Reason: {a.reason}</p>
          <p>Status: {a.status}</p>
          <button className="primary-button"
            onClick={() => cancelAppointment(a.id)}>
            Cancel Appointment
          </button>
        </div>
      ))}
    </section>
  )
}
}

export default App
