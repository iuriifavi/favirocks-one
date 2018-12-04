import React from 'react';
import logo from "./logo.svg";
import './main-menu.css';

import ActivePlacer from "./active-placer";

var MainMenu = (props) => {
  return <div className="main-menu">
      <div className="menu-logo">
        <ActivePlacer limit={40} handlePointer={true}>
          <img className="menu-logo" src={logo} alt="Favi Rocks with React" />
        </ActivePlacer>
      </div>
    </div>;
}

export default MainMenu;