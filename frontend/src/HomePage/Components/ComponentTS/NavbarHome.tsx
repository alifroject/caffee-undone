import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { NavLink, useNavigate } from "react-router-dom";
import coffee from "../imagesCaffee/coffeeLogo.png"


import "../ComponenCss/NavbarHome.css"; // Importing the CSS file

Modal.setAppElement('#root'); // Ensure accessibility for screen readers

const NavbarHome: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 798) {
        setIsModalOpen(false); // Close modal if window width is more than 798px
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle toggle button click
  const handleToggleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <NavLink to={"/"}>
          <img src={coffee} alt="" style={{width: '200px'}}/>
          </NavLink>
        </div>
        {/* Display toggle button on screens less than 798px */}
        {windowWidth < 798 && (
          <button
            className={`toggle-button ${isModalOpen ? 'open' : ''}`}
            onClick={handleToggleClick}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        )}

        {/* Nav links visible only on larger screens */}
        <ul className="nav-links">
          <li className="dropdown"><NavLink to={"./login"}>Order</NavLink>
              <ul className="dropdown-menu-order">
                <li><NavLink to={"./login"}>Coffee</NavLink></li>
                <li><NavLink to={"./login"}>Meal</NavLink></li>
                <li><NavLink to={"./login"}>Beverage</NavLink></li>
                <li><NavLink to={"./login"}>Pastry</NavLink></li>
              </ul></li>
          <li><NavLink to={"/career"}>Career</NavLink></li>
          <li className="dropdown">
              <a href="#home" className="dropdown-toggle">About</a>
              <ul className="dropdown-menu">
                <li><NavLink to="/about/team">Our Team</NavLink></li>
                <li><NavLink to="/about/company">Company</NavLink></li>
                <li><NavLink to="/about/vision">Vision</NavLink></li>
              </ul>
            </li>
          <li><a href="#contact">Info</a></li>
        </ul>
        <div className="nav-buttons">
          
          <a href="#signup" className="btn btn-primary">Join Us</a>
        </div>
      </nav>

      {/* Modal, which acts as menu on screens less than 798px */}
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)} 
        style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            
            content: {
              top: '16%',
              left: '50%',
              transform: 'translate(-50%, 0)',
              width: '100%',
              height: '100%',
              padding: '20px',
              textAlign: 'center',
              zIndex: '10999',
            },
          }}
         
      >
        {/* Modal content */}
        <ul className="modal-nav-links">
          <li><NavLink to={"/menu"}>Order ➡</NavLink></li>
          <li><a href="#about">Career ➡</a></li>
          <li><a href="#home">About ➡</a></li>
          <li><a href="#contact">Info ➡</a></li>
        </ul>
       
      </Modal>
    </>
  );
};

export default NavbarHome;
