import "./../styles/home.scss";
import "../components/HeaderHome/headerHome.scss";
import "../components/ContactInfo/contactIndex.scss";
import "./../components/Footer/footer.scss";
import "./../styles/filterResidential.scss";
import "./../components/Header/header.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/residential.scss";
import "../styles/residentialItem.scss";
import "../styles/filtroPatrimonio.scss";
import "../styles/patrimonio.scss";
import "../styles/patrimonioItem.scss";
import "./../components/DisplayVideo/displayVideo.scss";

import "../styles/costa.scss";
import "../styles/campoRustico.scss";
import "../styles/activosSingulares.scss";
import "../styles/contextuales.scss";
import "../styles/equipo.scss";
import "../styles/contacto.scss";
import "../styles/catalogo.scss";
import "../components/catalog-pdf/catalog-pdf.scss";
import "../components/CatalogModal/catalog-modal.scss";

import "../styles/avisoLegal.scss";
import "../styles/politicaPrivacidad.scss";

import "../styles/index.scss";
import "../styles/globals.scss";
import "../styles/cookies.scss";
import Provider from "../providers/generalProvider";

import TagManager from "react-gtm-module";
import { useEffect } from "react";
import Cookies from "../hooks/cookies/cookies";
import { useRouter } from "next/router";
import route from "../config/routes";

// --- AÑADIDO: Importa las fuentes desde next/font ---
import { Inter, Jost } from "next/font/google";

// --- AÑADIDO: Define tus fuentes ---
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Variable CSS para usar en tu SCSS
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"], // Los pesos que usabas
  style: ["normal", "italic"], // Los estilos que usabas
  variable: "--font-jost", // Variable CSS para usar en tu SCSS
  display: "swap",
});

const tagManagerArgs = {
  gtmId: "GTM-TZPVZRC",
};

// Componente que envuelve la app.
/**
 * NOTAS: Este componente envuelve toda la app. Todo lo que se muestra aquí se renderiza para cada página. Es por eso que aquí importaremos nuestros estilos globales.
 * Si declaramos aquí el <Head></Head> estaremos declarando un valor por defecto en toda la app. Sin embargo, al declarar uno específico ejn cada página, este se sobre
 * escribe, mostrando el declarado para cada página.
 *
 */
export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  return (
    <main className={`${inter.variable} ${jost.variable}`}>
      <Provider>
        {useRouter().pathname !== route.Politica && <Cookies />}
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
