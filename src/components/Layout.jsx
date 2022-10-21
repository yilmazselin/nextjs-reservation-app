import Head from "next/head";
import styled from "styled-components";

const Main = styled.div`
  padding-bottom: 100px;
`;

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>Tapu.com | Frontend Case</title>
        <meta content="Tapu.com | Frontend Case" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Main>{children}</Main>
    </>
  );
}
