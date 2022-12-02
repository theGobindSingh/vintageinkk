import Link from "next/link";
import Image from "next/image";
import React, { useState, PropsWithChildren } from "react";

import { BsInstagram, BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { whatsapp, instagram, email, name, tagLine, owner } from "./info";

interface navProps {
  navHidden: boolean;
  imgSrc: string;
}
function NavContainer({
  children,
  navHidden,
  imgSrc,
}: PropsWithChildren<navProps>) {
  return (
    <div
      className="nav-container"
      aria-hidden={navHidden == true ? "true" : "false"}
    >
      <nav>{children}</nav>
      <div className="img-container">
        <Image
          src={imgSrc}
          alt={`${name} | ${owner} | ${tagLine}`}
          className="img-biz"
          fill={true}
        />
      </div>
    </div>
  );
}

export default function Header() {
  interface imageHiddenProps {
    navShop: boolean;
    navAbout: boolean;
  }
  const [navHidden, setNavHidden] = useState<imageHiddenProps>({
    navShop: true,
    navAbout: true,
  });
  return (
    <header id="mainHeader">
      <div className="left-btns">
        <button
          type="button"
          onMouseEnter={() => {
            setNavHidden({ navAbout: true, navShop: false });
          }}
          onFocus={() => {
            setNavHidden({ navAbout: true, navShop: false });
          }}
          onBlur={() => {
            setNavHidden({ navAbout: true, navShop: true });
          }}
          onMouseLeave={() => {
            setNavHidden({ navAbout: true, navShop: true });
          }}
        >
          Shop
        </button>
        <button
          type="button"
          onMouseEnter={() => {
            setNavHidden({ navShop: true, navAbout: false });
          }}
          onFocus={() => {
            setNavHidden({ navShop: true, navAbout: false });
          }}
          onBlur={() => {
            setNavHidden({ navShop: true, navAbout: true });
          }}
          onMouseLeave={() => {
            setNavHidden({ navShop: true, navAbout: true });
          }}
        >
          About
        </button>
      </div>
      <Link className="logo-container" href="/">
        <h1>
          <span>{name}</span> <span>{tagLine}</span>
        </h1>
      </Link>
      <div className="icon-links">
        <a
          href={`http://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsInstagram />
        </a>
        <a
          href={`http://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsWhatsapp />
        </a>
        <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
          <BsEnvelope />
        </a>
      </div>
      <NavContainer
        imgSrc="/assets/images/DP.jpg"
        navHidden={navHidden.navShop}
      >
        <div>
          <span className="nav-head">Categories</span>
          <Link href="/decor">Décor</Link>
          <Link href="/hampers">Hampers</Link>
          <Link href="/manzar">Manzar</Link>
          <Link href="/soy-candles">Soy Candles</Link>
          <Link href="/vintage-collection">Vintage Collection</Link>
        </div>
        <div>
          <span className="nav-head">Manzar Products</span>
          <Link href="/manzar/birthday-post-cards">Birthday Post Cards</Link>
          <Link href="/manzar/typewritten-letters">
            Typewritten letters / poems
          </Link>
          <Link href="/manzar/vintage-mini-album">Vintage mini album</Link>
          <Link href="/manzar/wedding-invites">Wedding invites / tags</Link>
        </div>
      </NavContainer>
      <NavContainer
        imgSrc="/assets/images/adeeba.jpg"
        navHidden={navHidden.navAbout}
      >
        <div>
          <span className="nav-head">Everything vintage</span>
          <Link href="/about">Origin story</Link>
        </div>
      </NavContainer>
    </header>
  );
}