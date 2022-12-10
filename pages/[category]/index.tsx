import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import { queryClient } from "../_app";
import { dehydrate } from "@tanstack/react-query";
import graphqlRequestClient from "../../gql/graphqlRequestClient";
import {
  gql_query_productsInCategory,
  gql_query_singleCategory,
} from "../../gql/queries";

import Error from "../../components/Error";
import { name } from "../../components/info";

export default function index({
  pageProps,
}: {
  pageProps: { mutations: Array<any>; queries: Array<any> };
}) {
  // console.log(pageProps);
  const router = useRouter();
  var category: string = String(router.query.category).replaceAll("-", "_");
  console.log(pageProps);
  function dataFromKeys(keys: Array<string>) {
    for (let i: number = 0; i < pageProps.queries.length; i++) {
      if (pageProps.queries[i].queryKey.length == keys.length) {
        if (pageProps.queries[i].queryHash == JSON.stringify(keys)) {
          return pageProps.queries[i].state.data;
        }
      }
    }
    return;
  }

  interface productsCollection {
    title: string;
    picturesCollection: {
      items: Array<{ url: string }>;
    };
  }
  var selfItems: Array<{
    title: string;
    description: string;
    picture: { url: string };
  }> = dataFromKeys([category.toLowerCase(), "self"]).categoriesCollection
    .items;
  var productItems: Array<productsCollection> = dataFromKeys([
    category.toLowerCase(),
    "products",
  ]).productsCollection.items;
  if (selfItems.length == 0 || productItems.length == 0) {
    return <Error />;
  }
  return (
    <section id="category-page">
      <Head>
        <title>{name + " | Shop " + selfItems[0].title}</title>
        <meta
          name="description"
          content={
            name + " | " + selfItems[0].title + " | " + selfItems[0].description
          }
        />
      </Head>
      <main>
        <div className="stuff-container">
          <h1>{selfItems[0].title}</h1>
          <p>{selfItems[0].description}</p>
        </div>
        <div className="img-container">
          <Image
            src={selfItems[0].picture.url}
            alt={
              name +
              " | " +
              selfItems[0].title +
              " | " +
              selfItems[0].description
            }
            fill
            sizes="100%"
            priority
          />
        </div>
      </main>
      <div className="products-container">
        {productItems.map((product, index) => {
          return (
            <Link
              className="product"
              key={index}
              href={
                "/" +
                category.toLowerCase() +
                "/" +
                product.title.toLowerCase().trim().replaceAll(" ", "-")
              }
            >
              <div className="img-container">
                <Image
                  src={product.picturesCollection.items[0].url}
                  alt={name + " | " + product.title}
                  fill
                  sizes="100%"
                />
              </div>
              <h2>{product.title}</h2>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  const categoryName = resolvedUrl
    .replaceAll("/", "")
    .replaceAll("-", " ")
    .toLowerCase();
  //about category
  async function getCategory() {
    return await graphqlRequestClient.request(gql_query_singleCategory, {
      categoryTitle: categoryName,
    });
  }
  await queryClient.prefetchQuery(
    [categoryName.replaceAll(" ", "_"), "self"],
    getCategory
  );
  //all products in category
  async function getAllProducts() {
    return await graphqlRequestClient.request(gql_query_productsInCategory, {
      categoryTitle: categoryName,
    });
  }
  await queryClient.prefetchQuery(
    [categoryName.replaceAll(" ", "_"), "products"],
    getAllProducts
  );

  return {
    props: {
      pageProps: dehydrate(queryClient),
    },
  };
};
