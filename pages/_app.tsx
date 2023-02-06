import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../src/styles/theme";
import Head from "next/head";
import { mediaQueries } from "../src/styles/mediaqueries";
import GlobalStyle from "../src/styles/global";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>shopping web study</title>
        </Head>
        <ThemeProvider theme={{ ...theme, ...mediaQueries }}>
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
