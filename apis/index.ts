import axios from "axios";
import graphqlRequestClient from "../gql/graphqlRequestClient";
import {
  gql_query_allCategories,
  gql_query_customerReviews,
  gql_query_getAllProducts,
  gql_query_homeBanner,
  gql_query_singleProduct
} from "../gql/queries";

export async function getAllCategories() {
  return await graphqlRequestClient.request<any>(gql_query_allCategories);
}
export async function getAllProducts() {
  return await graphqlRequestClient.request<any>(gql_query_getAllProducts);
}
export async function getCustomerReviews() {
  return await graphqlRequestClient.request(gql_query_customerReviews);
}
export async function getHomeBanner() {
  return await graphqlRequestClient.request(gql_query_homeBanner);
}
export async function getOwnAllCategories() {
  const res = await axios.get("/api/get-categories");
  return res.data;
}
export function getSingleProduct(category: string, product: string) {
  const data = graphqlRequestClient.request(gql_query_singleProduct, {
    categoryTitle: category.replace(/-/gm, " "),
    productTitle: product.replace(/-/gm, " ")
  });
  const fn = async () => await data;
  return fn;
}
