import Head from 'next/head'
import './../styles/home.scss'
import '../components/HeaderHome/headerHome.scss'
import '../components/ContactInfo/contactIndex.scss'
import './../components/Footer/footer.scss'
import './../styles/filterResidential.scss'
import './../components/Header/header.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/residential.scss'
import '../styles/filtroPatrimonio.scss'
import "../styles/patrimonio.scss"

import '../styles/costa.scss';
import '../styles/campoRustico.scss';
import '../styles/activosSingulares.scss';

import '../styles/index.scss'
import '../styles/globals.scss'
import Provider from '../providers/generalProvider'
// Componente que envuelve la app. 
/**
 * NOTAS: Este componente envuelve toda la app. Todo lo que se muestra aquí se renderiza para cada página. Es por eso que aquí importaremos nuestros estilos globales.
 * Si declaramos aquí el <Head></Head> estaremos declarando un valor por defecto en toda la app. Sin embargo, al declarar uno específico ejn cada página, este se sobre
 * escribe, mostrando el declarado para cada página.
 * 
 */
export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
