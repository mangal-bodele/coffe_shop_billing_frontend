import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-4 ">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              Welcome to our coffee shop! We serve the finest coffee blends and delicious snacks. Visit us to enjoy a perfect cup of coffee and cozy ambiance.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-decoration-none text-light">
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-decoration-none text-light">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-decoration-none text-light">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                >
                  {/* Facebook Icon */}
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                >
                  {/* Instagram Icon */}
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                >
                  {/* X Icon */}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <p className="mb-0">&copy; {new Date().getFullYear()} Coffee Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
