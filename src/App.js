import React, { useState, useEffect } from 'react';
import DoctorList from './components/DoctorList';
import './App.css';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((doc) => ({
          ...doc,
          experience: typeof doc.experience === 'number' ? doc.experience : parseInt(doc.experience) || 0,
          fee: typeof doc.fees === 'number' ? doc.fees : parseInt(doc.fees) || 0,
          specialties: doc.specialities ? doc.specialities.map(s => s.name) : ['General Medicine'],
          consultationModes: doc.consultationModes || ['In-person'],
        }));
  
        setDoctors(updatedData);
        console.log(updatedData);
      })
      .catch((err) => console.error('Error fetching doctors:', err));
  }, []);
  

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const handleSpecialtyChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSpecialties((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value)
    );
  };

  const handleSortChange = (e) => setSortOption(e.target.value);

  const filteredDoctors = doctors
    .filter((doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (doc) =>
        selectedSpecialties.length === 0 ||
        (doc.specialties &&
          selectedSpecialties.some((s) => doc.specialties.includes(s)))
    )
    .sort((a, b) => {
      if (sortOption === 'experience') return b.experience - a.experience;
      if (sortOption === 'fees') return a.fee - b.fee;
      return 0;
    });

  const uniqueSpecialties = Array.from(
    new Set(
      doctors.flatMap((doc) =>
        Array.isArray(doc.specialties) ? doc.specialties : []
      )
    )
  );

  return (
    <div className="app">
      <h1>Doctor Listing</h1>

      <div className="filter-panel">
        <input
          type="text"
          placeholder="Search by doctor name..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />

        {uniqueSpecialties.length > 0 ? (
          <div className="specialty-filters">
            {uniqueSpecialties.map((specialty) => (
              <label key={specialty} className="specialty-option">
                <input
                  type="checkbox"
                  value={specialty}
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={handleSpecialtyChange}
                />
                {specialty}
              </label>
            ))}
          </div>
        ) : (
          <p>No specialties available</p>
        )}

        <select onChange={handleSortChange} value={sortOption} className="dropdown">
          <option value="">Sort By</option>
          <option value="experience">Experience (High to Low)</option>
          <option value="fee">Fee (Low to High)</option>
        </select>
      </div>

      <DoctorList doctors={filteredDoctors} />
    </div>
  );
}

export default App;
