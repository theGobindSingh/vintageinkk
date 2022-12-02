import "../styles/style.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";

// import { Poppins, Lobster, Comfortaa, Abril_Fatface } from "@next/font/google";
// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   style: ["italic", "normal"],
//   preload: true,
//   variable: "--font-poppins",
//   subsets: [],
// });
// const lobster = Lobster({
//   weight: ["400"],
//   style: ["normal"],
//   preload: true,
//   variable: "--font-lobster",
//   subsets: [],
// });
// const comfortaa = Comfortaa({
//   weight: ["300", "400", "500", "600", "700"],
//   style: ["normal"],
//   preload: true,
//   variable: "--font-comfortaa",
//   subsets: [],
// });
// const abrilFatface = Abril_Fatface({
//   weight: ["400"],
//   style: ["normal"],
//   preload: true,
//   variable: "--font-abril-fatface",
//   subsets: [],
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
