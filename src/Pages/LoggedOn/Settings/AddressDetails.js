import React, { useState } from 'react';
import './AddressDetails.css';
import { FaLock, FaUnlock } from "react-icons/fa";

const AddressDetails = ({ addressDetails, setAddressDetails }) => {
    const [isEditable, setIsEditable] = useState(false);

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const handleChange = (field, value) => {
        setAddressDetails({ ...addressDetails, [field]: value });
    };

    return (
        <div className="address-container">
            <form className="address-form">
                <div className="header-row">
                    <div className="address-title">Address Details</div>
                    <div onClick={toggleEdit} className="input-icon">
                        {isEditable ? <FaUnlock /> : <FaLock />}
                    </div>
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
                            disabled={!isEditable}
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
                            disabled={!isEditable}
                        />
                    
                    </div>
                </div>
                <div className="input-row">
                    {['state', 'postalCode', 'country'].map(field => (
                        <div className="input-address" key={field}>
                            <div className="input-label">{field}</div>
                            <input
                                type="text"
                                className="address-field"
                                placeholder={field}
                                value={addressDetails[field]}
                                onChange={(e) => handleChange(field, e.target.value)}
                                disabled={!isEditable}
                            />
                    
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default AddressDetails;
