import React from "react";

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
          <i class="fab fa-github fa-9x"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/jessejfernandez/"
        >
          <i class="fab fa-linkedin-in fa-9x"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://wellfound.com/u/jesse-fernandez-3"
        >
          <i class="fab fa-angellist fa-9x"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
