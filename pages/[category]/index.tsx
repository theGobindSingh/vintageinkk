import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import { queryClient } from "../../clients";
import { dehydrate } from "@tanstack/react-query";
import graphqlRequestClient from "../../gql/graphqlRequestClient";
import { gql_query_productsInCategory, gql_query_singleCategory } from "../../gql/queries";

import Error from "../../components/Error";
import { name } from "../../components/info";
import { getAllCategories } from "../../apis";
import { getDataFromQueryCache } from "../../utils";

interface productsCollection {
  title: string;
  picturesCollection: {
    items: Array<{ url: string }>;
  };
}
export default function CategoryPage() {
  // console.log(pageProps);
  const router = useRouter();
  const pageName = router.query.category as string;
  const productDataFromApi = getDataFromQueryCache([pageName, "products"]);
  const selfDataFromApi = getDataFromQueryCache([pageName, "self"]);
  const selfDataItems = selfDataFromApi?.categoriesCollection?.items ?? [];
  let selfData: {
    title: string;
    description: string;
    picture: { url: string };
  } = {
    title: "Loading...",
    description: "Loading...",
    picture: { url: "" }
  };
  if (selfDataItems.length > 0) {
    selfData = {
      title: selfDataItems[0].title,
      description: selfDataItems[0].description,
      picture: selfDataItems[0].picture
    };
  }
  const productsCollection: productsCollection[] = productDataFromApi?.productsCollection?.items ?? [];
  // return <></>;
  if (selfDataItems.length == 0 || productsCollection.length == 0) {
    return <Error />;
  }

  return (
    <section id="category-page">
      <Head>
        <title>{name + " | Shop " + selfData.title}</title>
        <meta name="description" content={name + " | " + selfData.title + " | " + selfData.description} />
      </Head>
      <main>
        <div className="stuff-container">
          <h1>{selfData.title}</h1>
          <p>{selfData.description}</p>
        </div>
        <div className="img-container">
          <Image
            src={selfData.picture.url}
            alt={name + " | " + selfData.title + " | " + selfData.description}
            fill
            sizes="100%"
            priority
          />
        </div>
      </main>
      <div className="products-container">
        {productsCollection.map((product, index) => {
          return (
            <Link
              className="product"
              key={index}
              href={"/" + pageName + "/" + product.title.toLowerCase().trim().replaceAll(" ", "-")}
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const categoryName = category.replace(/-/gm, " ").toLowerCase();
  //about category
  async function getCategory() {
    return await graphqlRequestClient.request(gql_query_singleCategory, {
      categoryTitle: categoryName
    });
  }
  await queryClient.prefetchQuery([categoryName.replaceAll(" ", "-"), "self"], getCategory);
  //all products in category
  async function getAllProducts() {
    return await graphqlRequestClient.request(gql_query_productsInCategory, {
      categoryTitle: categoryName
    });
  }
  await queryClient.prefetchQuery([categoryName.replaceAll(" ", "-"), "products"], getAllProducts);
  const dehydrated = dehydrate(queryClient);
  return {
    props: {
      dehydratedState: dehydrated
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const rawData = await getAllCategories();
  const paths: { params: { category: string } }[] = [];
  if (rawData) {
    const items = rawData?.categoriesCollection?.items ?? [];
    const titles: string[] = items.map((item: any) => item?.title?.toLowerCase().replace(/\s/gm, "-"));
    for (const title of titles) {
      paths.push({ params: { category: title } });
    }
  }
  return {
    paths: paths,
    fallback: false
  };
};
