import Link from "next/link";
import Image from "next/image";
import React, { useState, PropsWithChildren } from "react";

import { BsInstagram, BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { whatsapp, instagram, email, name, tagLine, owner } from "./info";
import useAllCategories from "../hooks/use-all-categories";

interface navProps {
  navHidden: boolean;
  imgSrc: string;
}
function NavContainer({ children, navHidden, imgSrc }: PropsWithChildren<navProps>) {
  return (
    <div className="nav-container" aria-hidden={navHidden == true ? "true" : "false"}>
      <nav>{children}</nav>
      <div className="img-container">
        <Image src={imgSrc} alt={`${name} | ${owner} | ${tagLine}`} className="img-biz" fill={true} sizes="100%" />
      </div>
    </div>
  );
}

export default function Header() {
  const [categories] = useAllCategories();
  interface imageHiddenProps {
    navShop: boolean;
    navAbout: boolean;
  }
  const [navHidden, setNavHidden] = useState<imageHiddenProps>({
    navShop: true,
    navAbout: true
  });
  function mobOnClickLink() {
    try {
      document.querySelector(".side-nav-wrapper")?.classList.remove("active");
    } catch {}
    setNavHidden({ navAbout: true, navShop: true });
  }
  return (
    <>
      <header id="mainHeader-PC" className="no-mobile">
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
          <span>
            <span>{name}</span> <span>{tagLine}</span>
          </span>
        </Link>
        <div className="icon-links">
          <a href={`http://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
            <BsInstagram />
          </a>
          <a href={`http://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
            <BsWhatsapp />
          </a>
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            <BsEnvelope />
          </a>
        </div>
        <NavContainer
          imgSrc="https://images.ctfassets.net/eqnacuxu5oog/7aEatmkX15Dqzpi4MU1mzf/f58ac0b4425561d04e5d870095cc6791/cat1.webp"
          navHidden={navHidden.navShop}
        >
          <div>
            <span className="nav-head">Categories</span>
            {categories.map((category, index) => {
              return (
                <Link key={index} href={"/" + category.title.toLowerCase().replace(" ", "-")}>
                  {category.title}
                </Link>
              );
            })}
          </div>
          {/* <div>
            <span className="nav-head">{categories?.[1]?.title ?? ""} Products</span>
            <Link href="/manzar/birthday-post-cards">Birthday Post Cards</Link>
            <Link href="/manzar/typewritten-letters">Typewritten letters / poems</Link>
            <Link href="/manzar/vintage-mini-album">Vintage mini album</Link>
            <Link href="/manzar/wedding-invites">Wedding invites / tags</Link>
          </div> */}
        </NavContainer>
        <NavContainer
          imgSrc="https://images.ctfassets.net/eqnacuxu5oog/1ulKSelvki1i3XnH5tD7tq/92afddef0ca76be6d5b5b11fa9ef7243/temp4.webp"
          navHidden={navHidden.navAbout}
        >
          <div>
            <span className="nav-head">Everything vintage</span>
            <Link href="/about">Origin story</Link>
          </div>
        </NavContainer>
      </header>
      <header id="mainHeader-mobile" className="no-pc">
        <div className="side-nav-wrapper">
          <button
            onClick={(e) => {
              e.currentTarget.parentElement?.classList.remove("active");
              setNavHidden({ navAbout: true, navShop: true });
            }}
            className="close-button"
            type="button"
          >
            X
          </button>
          <button
            type="button"
            onClick={() => {
              setNavHidden((prevNavState) => {
                return {
                  ...prevNavState,
                  navShop: !prevNavState.navShop
                };
              });
            }}
          >
            <span>Categories</span>
            {navHidden.navShop ? <span>v</span> : <span>^</span>}
          </button>
          <nav className="nav-shop" aria-hidden={navHidden.navShop}>
            {categories.map((category, index) => {
              return (
                <Link key={index} href={"/" + category.title.toLowerCase().replace(" ", "-")} onClick={mobOnClickLink}>
                  {category.title}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => {
              setNavHidden((prevNavState) => {
                return {
                  ...prevNavState,
                  navAbout: !prevNavState.navAbout
                };
              });
            }}
          >
            <span>About</span>
            {navHidden.navAbout ? <span>v</span> : <span>^</span>}
          </button>
          <nav className="nav-about" aria-hidden={navHidden.navAbout}>
            <Link href="/about" onClick={mobOnClickLink}>
              Origin Story
            </Link>
          </nav>
        </div>
        <div
          className="burger"
          onClick={() => {
            document.querySelector(".side-nav-wrapper")?.classList.toggle("active");
          }}
        >
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
        </div>
        <Link className="logo-container" href="/">
          <span>
            <span>{name}</span> <span>{tagLine}</span>
          </span>
        </Link>
      </header>
    </>
  );
}
