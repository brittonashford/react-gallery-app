import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNav = () => {
    return(
        <nav class="main-nav">
        <ul>
          <li><NavLink to="/synthesizers">Synthesizers</NavLink></li>
          <li><NavLink to="/cats">Cats</NavLink></li>
          <li><NavLink to="/chanterelles">Chanterelles</NavLink></li>
        </ul>
      </nav>
    )
}

export default MainNav;