import React, { useState, useEffect } from 'react';
import { ReactComponent as Mountain1 } from './assets/Mountain1.svg';
import { ReactComponent as Mountain2 } from './assets/Mountain2.svg';
import { ReactComponent as Mountain3 } from './assets/Mountain3.svg';
import { ReactComponent as Mountain4 } from './assets/Mountain4.svg';
import { ReactComponent as Mountain5 } from './assets/Mountain5.svg';
import { ReactComponent as Cloud1 } from './assets/Cloud1.svg';
import { ReactComponent as Cloud2 } from './assets/Cloud2.svg';
import './MountainRanges.css';

function MountainRanges() {
  const [animate, setAnimate] = useState(true);

  return (
    <div className="MountainRangesContainer">
      <div className={animate ? "sky animate" : "sky"}></div>
    
      {/* Static content */}
      <Cloud1 className={animate ? "cloud1 animate" : "cloud1"} />
      <Cloud2 className={animate ? "cloud2 animate" : "cloud2"} />
      <Mountain1 className={animate ? "mountain1 animate" : "mountain1"} />
      <Mountain2 className={animate ? "mountain2 animate" : "mountain2"} />
      <Mountain3 className={animate ? "mountain3 animate" : "mountain3"} />
      <Mountain4 className={animate ? "mountain4 animate" : "mountain4"} />
      <Mountain5 className={animate ? "mountain5 animate" : "mountain5"} />

      <div className={animate ? "MountainRanges-sun animate" : "MountainRanges-sun"}></div>


    </div>
  );
}

export default MountainRanges;