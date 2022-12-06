import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import {
  bannerBtnText,
  bannerImg,
  bannerText,
  bannerUrl,
  bizDesc,
  moreHeading,
  morePara,
  name,
} from "../components/info";

function CategoryCard({
  text,
  imgURL,
  link,
}: {
  text: string;
  imgURL: string;
  link: string;
}) {
  return (
    <Link className="category-card" href={link}>
      <div className="img-container">
        <Image src={imgURL} alt={`${text} | ${name}`} fill sizes="100%" />
      </div>
      <span>{text}</span>
    </Link>
  );
}

export default function Home() {
  const [sliderNav, setSliderNav] = useState<any>();
  return (
    <section aria-label="Home" id="Home">
      <Head>
        <title>{name + " | Home"}</title>
        <meta name="description" content={bizDesc} />
      </Head>
      <>
        <h1 style={{ visibility: "hidden", height: "0", width: "0" }}>
          {name}
          <br />
          {bizDesc}
        </h1>
        <div className="home-banner img-container">
          <Image
            priority
            src={bannerImg}
            fill
            sizes="100%"
            alt={name + " | " + bannerBtnText + " | " + bizDesc}
          />
          <span>{bannerText}</span>
          <Link href={bannerUrl}>{bannerBtnText}</Link>
        </div>
        <div className="category-cards">
          <CategoryCard
            imgURL="/assets/images/sample1.jpg"
            link="/decor"
            text="Shop Decor"
          />
          <CategoryCard
            imgURL="/assets/images/sample1.jpg"
            link="/hampers"
            text="Shop Hampers"
          />
          <CategoryCard
            imgURL="/assets/images/sample1.jpg"
            link="/manzar"
            text="Shop Manzar"
          />
          <CategoryCard
            imgURL="/assets/images/sample1.jpg"
            link="soy-candles"
            text="Shop Soy Candles"
          />
          <CategoryCard
            imgURL="/assets/images/sample1.jpg"
            link="vintage-collection"
            text="Shop Vintage Collection"
          />
        </div>
        <div className="customer-reviews">
          <Slider
            className="carousal-container"
            dots={false}
            infinite
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            autoplay
            pauseOnHover
            pauseOnFocus
            lazyLoad="ondemand"
            ref={(ref: any) => setSliderNav(ref)}
          >
            <div className="slide-container">
              <div className="stuff-container">
                <h2>From our guests</h2>
                <p>
                  {
                    "Review here the stars twinkle beautifully in the light and add whimsy to any stack <3"
                  }
                </p>
                <p>{"Customer name"}</p>
                <Link href={"/"}>Shop this</Link>
              </div>
              <div className="img-container">
                <Image
                  src={"/assets/images/sample2.jpg"}
                  alt="Product from Vintageinkk"
                  fill
                  sizes="100%"
                />
              </div>
            </div>
            <div className="slide-container">
              <div className="stuff-container">
                <h2>From our guests</h2>
                <p>
                  {
                    "Review here the stars twinkle beautifully in the light and add whimsy to any stack <3"
                  }
                </p>
                <p>{"Customer name"}</p>
                <Link href={"/"}>Shop this</Link>
              </div>
              <div className="img-container">
                <Image
                  src={"/assets/images/sample2.jpg"}
                  alt="Product from Vintageinkk"
                  fill
                  sizes="100%"
                />
              </div>
            </div>
            <div className="slide-container">
              <div className="stuff-container">
                <h2>From our guests</h2>
                <p>
                  {
                    "Review here the stars twinkle beautifully in the light and add whimsy to any stack <3"
                  }
                </p>
                <p>{"Customer name"}</p>
                <Link href={"/"}>Shop this</Link>
              </div>
              <div className="img-container">
                <Image
                  src={"/assets/images/sample2.jpg"}
                  alt="Product from Vintageinkk"
                  fill
                  sizes="100%"
                />
              </div>
            </div>
          </Slider>
          <div className="btns-container">
            <button
              type="button"
              onClick={() => {
                sliderNav?.slickPrev();
              }}
            >
              <BsCaretLeftFill />
            </button>
            <button
              type="button"
              onClick={() => {
                sliderNav?.slickNext();
              }}
            >
              <BsCaretRightFill />
            </button>
          </div>
        </div>
        <div className="more-info">
          <h2>{moreHeading}</h2>
          <p>{morePara}</p>
          <Link href="/about">Read more</Link>
        </div>
      </>
    </section>
  );
}
