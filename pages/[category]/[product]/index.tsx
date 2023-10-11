import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

import Error from "../../../components/Error";

import { dehydrate } from "@tanstack/react-query";
import { queryClient } from "../../../clients";
import graphqlRequestClient from "../../../gql/graphqlRequestClient";
import { gql_query_singleProduct } from "../../../gql/queries";
import { name } from "../../../components/info";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getDataFromQueryCache } from "../../../utils";
import { getAllProducts, getSingleProduct } from "../../../apis";

interface ProductsCollection {
  title: string;
  description: { json: any };
  instagramLink: string;
  picturesCollection: {
    items: { url: string }[];
  };
  category: { title: string };
}
export default function AboutPage() {
  const { query } = useRouter();
  const data = getDataFromQueryCache([query?.category, "products", query?.product]);
  const itemsData: ProductsCollection[] = data?.productsCollection?.items ?? [];
  if (itemsData?.length === 0) {
    return <Error />;
  }
  const product = itemsData[0];
  return (
    <section id="product-page">
      <Head>
        <title>{name + " | Shop | " + product.category.title + " | " + product.title}</title>
        <meta name="description" content={name + " | Shop our " + product.title + " | " + product.category.title} />
      </Head>
      <div className="gallery-container">
        {product.picturesCollection.items.map((picture, index) => {
          return (
            <div className="img-container" key={index}>
              <Image
                src={picture.url}
                alt={`${name} | Shop ${product?.category.title} Products | ${product?.title}`}
                fill
                sizes="100%"
              />
            </div>
          );
        })}
      </div>
      <main className="product-container">
        <h1>{product.title}</h1>
        <a href={product.instagramLink} target="_blank" rel="noopener noreferrer" className="shop-instagram-link">
          Shop {product.title} now
        </a>
        {documentToReactComponents(product.description.json)}
      </main>
    </section>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const product = params?.product as string;

  const a = await queryClient.prefetchQuery([category, "products", product], getSingleProduct(category, product));
  return {
    props: { dehydratedState: dehydrate(queryClient) }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: {
    params: {
      category: string;
      product: string;
    };
  }[] = [];
  const rawData = await getAllProducts();
  const rawItems = rawData?.productsCollection?.items ?? [];
  for (const item of rawItems) {
    paths.push({
      params: {
        category: ((item?.category?.title as string) ?? "").replace(/\s/gm, "-").toLowerCase(),
        product: ((item?.title as string) ?? "").replace(/\s/gm, "-").toLowerCase()
      }
    });
  }
  return {
    paths: paths,
    fallback: false
  };
};
