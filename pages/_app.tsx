import "../styles/style.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, //10 mins,
      // staleTime: 1000 * 5,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, [router]);
  if (loading) {
    return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header />
          <Loading />
          <Footer />
        </Hydrate>
      </QueryClientProvider>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Hydrate>
    </QueryClientProvider>
  );
}
