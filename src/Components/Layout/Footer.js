import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              Welcome to our coffee shop! We serve the finest coffee blends and delicious snacks.
              Visit us to enjoy a perfect cup of coffee and cozy ambiance.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/menu" className="text-light text-decoration-none">Menu</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light">
                  <i className="bi bi-facebook"></i> Facebook
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
                  <i className="bi bi-instagram"></i> Instagram
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light">
                  <i className="bi bi-twitter"></i> Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <p className="mb-0 ">
          &copy; {new Date().getFullYear()} Coffee Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
