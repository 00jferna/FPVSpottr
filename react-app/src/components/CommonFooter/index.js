import React from "react";
import Darkmode from "../darkmode";


function Footer() {
  return (
    <div className="footer">
      <div className="about__me">
        <h4>Delevoped by:</h4>
        <h4>Jesse Fernandez</h4>
      </div>
      <div className="about__links">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/00jferna"
        >
          <i className="fab fa-github fa-9x"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/jessejfernandez/"
        >
          <i className="fab fa-linkedin-in fa-9x"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wellfound.com/u/jesse-fernandez-3"
        >
          <i className="fab fa-angellist fa-9x"></i>
        </a>
      </div>
      <Darkmode />
    </div>
  );
}

export default Footer;
