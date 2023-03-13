import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaRegSun } from 'react-icons/fa';
// import { BsMicFill } from 'react-icons/fa';
import '../styles/Header.css';

function Header() {
  return (
    <div className="nav-links">
      <ul>
        <Link to="/"><FaChevronLeft /></Link>
        <Link to="/details">Details</Link>
        <Link to="/"><FaRegSun /></Link>

        {/* <BsMicFill /> */}

      </ul>
    </div>

  );
}
export default Header;
