import Head from "next/head";
import { useEffect, useState } from "react";
import flechaEnviar from "./../assets/SVG/mobile/comun/flechaEnviar.svg";
import flechaAbajo from "./../assets/SVG/mobile/comun/flechaAbajo.svg";
import flechaCategoriasWeb from "./../assets/SVG/web/comunes/flechaCategoriasWeb.svg";
import routes from "./../config/routes.js";
import Header from "./../components/HeaderHome/HeaderHome";
import { getResidential, getWebData } from "./../api-requests/requests";
import Link from "next/link";
import banera from "./../assets/SVG/mobile/anuncios/anuncios_banos.svg";
import habit from "./../assets/SVG/mobile/anuncios/anuncios_habitaciones.svg";
import piscina from "./../assets/SVG/mobile/anuncios/anuncios_piscina.svg";
import ref from "./../assets/SVG/mobile/anuncios/anuncios_referencia.svg";
import sup from "./../assets/SVG/mobile/anuncios/anuncios_spfcie.svg";
import costa from "./../assets/home/costa.png";
import singular from "./../assets/home/singular.jpg";
import rustico from "./../assets/home/rustico.png";
import ContactIndex from "./../components/ContactInfo/ContactIndex";
import flechaCarrusel from "./../assets/SVG/web/comunes/homepageDestacados.svg";
import supP from "./../assets/SVG/web/anuncios/anuncios_superficieP.svg";
import parking from "./../assets/SVG/web/anuncios/anuncios_garaje.svg";
import Image from "next/image";
import setBackgroundImageToContainer from "../globalFunctions/functions";

