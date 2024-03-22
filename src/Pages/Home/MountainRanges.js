import React from 'react';
import { ReactComponent as Mountain1 } from './assets/Mountain1.svg';
import { ReactComponent as Mountain2 } from './assets/Mountain2.svg';
import { ReactComponent as Mountain3 } from './assets/Mountain3.svg';
import { ReactComponent as Mountain4 } from './assets/Mountain4.svg';
import { ReactComponent as Mountain5 } from './assets/Mountain5.svg';
import { ReactComponent as Cloud1 } from './assets/Cloud.svg';
import { ReactComponent as Cloud2 } from './assets/Cloud.svg';
import './MountainRanges.css';

function MountainRanges() {
  return (
    <div className="MountainRangesContainer">
      <div className="sky"></div>

      <Mountain1 className="mountain1" />
      <Mountain2 className="mountain2" />
      <Mountain3 className="mountain3" />
      <Mountain4 className="mountain4" />
      <Mountain5 className="mountain5" />
    </div>
  );
}


export default MountainRanges;
