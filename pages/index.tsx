import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Slider from "react-slick";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { bizDesc, moreHeading, morePara, name } from "../components/info";

import {
  gql_query_allCategories,
  gql_query_customerReviews,
  gql_query_homeBanner,
} from "../gql/queries";
import { dehydrate } from "@tanstack/react-query";
import graphqlRequestClient from "../gql/graphqlRequestClient";
import { queryClient } from "../pages/_app";

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

export default function Home({
  pageProps,
}: {
  pageProps: { mutations: Array<any>; queries: Array<any> };
}) {
  // console.log(pageProps);
  function getDataFromQueryKey(key: string): {
    total?: number;
    skip?: number;
    limit?: number;
    items: Array<any>;
  } {
    var index: number = 0;
    for (let i: number = 0; i < pageProps.queries.length; i++) {
      if (key == pageProps.queries[i].queryKey[0]) {
        index = i;
        break;
      }
    }
    var temp: any = Object.values(pageProps.queries[index].state.data)[0];
    return temp;
  }
  const [sliderNav, setSliderNav] = useState<any>();
  // console.log(pageProps);
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
            src={getDataFromQueryKey("homeBanner")?.items[0]?.url}
            fill
            sizes="100%"
            alt={
              name +
              " | " +
              getDataFromQueryKey("homeBanner")
                ?.items[0]?.description.split("\n")[2]
                .replace("button: ", "") +
              " | " +
              bizDesc
            }
          />
          <span>
            {getDataFromQueryKey("homeBanner")
              ?.items[0]?.description.split("\n")[1]
              .replace("tagline:", "")
              .trim()}
          </span>
          <Link
            href={getDataFromQueryKey("homeBanner")
              ?.items[0]?.description.split("\n")[0]
              .replace("link:", "")
              .trim()}
          >
            {getDataFromQueryKey("homeBanner")
              ?.items[0]?.description.split("\n")[2]
              .replace("button:", "")
              .trim()}
          </Link>
        </div>
        <div className="category-cards">
          {getDataFromQueryKey("allCategories")?.items?.map(
            (category: any, index: any) => {
              return (
                <CategoryCard
                  imgURL={category?.picture?.url}
                  link={"/" + category?.title.toLowerCase().replace(" ", "-")}
                  text={"Shop " + category?.title}
                  key={index}
                />
              );
            }
          )}
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
            {getDataFromQueryKey("customerReviews")?.items.map(
              (customer, index) => {
                // console.log(customer, "yaya");
                return (
                  <div className="slide-container" key={index}>
                    <div className="stuff-container">
                      <h2>From our guests</h2>
                      <p>{customer.review.json.content[0].content[0].value}</p>
                      <p>{"~ " + customer.customerName}</p>
                      <Link
                        href={
                          "/" +
                          customer.product.category.title
                            .toLowerCase()
                            .replace(" ", "-") +
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
              }
            )}
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

export const getServerSideProps: GetServerSideProps = async () => {
  //all categories
  async function getAllCategories() {
    return await graphqlRequestClient.request(gql_query_allCategories);
  }
  await queryClient.prefetchQuery(["allCategories"], getAllCategories);

  // customer reviews
  async function getCustomerReviews() {
    return await graphqlRequestClient.request(gql_query_customerReviews);
  }
  await queryClient.prefetchQuery(["customerReviews"], getCustomerReviews);

  //homebanner
  async function getHomeBanner() {
    return await graphqlRequestClient.request(gql_query_homeBanner);
  }
  await queryClient.prefetchQuery(["homeBanner"], getHomeBanner);

  return {
    props: {
      pageProps: dehydrate(queryClient),
    },
  };
};
