import React from "react";
import Link from "next/link";
import {
  email,
  whatsapp,
  phone,
  instagram,
  footerQuote,
  footerQuoteWriter,
} from "./info";

const IndianFlagSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 225 150"
    >
      <rect width="225" height="150" fill="#f93" />
      <rect width="225" height="50" y="50" fill="#fff" />
      <rect width="225" height="50" y="100" fill="#128807" />
      <g transform="translate(112.5,75)">
        <circle r="20" fill="#008" />
        <circle r="17.5" fill="#fff" />
        <circle r="3.5" fill="#008" />
        <g id="d">
          <g id="c">
            <g id="b">
              <g id="a">
                <circle
                  r="0.875"
                  fill="#008"
                  transform="rotate(7.5) translate(17.5)"
                />
                <path
                  fill="#008"
                  d="M 0,17.5 0.6,7 C 0.6,7 0,2 0,2 0,2 -0.6,7 -0.6,7 L 0,17.5 z"
                />
              </g>
              <use xlinkHref="#a" transform="rotate(15)" />
            </g>
            <use xlinkHref="#b" transform="rotate(30)" />
          </g>
          <use xlinkHref="#c" transform="rotate(60)" />
        </g>
        <use xlinkHref="#d" transform="rotate(120)" />
        <use xlinkHref="#d" transform="rotate(-120)" />
      </g>
    </svg>
  );
};

export default function Footer() {
  return (
    <footer id="mainFooter">
      <div className="upper-container">
        <div className="Connect">
          <span>Connect</span>
          <a href={`mailto:${email}`}>email me</a>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone}`}>call me</a>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
        <div className="Vintageinkk">
          <span>Vintageinkk</span>
          <Link href="/about">the origin story</Link>
        </div>
        <div className="social">
          <span>Social</span>
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{instagram}
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Whatsapp
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {whatsapp}
          </a>
        </div>
        <div className="quote">
          {footerQuote.split("\n").map((line, index) => {
            return <p key={index}>{line}</p>;
          })}
          <span>{` - ${footerQuoteWriter}`}</span>
        </div>
      </div>
      <a
        className="lower-container"
        href="https://portfolio-gobindsingh.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          Built with <span className="black heart">🖤</span>
          <span className="red heart">❤️</span> from
        </span>
        <IndianFlagSVG />
        <span>by Gobind Singh</span>
      </a>
    </footer>
  );
}
