import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../src/styles/theme";
import Head from "next/head";
import { mediaQueries } from "../src/styles/mediaqueries";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>shopping web study</title>
      </Head>
      <ThemeProvider theme={{ ...theme, ...mediaQueries }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
