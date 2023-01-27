import type { NextPage } from "next";
import Layout from "../src/components/Layout/Layout";
import Main from "../src/components/Main/Main";
const Home: NextPage = () => {
  return (
    <Layout>
      <Main />
    </Layout>
  );
};

export default Home;
