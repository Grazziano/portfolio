import React from 'react';
import './style.css';

export default function Footer() {
  return (
    <div className="container">
      <ul className="unorderList">
        <li className="line">
          <a className="link" href="#">
            Twitter
          </a>
        </li>
        <li className="line">
          <a className="link" href="#">
            Codepen
          </a>
        </li>
        <li className="line">
          <a className="link" href="#">
            Email
          </a>
        </li>
        <li className="line">
          <a className="link" href="#">
            Dribbble
          </a>
        </li>
        <li className="line">
          <a className="link" href="#">
            Github
          </a>
        </li>
        <li className="line">
          <p>👋</p>
        </li>
      </ul>
    </div>
  );
}
