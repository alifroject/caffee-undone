import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface FilterFormProps {
  selectedCountry?: string; // Optional selectedCountry
}

const FilterForm: React.FC<FilterFormProps> = ({ selectedCountry }) => {
  const [checkedCities, setCheckedCities] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    if (selectedCountry) {
      params.set('country', selectedCountry);
    }
    
    if (checkedCities.length > 0) {
      params.set('city', checkedCities.join(','));
    } else {
      params.delete('city');
    }
    
    navigate('?' + params.toString(), { replace: true });
  }, [checkedCities, selectedCountry, navigate, location.search]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCheckedCities((prevCities) =>
      checked ? [...prevCities, value] : prevCities.filter((city) => city !== value)
    );
  };

  return (
    <form>
      <input
        type="checkbox"
        id="jakarta"
        value="Jakarta"
        onChange={handleCheckboxChange}
      /> Jakarta <br />
      <input
        type="checkbox"
        id="bandung"
        value="Bandung"
        onChange={handleCheckboxChange}
      /> Bandung <br />
      <input
        type="checkbox"
        id="surabaya"
        value="Surabaya"
        onChange={handleCheckboxChange}
      /> Surabaya <br />
    </form>
  );
};

export default FilterForm;
