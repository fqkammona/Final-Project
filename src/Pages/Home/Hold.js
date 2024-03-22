import React from 'react';
import './MountainRanges.css';

const Mountain = ({ d, fill }) => (
  <path d={d} fill={fill} className="mountain" />
);

const CustomCloud = () => {
  return (
    <g className="custom-cloud" transform="scale(0.3) translate(100, 450)">
      <path d="M 64.97005997160954 324.8502920915981 A  110 110 0 1 1 143.71257485029935 141.31736526946105 A  110 110 0 1 1 345.2095727977638 168.8622783729416 A  110 110 0 1 1 618.263474515812 187.42514755340397 A  110 110 0 1 1 722.1556743690353 356.88621996120065 A  110 110 0 1 1 498.502977930857 351.4970154905034 A  110 110 0 1 1 129.6407185628742 427.245508982036 A  110 110 0 1 1 64.97005997160954 324.8502920915981 Z" fill="var(--cloud-color)" />
    </g>
  );
};

const AnotherCloud = () => {
  return (
    <g className="another-cloud" transform="scale(0.4) translate(1800, 450)">
          <path d="M 64.97005997160954 324.8502920915981 A  110 110 0 1 1 143.71257485029935 141.31736526946105 A  110 110 0 1 1 345.2095727977638 168.8622783729416 A  110 110 0 1 1 618.263474515812 187.42514755340397 A  110 110 0 1 1 722.1556743690353 356.88621996120065 A  110 110 0 1 1 498.502977930857 351.4970154905034 A  110 110 0 1 1 129.6407185628742 427.245508982036 A  110 110 0 1 1 64.97005997160954 324.8502920915981 Z" fill="var(--cloud-color)" />
        </g>
      );
  };

  const Sun = ({ className }) => {
    return (
      <>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle className={className} cx="500" cy="200" r="80" fill="var(--cloud-color)" filter="url(#glow)" />
      </>
    );
  };
  
  

const scaleY = (y) => y * 1.15; // Adjust scale factor as needed

// Function to adjust the d path with the new y values
const scalePath = (d) => {
  return d.replace(/(\d+),(\d+)/g, (match, x, y) => `${x},${scaleY(parseInt(y))}`);
};

const MountainRanges = () => {
  return (
    <svg viewBox="0 0 1000 1000" className="mountain-ranges">
      {/* Background sky */}
      <rect x="0" y="0" width="100%" height="100%" fill="var(--lightBlue)" />


      <Sun className="sun-animation" />

      {/* Custom Clouds */}
      <CustomCloud className="custom-cloud"/>
      <AnotherCloud className="another-cloud" />

      <div className="big-cloud"></div>
      {/* Mountain 1*/}
      <Mountain d={scalePath("M0,300 L150,190 L250,310 L750,160 L1000,290 L1000,450 L0,450 Z")} fill="var(--firstMountain)" />
      
      {/* Mountain 2 */}
      <Mountain d={scalePath("M0,330 L300,230 L500,330 L890,210 L1000,300 L1000,450 L0,450 Z")} fill="var(--secondMountain)" />
      
      {/* Mountain 3 */}
      <Mountain d={scalePath("M0,380 L200,310 L400,380 L600,260 L800,380 L1000,310 L1000,450 L0,450 Z")} fill="var(--thirdMountain)" />
      
      {/* Mountain 4 */}
      <Mountain className="mountain-4-animation" Mountain d={scalePath("M0,430 L90,320 L350,400 L550,310 L790,420 L850,360 L1000,450 L0,450 Z")} fill="var(--fourthMountain)" />
      
      {/* Mountain 5 */}
      <Mountain className="mountain-5-animation" Mountain d={scalePath("M0,430 L210,390 L470,450 L600,390 L800,440 L850,400 L1250,520 L0,530 Z")} fill="var(--fifthMountain)" />
    
      {/* Trees and other details can be added here */}
    </svg>
  );
}

export default MountainRanges;


import React from 'react';
import './MountainRanges.css';

const Mountain = ({ d, fill }) => (
  <path d={d} fill={fill} className="mountain" />
);

const CustomCloud = () => {
  return (
    <g className="custom-cloud">
      <path d="M 64.97005997160954 324.8502920915981 A  110 110 0 1 1 143.71257485029935 141.31736526946105 A  110 110 0 1 1 345.2095727977638 168.8622783729416 A  110 110 0 1 1 618.263474515812 187.42514755340397 A  110 110 0 1 1 722.1556743690353 356.88621996120065 A  110 110 0 1 1 498.502977930857 351.4970154905034 A  110 110 0 1 1 129.6407185628742 427.245508982036 A  110 110 0 1 1 64.97005997160954 324.8502920915981 Z"/>
    </g>
  );
};

const AnotherCloud = () => {
  return (
    <g className="another-cloud">
      <path d="M 64.97005997160954 324.8502920915981 A  110 110 0 1 1 143.71257485029935 141.31736526946105 A  110 110 0 1 1 345.2095727977638 168.8622783729416 A  110 110 0 1 1 618.263474515812 187.42514755340397 A  110 110 0 1 1 722.1556743690353 356.88621996120065 A  110 110 0 1 1 498.502977930857 351.4970154905034 A  110 110 0 1 1 129.6407185628742 427.245508982036 A  110 110 0 1 1 64.97005997160954 324.8502920915981 Z"/>
    </g>
  );
};

  const Sun = ({ className }) => {
    return (
      <>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle className={className} cx="500" cy="200" r="80" fill="var(--cloud-color)" filter="url(#glow)" />
      </>
    );
  };
  

const scaleY = (y) => y * 1.15; // Adjust scale factor as needed

// Function to adjust the d path with the new y values
const scalePath = (d) => {
  return d.replace(/(\d+),(\d+)/g, (match, x, y) => `${x},${scaleY(parseInt(y))}`);
};

const MountainRanges = () => {
  return (
    <svg viewBox="0 0 1000 1000" className="mountain-ranges">
      {/* Background sky */}
      <rect x="0" y="0" width="100%" height="100%" fill="var(--lightBlue)" />


      <Sun className="sun-animation" />

      {/* Custom Clouds */}
      <CustomCloud className="custom-cloud"/>
      <AnotherCloud className="another-cloud" />

      {/* Mountain 1*/}
      <Mountain className="mountain1" d={scalePath("M0,300 L150,190 L250,310 L750,160 L1000,290 L1000,450 L0,450 Z")} fill="var(--firstMountain)" />
      
      {/* Mountain 2 */}
      <Mountain d={scalePath("M0,330 L300,230 L500,330 L890,210 L1000,300 L1000,450 L0,450 Z")} fill="var(--secondMountain)" />
      
      {/* Mountain 3 */}
      <Mountain d={scalePath("M0,380 L200,310 L400,380 L600,260 L800,380 L1000,310 L1000,450 L0,450 Z")} fill="var(--thirdMountain)" />
      
      {/* Mountain 4 */}
      <Mountain className="mountain-4-animation" Mountain d={scalePath("M0,430 L90,320 L350,400 L550,310 L790,420 L850,360 L1000,450 L0,450 Z")} fill="var(--fourthMountain)" />
      
      {/* Mountain 5 */}
      <Mountain className="mountain-5-animation" Mountain d={scalePath("M0,430 L210,390 L470,450 L600,390 L800,440 L850,400 L1250,520 L0,530 Z")} fill="var(--fifthMountain)" />
    
      {/* Trees and other details can be added here */}
    </svg>
  );
}

export default MountainRanges;
