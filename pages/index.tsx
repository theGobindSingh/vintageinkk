import Head from "next/head";
import Image from "next/image";
import { name } from "../components/info";

export default function Home() {
  return (
    <section aria-label="Home" id="Home">
      <Head>
        <title>{name} | Home</title>
      </Head>
    </section>
  );
}
