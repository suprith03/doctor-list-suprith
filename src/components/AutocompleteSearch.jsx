import React, { useState, useEffect } from 'react';

const AutocompleteSearch = ({ doctors, onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = doctors
        .filter(doc => doc.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, doctors]);

  const handleSelect = (name) => {
    setQuery(name);
    setSuggestions([]);
    onSearch(name);
  };

  return (
    <div>
      <input
        data-testid="autocomplete-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSelect(query)}
        placeholder="Search doctor..."
      />
      <ul>
        {suggestions.map((s, idx) => (
          <li key={idx} data-testid="suggestion-item" onClick={() => handleSelect(s.name)}>
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteSearch;