export default function Home({ destacado, webDataInitial }) {
  const [webData, setWebData] = useState(webDataInitial || {});
  const [costaImage, setCostaImage] = useState("");
  const [rusticImage, setRusticImage] = useState("");
  const [singularImage, setSingularImage] = useState("");
  async function fetchGetWebData() {
    const webData = await getWebData();
    setWebData(webData[0]);
    setCostaImage(webData[0]?.otherCategoriesImages?.coast);
    setRusticImage(webData[0]?.otherCategoriesImages?.rustic);
    setSingularImage(webData[0]?.otherCategoriesImages?.singular);
    setBackgroundImageToContainer(webData[0].portraidImage, ".home__top");
    setBackgroundImageToContainer(
      webData[0].categoriesImages.residential,
      ".home__categories__container__option__residential",
    );
    setBackgroundImageToContainer(
      webData[0].categoriesImages.patrimonial,
      ".home__categories__container__option__patrimonial",
    );
    setBackgroundImageToContainer(
      webData[0].categoriesImages.art,
      ".home__categories__container__option__art",
    );
    setBackgroundImageToContainer(
      webData[0].categoriesImages.catalog,
      ".home__categories__container__option__catalog",
    );
    setBackgroundImageToContainer(
      webData[0].sections.interiorims.image,
      ".home__more__image",
    );
    setBackgroundImageToContainer(
      webData[0].sections.offices.image,
      ".home__moreB__image",
    );
    setBackgroundImageToContainer(
      webData[0].sections.sell.image,
      ".home__more__image2",
    );
  }
  useEffect(() => {
    fetchGetWebData();
  }, []);

  useEffect(() => {
    window.scroll({ top: 0 });
    window.localStorage.removeItem("storedPosition");
    window.localStorage.removeItem("storedPosition2");
  }, []);

  const next = () => {
    let container = document.getElementById("carrusel");
    sideScroll(container, "right", 5, 1400, 15);
  };
  const prev = () => {
    let container = document.getElementById("carrusel");
    sideScroll(container, "left", 5, 1400, 15);
  };

  function sideScroll(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (typeof window !== "undefined") {
        if (direction === "left") {
          element.scrollLeft -= step;
        } else {
          element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }
    }, speed);
  }

  const arrow = () => {
    let element = document.getElementById("top");
    if (typeof window !== "undefined") {
      window.scroll({
        top: element.clientHeight,
        behavior: "smooth",
      });
    }
  };

  const situate4 = () => {
    if (typeof window !== "undefined") {
      window.scroll({
        top: 3250,
        behavior: "smooth",
      });
    }
  };
  const situate2 = () => {
    if (typeof window !== "undefined") {
      window.scroll({
        top: 0,
      });
    }
  };

  const ogImage =
    destacado && destacado.length > 0
      ? destacado[0].images.main.replaceAll(" ", "%20")
      : "";

  return (
    <>
      <Head>
        <title>{webData?.mainTitle || "Grandes Viviendas"}</title>
        <meta
          name="description"
          content={webData?.mainSubtitle || "Luxury Real Estate"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          property="og:title"
          content={webData?.mainTitle || "Grandes Viviendas"}
        />
        <meta property="og:description" content={webData?.mainSubtitle} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
      </Head>
      <main>
        <div className="home">
          <Header />
          <div id="top" className="home__top">
            <div className="home__top__text">
              <h1 className="home__top__text__title">{webData?.mainTitle}</h1>
              <h2 className="home__top__text__content">
                {webData?.mainSubtitle}
              </h2>
            </div>
            <div className="home__top__buttons">
              <Link
                href={routes.FilterResidential}
                className="home__top__buttons__residencial"
              >
                Residencial
              </Link>
              <Link
                href={routes.FilterPatrimonial}
                className="home__top__buttons__patrimonio"
              >
                Patrimonio
              </Link>
            </div>
            <div className="home__top__arrow">
              <span>
                <Image src={flechaAbajo} alt="flecha" onClick={arrow} />
              </span>
            </div>
          </div>
          <div className="home__categories">
            <h2 className="home__categories__title">Explora las categorías</h2>
            <div className="home__categories__container">
              <Link
                href={routes.FilterResidential}
                className="home__categories__container__option"
              >
                <div className="home__categories__container__option__residential"></div>
                <h2 className="home__categories__container__option__name">
                  GV Residencial
                  <span>
                    <Image
                      width={24}
                      height={16}
                      src={flechaCategoriasWeb}
                      alt="flecha"
                    />
                  </span>
                </h2>
              </Link>
              <Link
                href={routes.FilterPatrimonial}
                className="home__categories__container__option"
              >
                <div className="home__categories__container__option__patrimonial"></div>
                <h2 className="home__categories__container__option__name">
                  GV Patrimonio
                  <span>
                    <Image
                      width={24}
                      height={16}
                      src={flechaCategoriasWeb}
                      alt="flecha"
                    />
                  </span>
                </h2>
              </Link>
              <Link
                href={routes.Contact}
                className="home__categories__container__option"
              >
                <div className="home__categories__container__option__art"></div>
                <h2 className="home__categories__container__option__name">
                  GV Arte
                  <span>
                    <Image
                      width={24}
                      height={16}
                      src={flechaCategoriasWeb}
                      alt="flecha"
                    />
                  </span>
                </h2>
              </Link>
              <Link
                href={routes.Catalogo}
                className="home__categories__container__option"
              >
                <div className="home__categories__container__option__catalog"></div>
                <h2 className="home__categories__container__option__name">
                  GV Catálogo
                  <span>
                    <Image
                      width={24}
                      height={16}
                      src={flechaCategoriasWeb}
                      alt="flecha"
                    />
                  </span>
                </h2>
              </Link>
            </div>
          </div>
          <div className="home__more">
            <div className="home__more__image"></div>
            <div className="home__more__text">
              <h3 className="home__more__text__title">
                {webData?.sections?.interiorims?.title}
              </h3>
              <p className="home__more__text__description">
                {webData?.sections?.interiorims?.description}
              </p>
              <Link
                href={`${routes.Contextual}#arquitectura`}
                onClick={situate4}
                className="home__more__text__link"
              >
                {webData?.sections?.interiorims?.buttonText}

                <span className="longArrow">
                  <Image
                    width={30}
                    height={20}
                    src={flechaEnviar}
                    alt="flecha"
                  />
                </span>
                <span className="shortArrow">
                  <Image
                    width={35}
                    height={16}
                    src={flechaCategoriasWeb}
                    alt="flecha"
                  />
                </span>
              </Link>
            </div>
          </div>
          <div className="home__moreB">
            <div className="home__moreB__image"></div>
            <div className="home__moreB__text">
              <h3 className="home__moreB__text__title">
                {webData?.sections?.offices?.title}
              </h3>
              <p className="home__moreB__text__description">
                {webData?.sections?.offices?.description}
              </p>
              <Link href={routes.Contact} className="home__moreB__text__link">
                {webData?.sections?.offices?.buttonText}
                <span className="longArrow">
                  <Image
                    width={30}
                    height={20}
                    src={flechaEnviar}
                    alt="flecha"
                  />
                </span>
                <span className="shortArrow">
                  <Image
                    width={35}
                    height={16}
                    src={flechaCategoriasWeb}
                    alt="flecha"
                  />
                </span>
              </Link>
            </div>
          </div>
          <div className="home__more">
            <div className="home__more__image2"></div>
            <div className="home__more__text">
              <h3 className="home__more__text__title">
                {webData?.sections?.sell?.title}
              </h3>
              <p className="home__more__text__description">
                {webData?.sections?.sell?.description}
              </p>
              <Link
                href={routes.Contact}
                onClick={situate2}
                className="home__more__text__link"
              >
                {webData?.sections?.sell?.buttonText}
                <span className="longArrow">
                  <Image
                    width={30}
                    height={20}
                    src={flechaEnviar}
                    alt="flecha"
                  />
                </span>
                <span className="shortArrow">
                  <Image
                    width={35}
                    height={16}
                    src={flechaCategoriasWeb}
                    alt="flecha"
                  />
                </span>
              </Link>
            </div>
          </div>
          <div className="home__otherCategories">
            <h2 className="home__otherCategories__title">Otras categorías</h2>
            <div className="home__otherCategories__categories">
              <Link
                href={`${routes.Costa}/1&page=1`}
                className="home__otherCategories__categories__item"
              >
                {costaImage && (
                  <Image
                    width={650}
                    height={405}
                    className="home__otherCategories__categories__item__image"
                    src={costaImage}
                    alt="categoría costa"
                  />
                )}

                <div className="home__otherCategories__categories__item__link">
                  <p>GV Costa</p>
                  <span>
                    <Image
                      width={35}
                      height={16}
                      src={flechaEnviar}
                      alt="flecha"
                    />
                  </span>
                </div>
              </Link>
              <Link
                href={`${routes.Rustico}/1&page=1`}
                className="home__otherCategories__categories__item"
              >
                {rusticImage && (
                  <Image
                    width={650}
                    height={405}
                    className="home__otherCategories__categories__item__image"
                    src={rusticImage}
                    alt="categoría rustico"
                  />
                )}

                <div className="home__otherCategories__categories__item__link">
                  <p>GV Campos Rústicos</p>
                  <span>
                    <Image
                      width={35}
                      height={16}
                      src={flechaEnviar}
                      alt="flecha"
                    />
                  </span>
                </div>
              </Link>
              <Link
                href={`${routes.Singular}/1&page=1`}
                className="home__otherCategories__categories__item"
              >
                {singularImage && (
                  <Image
                    width={650}
                    height={405}
                    className="home__otherCategories__categories__item__image"
                    src={singularImage}
                    alt="categoría singulares"
                  />
                )}
                <div className="home__otherCategories__categories__item__link">
                  <p>GV Activos singulares</p>
                  <span>
                    <Image
                      width={35}
                      height={16}
                      src={flechaEnviar}
                      alt="flecha"
                    />
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="home__outstanding">
            <h2 className="home__outstanding__title">Nuestros destacados</h2>
            <div id="carrusel" className="home__outstanding__position">
              {destacado.length > 0
                ? destacado.map((item, index) => (
                    <Link
                      key={`${item._id}-${index}`}
                      href={`${routes.ItemResidential}/${item._id}`}
                      className="home__outstanding__position__images"
                    >
                      <p className="home__outstanding__position__images__destacado">
                        DESTACADO
                      </p>
                      <div>
                        <h2 className="home__outstanding__position__images__text__price">{`${new Intl.NumberFormat(
                          "de-DE",
                        ).format(Math.ceil(item.sale.saleValue))} €`}</h2>

                        <Image
                          width={450}
                          height={300}
                          className="home__outstanding__position__images__image"
                          key={`${item._id}-${index}`}
                          src={item.images.main.replaceAll(" ", "%20")}
                          alt={item.title}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div className="home__outstanding__position__images__text">
                          <h2 className="home__outstanding__position__images__text__title">
                            {item.title}
                          </h2>
                          <h3 className="home__outstanding__position__images__text__street">
                            {item.webSubtitle.toUpperCase()}
                          </h3>
                          <ul className="home__outstanding__position__images__item__text__characteristics">
                            {item.buildSurface !== 0 ? (
                              <li>
                                <span>
                                  <Image
                                    width={11}
                                    height={12}
                                    src={sup}
                                    alt="superficie"
                                  />
                                </span>
                                {item.buildSurface}m<sup>2</sup>
                              </li>
                            ) : null}
                            {item.plotSurface !== 0 ? (
                              <li>
                                <span>
                                  <Image
                                    width={23}
                                    height={15}
                                    src={supP}
                                    alt="superficie"
                                  />
                                </span>
                                {item.plotSurface}m<sup>2</sup>
                              </li>
                            ) : null}
                            {item.quality.bedrooms !== 0 ? (
                              <li>
                                <span>
                                  <Image
                                    width={15}
                                    height={10}
                                    src={habit}
                                    alt="habitaciones"
                                  />
                                </span>
                                {item.quality.bedrooms}
                              </li>
                            ) : null}
                            {item.quality.bathrooms !== 0 ? (
                              <li>
                                <span>
                                  <Image
                                    width={14}
                                    height={11}
                                    src={banera}
                                    alt="baños"
                                  />
                                </span>
                                {item.quality.bathrooms}
                              </li>
                            ) : null}
                            {item.quality.parking !== 0 ? (
                              <li className="home__outstanding__position__images__item__text__characteristics__car">
                                <span>
                                  <Image
                                    width={23}
                                    height={15}
                                    src={parking}
                                    alt="plazas parking"
                                  />
                                </span>
                                {item.quality.parking}
                              </li>
                            ) : null}
                            {item.quality.outdoorPool !== 0 ? (
                              <li>
                                <span>
                                  <Image
                                    width={14}
                                    height={8}
                                    src={piscina}
                                    alt="piscina"
                                  />
                                </span>
                                {item.quality.outdoorPool}
                              </li>
                            ) : null}
                            {item.adReference !== 0 ? (
                              <li>
                                <span>
                                  <Image
                                    width={12}
                                    height={11}
                                    src={ref}
                                    alt="referencia"
                                  />
                                </span>
                                <p>Ref {item.adReference}</p>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      </div>
                    </Link>
                  ))
                : null}
            </div>
            <div className="home__outstanding__buttons">
              <button
                className="home__outstanding__buttons__prev"
                onClick={prev}
              >
                <Image
                  width={93}
                  height={16}
                  src={flechaCarrusel}
                  alt="flecha"
                />
              </button>
              <button
                className="home__outstanding__buttons__next"
                onClick={next}
              >
                <Image
                  width={93}
                  height={16}
                  src={flechaCarrusel}
                  alt="flecha"
                />
              </button>
            </div>
          </div>
          <ContactIndex />
        </div>
      </main>
    </>
  );
}

/**
 * Este método se ejecuta en el servidor, pero tambien se ejecuta a veces en el cliente. Por ejemplo:
 * Se ejecuta del lado del cliente cuando se accede a la página mediante un link/enlace, ya que en este caso, la petición
 * no pasa por el servidor. Entonces no queda más remedio que recuperar los datos mediante una navegación en el cliente. --> Veremos el fectch de datos en la consola
 * N request -> se ejecuta N veces
 * se suele usar para datos que sean MUY live
 * cuando existen demasiados datos dinámicos
 *
 * @returns devuelve los anuncios destacados
 */
// export async function getServerSideProps(){
//   const {ads} = await getResidential({featuredOnMain: true})
//   const destacado = ads
// return {
//   props: {
//     destacado
//   }
// }
// }

/**
 * Para evitar hacer todo el rato llamadas al servidor y hacer el fetching de datos se usa el método getStaticProps.
 * En vez de hacer una llamada al servidor cada vez que se accede a la página, hace la llamada una sola vez y la prerenderiza.
 * N request -> se ejecuta 1 vez en build time o para refrescar la página
 */
export async function getStaticProps() {
  try {
    // 1. Cargamos viviendas destacadas
    // También envolvemos esto en try/catch por si el backend falla aquí
    let ads = [];
    try {
      const residentialData = await getResidential({ featuredOnMain: true });
      ads = residentialData.ads || [];
    } catch (e) {
      console.warn("No se pudieron cargar los anuncios destacados", e);
    }

    // 2. Cargamos los datos de la web
    const webDataRaw = await getWebData();

    // Si webDataRaw es null (por el 404), usamos un objeto vacío para no romper nada
    const webDataInitial =
      webDataRaw && webDataRaw.length > 0 ? webDataRaw[0] : {};

    return {
      props: {
        destacado: ads,
        webDataInitial,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error global en getStaticProps:", error);
    return {
      props: {
        destacado: [],
        webDataInitial: {},
      },
      revalidate: 60,
    };
  }
}
