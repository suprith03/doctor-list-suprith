import React from 'react';

const FilterPanel = ({
  searchQuery,
  handleSearch,
  uniqueSpecialties,
  selectedSpecialties,
  handleSpecialtyChange,
  sortOption,
  handleSortChange
}) => {
  return (
    <div className="filter-panel">
      <input
        type="text"
        placeholder="Search by doctor name..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

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

      <select onChange={handleSortChange} value={sortOption} className="dropdown">
        <option value="">Sort By</option>
        <option value="experience">Experience (High to Low)</option>
        <option value="fee">Fee (Low to High)</option>
      </select>
    </div>
  );
};

export default FilterPanel;
