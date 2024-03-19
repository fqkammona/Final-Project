import React from 'react';
import './Car.css'; // Ensure this path matches your file structure

const Car = () => {
  return (
    <div className="container-car">
      <div className="car-lower">
        <div className="car-bottom"></div>
        <div className="car-body"></div>
        <div className="wheel1"></div>
        <div className="wheel2"></div>
      </div>
      <div className="car-upper">
        <div className="car-top">
          <div className="Window1"></div>
          <div className="Window2"></div>
      </div>
      </div>
   </div>
  );
};

export default Car;
