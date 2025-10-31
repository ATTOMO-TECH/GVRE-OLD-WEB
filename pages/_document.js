import { Html, Head, Main, NextScript } from "next/document";
import Footer from "../components/Footer/Footer";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Grandes Viviendas Real Estate - Expertos en gestión inmobiliaria de lujo"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        {/* <!--
            manifest.json provides metadata used when your web app is installed on a
            user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
          --> */}
        {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}

        {/* <!-- PrimeReact --> */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/primeicons/primeicons.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/primereact/resources/themes/lara-light-indigo/theme.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/primereact/resources/primereact.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/primeflex@3.2.1/primeflex.min.css"
        />
        {/* <!--
            Notice the use of %PUBLIC_URL% in the tags above.
            It will be replaced with the URL of the `public` folder during the build.
            Only files inside the `public` folder can be referenced from the HTML.
        
            Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
            work correctly both with client-side routing and a non-root public URL.
            Learn how to configure a non-root public URL by running `npm run build`.
          --> */}

        {/* eslint-disable-next-line @next/next/no-css-tags */}
        {/* <link rel="stylesheet" href="carousel.css" /> */}
      </Head>
      <body>
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
