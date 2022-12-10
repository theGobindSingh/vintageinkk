import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

import Error from "../../../components/Error";

import { dehydrate } from "@tanstack/react-query";
import { queryClient } from "../../_app";
import graphqlRequestClient from "../../../gql/graphqlRequestClient";
import { gql_query_singleProduct } from "../../../gql/queries";
import { name } from "../../../components/info";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function index({ pageProps }: { pageProps: any }) {
  // console.log(pageProps);
  const { query } = useRouter();

  interface productsCollection {
    title: string;
    description: { json: any };
    instagramLink: string;
    picturesCollection: {
      items: { url: string }[];
    };
    category: { title: string };
  }
  function itemFromKeys(keys: string[]): productsCollection | undefined {
    for (let i: number = 0; i < pageProps.queries.length; i++) {
      if (pageProps.queries[i].queryKey.length == keys.length) {
        if (String(pageProps.queries[i].queryHash) == JSON.stringify(keys)) {
          if (
            pageProps.queries[i].state.data.productsCollection.items.length == 0
          ) {
            return undefined;
          } else {
            return pageProps.queries[i].state.data.productsCollection.items[0];
          }
        }
      }
    }
    return undefined;
  }
  var allContent = itemFromKeys([
    String(query.category).replaceAll("-", "_"),
    "products",
    String(query.product).replaceAll("-", "_"),
  ]);
  // console.log(allContent);
  if (allContent == undefined) {
    return <Error />;
  }
  return (
    <section id="product-page">
      <Head>
        <title>
          {name +
            " | Shop | " +
            allContent.category.title +
            " | " +
            allContent.title}
        </title>
        <meta
          name="description"
          content={
            name +
            " | Shop our " +
            allContent.title +
            " | " +
            allContent.category.title
          }
        />
      </Head>
      <div className="gallery-container">
        {allContent.picturesCollection.items.map((picture, index) => {
          return (
            <div className="img-container" key={index}>
              <Image
                src={picture.url}
                alt={`${name} | Shop ${allContent?.category.title} Products | ${allContent?.title}`}
                fill
                sizes="100%"
              />
            </div>
          );
        })}
      </div>
      <main className="product-container">
        <h1>{allContent.title}</h1>
        <a
          href={allContent.instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="shop-instagram-link"
        >
          Shop {allContent.title} now
        </a>
        {documentToReactComponents(allContent.description.json)}
      </main>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  var category: string = String(query.category).replaceAll("-", " ");
  var product: string = String(query.product).replaceAll("-", " ");

  //get product
  async function getProduct() {
    return await graphqlRequestClient.request(gql_query_singleProduct, {
      categoryTitle: category,
      productTitle: product,
    });
  }
  await queryClient.prefetchQuery(
    [category.replaceAll(" ", "_"), "products", product.replaceAll(" ", "_")],
    getProduct
  );

  return {
    props: { pageProps: dehydrate(queryClient) },
  };
};
