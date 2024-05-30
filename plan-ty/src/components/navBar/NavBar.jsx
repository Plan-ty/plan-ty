import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav"; // Import Nav from react-bootstrap
import DropDown from "./DropDown";
import "./NavBar.css";

function Navbar({ setToken }) {
  const [navActive, setNavActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's login status
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    setToken(null);
    navigate("/login");
  };

  // Toggle hamburger menu
  const toggleNav = () => {
    setNavActive(!navActive);
  };

  // Close hamburger menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setNavActive(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close hamburger menu if window size is small
  useEffect(() => {
    if (window.innerWidth <= 1200) {
      setNavActive(false);
    }
  }, []);

  // Check authentication status on component mount
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    setIsLoggedIn(!!token); // Update isLoggedIn based on token presence
  }, [setIsLoggedIn]);

  // Function to close the menu when a navbar item is clicked
  const closeMenu = () => {
    setNavActive(false);
  };

  return (
    <nav className={`navbar ${navActive ? "active" : ""}`}>
      <div className="logo">
        <span className="letter">P</span>
        <span className="letter">L</span>
        <span className="letter">A</span>
        <span className="letter">N</span>
        <span className="letter">-</span>
        <span className="letter">T</span>
        <span className="letter">Y</span>
      </div>

      <div
        data-cy="menu"
        className={`nav__hamburger ${navActive ? "active" : ""}`}
        onClick={toggleNav}
      >
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
        <span className="nav__hamburger__line"></span>
      </div>
      <div className={`navbar--items ${navActive ? "active" : ""}`}>
        <ul>
          <li>
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => {
                setNavActive(false);
              }}
              className="navbar--content"
            >
              Home
            </Nav.Link>
          </li>
          <DropDown />
          {isLoggedIn && ( // Render logout button only if user is logged in
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;