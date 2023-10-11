import React, { useState } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Slider from "react-slick";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { bizDesc, moreHeading, morePara, name } from "../components/info";

import { dehydrate } from "@tanstack/react-query";
import { queryClient } from "../clients";
import { getAllCategories, getCustomerReviews, getHomeBanner } from "../apis";
import useAllCategories from "../hooks/use-all-categories";
import { getDataFromQueryCache } from "../utils";

function CategoryCard({ text, imgURL, link }: { text: string; imgURL: string; link: string }) {
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
  const [categories] = useAllCategories();
  const customerReviewsData: any = getDataFromQueryCache(["customerReviews"]);
  const homeBannerData: any = getDataFromQueryCache(["homeBanner"]);
  const customerReviews: any[] = customerReviewsData?.customerReviewsCollection?.items ?? [];

  const homeBannerItems: { url: string; title: string; description: string }[] =
    homeBannerData?.assetCollection?.items ?? [];
  let homeBannerUrl = "";
  let homeBannerDescription = "";
  let homeBannerTitle = "";
  if (homeBannerItems.length > 0) {
    homeBannerUrl = homeBannerItems[0]?.url ?? "";
    homeBannerDescription = homeBannerItems[0]?.description ?? "";
    homeBannerTitle = homeBannerItems[0]?.title ?? "";
  }

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
            src={homeBannerUrl}
            fill
            sizes="100%"
            alt={name + " | " + homeBannerDescription.split("\n")[2].replace("button: ", "") + " | " + bizDesc}
          />
          <span>{homeBannerDescription.split("\n")[1].replace("tagline:", "").trim()}</span>
          <Link href={homeBannerDescription.split("\n")[0].replace("link:", "").trim()}>
            {homeBannerDescription.split("\n")[2].replace("button:", "").trim()}
          </Link>
        </div>
        <div className="category-cards">
          {categories.map((category: any, index: any) => {
            return (
              <CategoryCard
                imgURL={category?.picture?.url}
                link={"/" + category?.title.toLowerCase().replace(" ", "-")}
                text={"Shop " + category?.title}
                key={index}
              />
            );
          })}
        </div>
        <div className="customer-reviews">
          <Slider
            className="carousal-container"
            dots={false}
            infinite
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            autoplay={true}
            pauseOnHover
            pauseOnFocus
            lazyLoad="ondemand"
            focusOnSelect={false}
            ref={(ref: any) => setSliderNav(ref)}
          >
            {customerReviews.map((customer, index) => {
              return (
                <div className="slide-container" key={index}>
                  <div className="stuff-container">
                    <h2>From our guests</h2>
                    <p>{customer.review.json.content[0].content[0].value}</p>
                    <p>{"~ " + customer.customerName}</p>
                    <Link
                      href={
                        "/" +
                        customer.product.category.title.toLowerCase().replace(" ", "-") +
                        "/" +
                        customer.product.title.toLowerCase().replace(" ", "-")
                      }
                    >
                      {"Shop " + customer.product.title}
                    </Link>
                  </div>
                  <div className="img-container">
                    <Image
                      src={customer.product.picturesCollection.items[0].url}
                      alt="Product from Vintageinkk"
                      fill
                      sizes="100%"
                    />
                  </div>
                </div>
              );
            })}
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

export const getStaticProps: GetStaticProps = async () => {
  await queryClient.prefetchQuery(["allCategories"], getAllCategories);
  await queryClient.prefetchQuery(["customerReviews"], getCustomerReviews);
  await queryClient.prefetchQuery(["homeBanner"], getHomeBanner);
  const dehydrated = dehydrate(queryClient);
  return {
    props: {
      dehydratedState: dehydrated
    }
  };
};
