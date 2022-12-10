import { gql } from "graphql-request";

export const gql_query_allCategories = gql`
  query {
    categoriesCollection(limit: 6, order: title_ASC) {
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
          picturesCollection(limit: 1) {
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

export const gql_query_singleCategory = gql`
  query ($categoryTitle: String!) {
    categoriesCollection(where: { title_contains: $categoryTitle }, limit: 1) {
      items {
        title
        picture {
          url
        }
        description
      }
    }
  }
`;

export const gql_query_productsInCategory = gql`
  query ($categoryTitle: String!) {
    productsCollection(
      where: { category: { title_contains: $categoryTitle } }
      limit: 100
    ) {
      items {
        title
        picturesCollection(limit: 1) {
          items {
            url
          }
        }
      }
    }
  }
`;
