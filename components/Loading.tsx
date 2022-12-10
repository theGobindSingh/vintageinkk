import React from "react";
import Head from "next/head";
import Lottie from "react-lottie-player";
import loadingJSON from "../public/assets/lottieAnimations/loading.json";
import { bizDesc, name, tagLine } from "./info";

export default function Loading() {
  return (
    <section id="Loading-page">
      <Head>
        <title>{name + " | " + tagLine}</title>
        <meta name="description" content={bizDesc} />
      </Head>
      <h1 style={{ height: "0px", width: "0px", display: "none" }}>
        {name + " | " + tagLine + " | " + bizDesc}
      </h1>
      <span>{"Loading... Please wait..."}</span>
      <Lottie
        loop
        animationData={loadingJSON}
        play
        className="lottie-animation"
      />
    </section>
  );
}
