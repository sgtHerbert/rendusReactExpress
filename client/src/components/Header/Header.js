import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (


    <nav>
      
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/appart">Liste appartement</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profil">Profile</Link>
        </li>
        
      </ul>
    </nav>
);

export default Header;
