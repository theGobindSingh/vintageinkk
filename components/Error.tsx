import React from "react";
import Head from "next/head";
import Lottie from "react-lottie-player";
import somethingWentWrongJSON from "../public/assets/lottieAnimations/something-went-wrong.json";
import { bizDesc, name, tagLine } from "./info";

export default function Error() {
  return (
    <section id="Error-page">
      <Head>
        <title>{name + " | " + tagLine}</title>
        <meta name="description" content={bizDesc} />
      </Head>
      <h1 style={{ height: "0px", width: "0px", display: "none" }}>
        {name + " | " + tagLine + " | " + bizDesc}
      </h1>
      <span>{"Oops! Something went wrong :("}</span>
      <Lottie
        loop
        animationData={somethingWentWrongJSON}
        play
        className="lottie-animation"
      />
    </section>
  );
}
