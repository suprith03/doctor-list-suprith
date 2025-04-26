import React from 'react';
import './DoctorCard.css'; 

const DoctorCard = ({ doctor }) => {

  const doctorImage = '/images/doctor-sample.png';

  return (
    <div className="doctor-card">
      <img src={doctor.image || doctorImage} alt="Doctor" className="doctor-image" />
      <h2>{doctor.name || 'N/A'}</h2>

      <p><strong>Specialties:</strong> {doctor.specialties.join(', ')}</p>
      <p><strong>Experience:</strong> {`${doctor.experience}`}</p>
      <p><strong>Fee:</strong> {`${doctor.fees}`}</p>

    </div>
  );
};

export default DoctorCard;
