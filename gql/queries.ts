import { gql } from "graphql-request";

export const gql_query_allCategories = gql`
  query {
    categoriesCollection(limit: 6) {
      items {
        title
        picture {
          url
        }
      }
    }
  }
`;

export const gql_query_customerReviews = gql`
  query {
    customerReviewsCollection(limit: 10) {
      items {
        customerName
        review {
          json
        }
        product {
          title
          category {
            title
          }
          pictureCollection(limit: 1) {
            items {
              url
            }
          }
        }
      }
    }
  }
`;

export const gql_query_homeBanner = gql`
  query {
    assetCollection(where: { title: "home-banner" }, limit: 1) {
      items {
        url
        title
        description
      }
    }
  }
`;
