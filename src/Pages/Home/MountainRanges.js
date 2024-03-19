import React from 'react';
import './MountainRanges.css';

const Mountain = ({ d, fill }) => (
  <path d={d} fill={fill} className="mountain" />
);

const scaleY = (y) => y * 1.15; // Adjust scale factor as needed

// Function to adjust the d path with the new y values
const scalePath = (d) => {
  return d.replace(/(\d+),(\d+)/g, (match, x, y) => `${x},${scaleY(parseInt(y))}`);
};

const MountainRanges = () => {
  return (
    <svg viewBox="0 0 1000 1000" className="mountain-ranges">
      {/* Background sky */}
      <rect x="0" y="0" width="100%" height="100%" fill="var(--whiteClouds)" />
      
      {/* Mountains */}
      <Mountain d={scalePath("M0,300 L150,190 L250,310 L750,160 L1000,290 L1000,450 L0,450 Z")} fill="var(--firstMountain)" />
      
      {/* Mountain 2 */}
      <Mountain d={scalePath("M0,330 L300,230 L500,330 L890,210 L1000,300 L1000,450 L0,450 Z")} fill="var(--secondMountain)" />
      
      {/* Mountain 3 */}
      <Mountain d={scalePath("M0,380 L200,310 L400,380 L600,260 L800,380 L1000,310 L1000,450 L0,450 Z")} fill="var(--thirdMountain)" />
      
      {/* Mountain 4 */}
      <Mountain d={scalePath("M0,430 L90,320 L350,400 L550,310 L790,420 L850,360 L1000,450 L0,450 Z")} fill="var(--fourthMountain)" />
      
      {/* Mountain 5 */}
      <Mountain d={scalePath("M0,430 L210,390 L470,450 L600,390 L800,440 L850,400 L1250,520 L0,530 Z")} fill="var(--fifthMountain)" />
    
      {/* Trees and other details can be added here */}
    </svg>
  );
}

export default MountainRanges;
