import React from 'react';
import { Link } from 'react-router-dom';
import './../index.css'

const NavigationBar = () => {
  return (
    <div className='NavigationBar'>
      <ul className= 'a'>
        <li>
          <Link to="/home:id">Home</Link>
        </li>
        <li>
          <Link to="/home/:id/newrecipe">Create Recipe</Link>
        </li>
        <li>
          <Link to="/home/:id/myrecipe">My Recipe</Link>
        </li>
        <li>
          <Link to="/home/:id/favourites">Favourites</Link>
        </li>
        <li>
          <Link to="/home/:id/report">Report</Link>
        </li>
        <li>
        <Link to="/home/:id/feedback">Feedback</Link>
        </li>
        <li>
        <Link to="/">Logout</Link>
        </li>
        

      </ul>
    </div>
  );
};

export default NavigationBar;
