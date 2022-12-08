import { GraphQLClient } from "graphql-request";

const requestHeaders = {
  authorization: `Bearer ${process.env.GRAPHQL_AUTH_TOKEN}`,
};

const graphqlRequestClient = new GraphQLClient(
  process.env.GRAPHQL_ENDPOINT as string,
  {
    headers: requestHeaders,
  }
);

export default graphqlRequestClient;
