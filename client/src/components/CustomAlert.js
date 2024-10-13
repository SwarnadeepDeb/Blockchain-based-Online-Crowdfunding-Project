
import React from 'react';
import './CustomAlert.css'; 

const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert">
            <div className="custom-alert-content">
                <span>{message}</span>
                <button onClick={onClose} className="close-button">×</button>
            </div>
        </div>
    );
};

export default CustomAlert;
