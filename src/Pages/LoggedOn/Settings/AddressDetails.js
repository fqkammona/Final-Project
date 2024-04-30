import React, { useEffect, useState } from "react";
import Select from "react-select";
import './AddressDetails.css';

const CountrySelect = ({ selectedCountry, setSelectedCountry }) => {
    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      fetch(
        "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
      )
        .then((response) => response.json())
        .then((data) => {
          setCountries(data.countries);
        });
    }, []);

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };

    return (
        <Select
          className="country-select"  // Add a custom class name here
          options={countries}
          value={selectedCountry}
          onChange={handleCountryChange}
        />
      );
      
};

const AddressDetails = ({ addressDetails, setAddressDetails }) => {
    const handleChange = (field, value) => {
        setAddressDetails({ ...addressDetails, [field]: value });
    };

    // Managing the country state here and updating it appropriately
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        // Assume we initialize it based on some external data
        if (addressDetails.country) {
            setSelectedCountry({ label: addressDetails.country, value: addressDetails.country });
        }
    }, [addressDetails.country]);

    return (
        <div className="address-container">
            <form className="address-form">
                <div className="header-row">
                    <div className="address-title">Address Details</div>
                </div>
                <div className="input-row">
                    <div className="input-address">
                        <div className="input-label">Address</div>
                        <input
                            type="text"
                            className="address-field"
                            placeholder="Address"
                            value={addressDetails.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                        />
                    </div>
                    <div className="input-address">
                        <div className="input-label">City</div>
                        <input
                            type="text"
                            className="address-field"
                            placeholder="City"
                            value={addressDetails.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                        />
                    </div>
                </div>
                <div className="input-row">
                    {['State', 'Postal Code'].map(field => (
                        <div className="input-address" key={field}>
                            <div className="input-label">{field}</div>
                            <input
                                type="text"
                                className="address-field"
                                placeholder={field}
                                value={addressDetails[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                            />
                        </div>
                    ))}
                    <div className="input-address">
                        <div className="input-label">Country</div>
                        <CountrySelect
                            selectedCountry={selectedCountry}
                            setSelectedCountry={(option) => {
                                setSelectedCountry(option);
                                handleChange('country', option ? option.label : '');
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddressDetails;
