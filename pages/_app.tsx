import "../styles/style.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

import { QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { queryClient } from "../clients";
import { AppContext } from "../context";

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
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AppContext>
          <Header />
          {loading ? <Loading /> : <Component {...pageProps} />}
          <Footer />
        </AppContext>
      </Hydrate>
    </QueryClientProvider>
  );
}
