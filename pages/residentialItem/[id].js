import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router.js";
import dynamic from "next/dynamic";
import Head from "next/head";
import emailjs from "emailjs-com";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import {
  getConsultants,
  getResidentialItem,
  sendInfoEmailFromActiveItemForm,
} from "../../api-requests/requests.js";
import { Carousel } from "react-responsive-carousel";
import Header from "../../components/Header/Header";
import DisplayVideo from "../../components/DisplayVideo/DisplayVideo";
import { BarLoader } from "react-spinners";
import fullScreen from "../../assets/SVG/mobile/comun/pantallaCompleta.svg";
import closeFullScreen from "../../assets/SVG/mobile/comun/cerrarCompleta.svg";
import check from "../../assets/SVG/mobile/comun/check.svg";
import send from "../../assets/SVG/mobile/comun/flechaEnviar.svg";
import Image from "next/image.js";
import useWindowSize from "../../hooks/useWindowsSize.js";

const QRGenerator = dynamic(
  () => import("../../components/QRgenerator/QRgenerator"),
  { ssr: false }
);
const DownLoadBuildingSheet = dynamic(
  () =>
    import("../../components/DownLoadBuildingSheet/DownLoadBuildingSheet.js"),
  { ssr: false }
);
const DownLoadBuildingDrawings = dynamic(
  () => import("../../components/DownloadDrawings/DownloadDrawings.js"),
  { ssr: false }
);
const MapWithNoSSR = dynamic(
  () => import("../../components/MapItem/MapItem.js"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ height: "400px", width: "100%", backgroundColor: "#e0e0e0" }}
      >
        <p>Cargando mapa...</p>
      </div>
    ),
  }
);

// AÑADIMOS seoData A LOS PROPS
export default function ResidentialItem({ list, currentConsultant, seoData }) {
  const [_client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  let consultant = undefined;
  if (currentConsultant !== undefined) consultant = currentConsultant;

  const state = list !== undefined ? list[0] : undefined;
  let id = undefined;
  if (state !== undefined) id = state._id;
  const router = useRouter();
  const size = useWindowSize();

  const [viewFullScreen, setViewFullScreen] = useState(false);
  const [viewMap, setViewMap] = useState(false);
  const form = useRef();
  const [viewForm, setViewForm] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [textareaArr, setTextareaArr] = useState([]);

  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };

  useEffect(() => {
    const isIOS = /iPad|iPhone/.test(navigator.userAgent);
    if (router.pathname === "/residentialItem/[id]" && isIOS) {
      const scrollPageToTop = () => {
        window.scrollTo(0, 0);
      };
      setTimeout(scrollPageToTop, 200);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (
      list[0].adStatus !== "Activo" ||
      list[0].gvOperationClose === "Alquilado" ||
      list[0].gvOperationClose === "Vendido"
    )
      router.push("/");
  }, [list, router]);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  useEffect(() => {
    if (!state) return;
    const getCoords = async () => {
      const address = `${state.adDirection.address.street} ${state.adDirection.address.directionNumber}, ${state.adDirection.city}`;
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address
      )}&format=json&limit=1`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
          setLatitude(parseFloat(data[0].lat));
          setLongitude(parseFloat(data[0].lon));
        } else {
          console.error("No se encontraron coordenadas");
        }
      } catch (error) {
        console.error("Error al contactar con Nominatim:", error);
      }
    };
    getCoords();
  }, [list, state]);

  const toggleFullScreen = () => {
    setViewFullScreen(!viewFullScreen);
  };
  const toggleMap = () => {
    setViewMap(!viewMap);
  };

  const initialValues = {
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    mensaje: "",
  };
  const validationSchema = yup.object({
    nombre: yup.string("").required("Este campo es obligatorio"),
    apellidos: yup.string("").required("Este campo es obligatorio"),
    email: yup
      .string("")
      .required("Este campo es obligatorio")
      .email("El email no es válido"),
    telefono: yup.string("").required("Este campo es obligatorio"),
    mensaje: yup.string(""),
    referencia: yup.string(""),
  });

  const sendEmail = async (e) => {
    const data = {
      contactName: form.current.nombre.value,
      contactSurname: form.current.apellidos.value,
      contactEmail: form.current.email.value,
      contactPhone: form.current.telefono.value,
      contactMessage: form.current.mensaje.value,
      activeReference: state.adReference,
      consultantEmail: consultant.consultantEmail,
    };
    const emailSend = await sendInfoEmailFromActiveItemForm(data);
    if (emailSend === "Mensaje enviado") {
      setViewForm(!viewForm);
    } else {
      alert("El email no se ha podido enviar correctamente.");
    }
  };

  const toggleForm = () => {
    setViewForm(!viewForm);
  };

  useEffect(() => {
    const textarea1 = document.getElementsByTagName("textarea");
    const textareaArr1 = Array.from(textarea1);
    if (textareaArr1 !== undefined) {
      setTextareaArr(textareaArr1);
      textareaArr1?.forEach((elemento) => {
        elemento.style.height = `${elemento.scrollHeight}px`;
      });
    }
  }, []);

  useEffect(() => {
    const setTextAreaRows = () => {
      let scrollHeight = 0;
      textareaArr.forEach((elemento) => {
        if (elemento.scrollHeight > scrollHeight) {
          scrollHeight = elemento.scrollHeight;
        }
      });
      return Math.ceil(scrollHeight / 20);
    };
    window.addEventListener("resize", setTextAreaRows);
  }, [textareaArr]);

  // Usamos los datos que vienen del servidor (seoData)
  const ogTitle = seoData?.title || "Grandes Viviendas";
  const ogDesc = seoData?.description || "Inmueble exclusivo";
  const ogImage = seoData?.image || "https://gvre.es/favicon.ico";

  return (
    <div className="residentialItem">
      <Head>
        <title>{ogTitle}</title>
        <meta name="description" content={ogDesc} />

        {/* Open Graph / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Fallback Schema.org */}
        <meta itemprop="name" content={ogTitle} />
        <meta itemprop="description" content={ogDesc} />
        <meta itemprop="image" content={ogImage} />
      </Head>

      {state?.images ? (
        <div>
          <Header />
          {isLoading ? (
            <Carousel
              className="residentialItem__carousel"
              showArrows={true}
              showThumbs={false}
              infiniteLoop={true}
              showStatus={false}
              useKeyboardArrows={true}
              autoFocus={true}
            >
              <Image
                width={1486}
                height={862}
                className="residentialItem__carousel__images custom-objetc-fit"
                src={state.images.main.replaceAll(" ", "%20")}
                alt={state.title}
                loading="lazy"
              />
              {state.images.others.map((image) => (
                <Image
                  width={1486}
                  height={862}
                  className="residentialItem__carousel__images custom-objetc-fit"
                  key={state._id}
                  src={image.replaceAll(" ", "%20")}
                  alt={state.title}
                  loading="lazy"
                />
              ))}
            </Carousel>
          ) : (
            <div className="spinnerBar">
              <BarLoader color="#000000" width="80px" height="2px" />
            </div>
          )}

          {/* ... resto del JSX se mantiene igual ... */}
          {/* He resumido esta parte para que sea fácil de copiar, 
              pero aquí iría el resto del renderizado (FullScreen, Descriptions, etc) 
              que ya tenías bien */}
          {viewFullScreen === true ? (
            <div className="residentialItem__fullScreen">
              <button
                onClick={toggleFullScreen}
                className="residentialItem__fullScreen__close"
              >
                <Image
                  width={14}
                  height={14}
                  src={closeFullScreen}
                  alt="close full screen"
                />
              </button>
              <Carousel
                className="residentialItem__fullScreen__carousel"
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                useKeyboardArrows={true}
                autoFocus={true}
              >
                <Image
                  width={1486}
                  height={862}
                  className="carouselImages"
                  src={state.images.main.replaceAll(" ", "%20")}
                  alt={state.title}
                  loading="lazy"
                />
                {state.images.others.map((image) => (
                  <Image
                    width={1486}
                    height={862}
                    className="carouselImages"
                    key={state._id}
                    src={image.replaceAll(" ", "%20")}
                    alt={state.title}
                    loading="lazy"
                  />
                ))}
                {state.featuredDrawings && state.images.blueprint.length !== 0
                  ? state.images.blueprint.map((image) => {
                      return (
                        <Image
                          width={1486}
                          height={862}
                          className="carouselImages"
                          key={image}
                          src={image.replaceAll(" ", "%20")}
                          alt={state.title}
                        />
                      );
                    })
                  : null}
              </Carousel>
            </div>
          ) : null}
          {viewMap === true ? (
            <div className="residentialItem__fullScreen">
              <button
                onClick={toggleMap}
                className="residentialItem__map__close"
              >
                <Image
                  width={14}
                  height={14}
                  src={closeFullScreen}
                  alt="close full screen"
                />
              </button>
              <Carousel
                className="residentialItem__fullScreen__carousel"
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                useKeyboardArrows={true}
                autoFocus={true}
              >
                {state.images.blueprint.map((image) => {
                  return (
                    <Image
                      width={1486}
                      height={862}
                      className="carouselImages custom-map-size"
                      key={image}
                      src={image.replaceAll(" ", "%20")}
                      alt={state.title}
                    />
                  );
                })}
              </Carousel>
            </div>
          ) : null}
          <p className="residentialItem__ref">Ref. {state.adReference}</p>
          <div className="residentialItem__description">
            <div className="residentialItem__description__principal">
              <button onClick={toggleFullScreen}>
                <Image
                  width={22}
                  height={20}
                  src={fullScreen}
                  alt="full screen"
                />
              </button>
              {state.adType.length === 1 ? (
                <h2 className="residentialItem__description__principal__price">
                  {state.adType.map((type) =>
                    type === "Venta" &&
                    state.sale.saleShowOnWeb === true &&
                    state.sale.saleValue !== 0
                      ? `${new Intl.NumberFormat("de-DE").format(
                          state.sale.saleValue
                        )} €`
                      : type === "Alquiler" &&
                        state.rent.rentShowOnWeb === true &&
                        state.rent.rentValue !== 0
                      ? `${new Intl.NumberFormat("de-DE").format(
                          state.rent.rentValue
                        )} € mes`
                      : null
                  )}
                </h2>
              ) : (
                <h2 className="residentialItem__description__principal__prices">
                  {state.sale.saleShowOnWeb && state.sale.saleValue !== 0 ? (
                    <p>{`${new Intl.NumberFormat("de-DE").format(
                      state.sale.saleValue
                    )} €`}</p>
                  ) : null}
                  {state.rent.rentShowOnWeb && state.rent.rentValue !== 0 ? (
                    <p>{`${new Intl.NumberFormat("de-DE").format(
                      state.rent.rentValue
                    )} € mes`}</p>
                  ) : null}
                </h2>
              )}
              <h1 className="residentialItem__description__principal__title">
                {state.title}
              </h1>
              <h3>{state.webSubtitle}</h3>
            </div>
            {state.adType.map((item, i) =>
              item === "Alquiler" ? (
                <div
                  key={i}
                  className={
                    state.expensesIncluded !== 0 &&
                    state.monthlyRent !== 0 &&
                    state.expenses !== 0
                      ? "residentialItem__description__rent"
                      : "residentialItem__description__rentEmpty"
                  }
                >
                  <h3 className="residentialItem__description__rent__title">
                    Alquiler
                  </h3>
                  <div
                    className={
                      state.expensesIncluded !== 0 &&
                      state.monthlyRent !== 0 &&
                      state.expenses !== 0
                        ? "residentialItem__description__rent__numbers"
                        : "residentialItem__description__rentEmpty__numbers"
                    }
                  >
                    {state.expensesIncluded !== 0 ? (
                      <div>
                        <h4>{`${new Intl.NumberFormat("de-DE").format(
                          state.expensesIncluded
                        )}`}</h4>
                        <p>
                          Renta €/m<sup>2</sup>/mes
                        </p>
                        <p>gastos incluidos</p>
                      </div>
                    ) : null}
                    {state.monthlyRent !== 0 ? (
                      <div>
                        <h4>{`${new Intl.NumberFormat("de-DE").format(
                          state.monthlyRent
                        )}`}</h4>
                        <p>
                          Renta €/m<sup>2</sup>
                        </p>
                      </div>
                    ) : null}
                    {state.expenses !== 0 ? (
                      <div>
                        <h4>{`${new Intl.NumberFormat("de-DE").format(
                          state.expenses
                        )}`}</h4>
                        <p>
                          Gastos €/m<sup>2</sup>/mes
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null
            )}
            {state.description.web !== "" ? (
              <div className="residentialItem__description__web">
                {state.images.media && state.images.media !== "" ? (
                  <DisplayVideo
                    videoUrl={state.images.media}
                    portraitImage={state.images.main.replaceAll(" ", "%20")}
                  />
                ) : null}

                <h2>Descripción</h2>
                <textarea
                  spellCheck="false"
                  disabled
                  value={state.description.web}
                />
              </div>
            ) : null}
            <div className="residentialItem__description__distribution">
              {state.description.distribution !== "" ? (
                <h2>Distribución</h2>
              ) : null}
              {state.description.distribution !== "" ? (
                <textarea
                  spellCheck="false"
                  disabled
                  value={state.description.distribution}
                />
              ) : null}
              <div className="residentialItem__description__distribution__buttons">
                {state !== null &&
                  id !== undefined &&
                  state.images.blueprint.length !== 0 && (
                    <DownLoadBuildingDrawings
                      state={state}
                    ></DownLoadBuildingDrawings>
                  )}
                {(state?.featuredDrawings === undefined ||
                  !state?.featuredDrawings) &&
                state.images.blueprint.length !== 0 ? (
                  <button onClick={toggleMap}>Ver plano</button>
                ) : null}
                {state !== null && id !== undefined && (
                  <QRGenerator
                    urlString={`https://gvre.es/residentialItem/${state._id}`}
                  />
                )}
                {state !== null && id !== undefined && (
                  <DownLoadBuildingSheet
                    state={state}
                    currentConsultant={currentConsultant}
                  />
                )}
              </div>
            </div>
            <div className="residentialItem__description__numbers">
              <div>
                {state.plotSurface !== 0 ? (
                  <div className="residentialItem__description__numbers__plot">
                    <p className="residentialItem__description__numbers__plot__data">
                      {state.plotSurface}
                    </p>
                    <p>
                      m<sup>2</sup> de parcela.
                    </p>
                  </div>
                ) : null}
                {state.buildSurface !== 0 ? (
                  <div className="residentialItem__description__numbers__build">
                    <p className="residentialItem__description__numbers__build__data">
                      {state.buildSurface}
                    </p>
                    <p>
                      m<sup>2</sup> construidos.
                    </p>
                  </div>
                ) : null}
                {state.quality.bedrooms !== 0 ? (
                  <div className="residentialItem__description__numbers__bed">
                    <p className="residentialItem__description__numbers__bed__data">
                      {state.quality.bedrooms}
                    </p>
                    <p>Habitaciones</p>
                  </div>
                ) : null}
                {state.quality.bathrooms !== 0 ? (
                  <div className="residentialItem__description__numbers__bed">
                    <p className="residentialItem__description__numbers__bed__data">
                      {state.quality.bathrooms}
                    </p>
                    <p>Baños</p>
                  </div>
                ) : null}
                {state.quality.parking !== 0 ? (
                  <div className="residentialItem__description__numbers__bed">
                    <p className="residentialItem__description__numbers__bed__data">
                      {state.quality.parking}
                    </p>
                    <p>Garaje</p>
                  </div>
                ) : null}
              </div>
              <div>
                {state.floor !== "" ? (
                  <div className="residentialItem__description__numbers__bed">
                    <p className="residentialItem__description__numbers__bed__data custom-numbers-size">
                      {state.floor}
                    </p>
                    <p>Planta</p>
                  </div>
                ) : null}
                {state.disponibility !== "" ? (
                  <div className="residentialItem__description__numbers__bath">
                    <p className="residentialItem__description__numbers__bath__data custom-numbers-size">
                      {state.disponibility}
                    </p>
                    <p>Disponibilidad</p>
                  </div>
                ) : null}
              </div>
              <div>
                {state.ibi.ibiValue !== 0 && state.ibi.ibiShowOnWeb === true ? (
                  <div className="residentialItem__description__numbers__bed">
                    <p className="residentialItem__description__numbers__bed__data">
                      {state.ibi.ibiValue}
                    </p>
                    <p>IBI €/año</p>
                  </div>
                ) : null}
                {state.communityExpenses.expensesValue !== 0 &&
                state.communityExpenses.expensesShowOnWeb === true ? (
                  <div className="residentialItem__description__numbers__bed">
                    <p className="residentialItem__description__numbers__bed__data">
                      {state.communityExpenses.expensesValue}
                    </p>
                    <p>Gastos de comunidad €/mes</p>
                  </div>
                ) : null}
              </div>
              <div>
                {state.quality.subway !== "" ? (
                  <div className="residentialItem__description__numbers__bed">
                    <p className="residentialItem__description__numbers__bed__data custom-numbers-size">
                      {state.quality.subway}
                    </p>
                    <p>Metro</p>
                  </div>
                ) : null}
                {state.quality.bus !== "" ? (
                  <div className="residentialItem__description__numbers__bed">
                    <p className="residentialItem__description__numbers__bed__data custom-numbers-size">
                      {state.quality.bus}
                    </p>
                    <p>Autobús</p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="residentialItem__description__extras">
              {state.quality.others.accessControl === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Control de accesos
                </p>
              ) : null}
              {state.quality.others.airConditioning === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" /> Aire
                  acondicionado
                </p>
              ) : null}
              {state.quality.others.centralHeating === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Calefacción central
                </p>
              ) : null}
              {state.quality.others.centralVacuum === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Aspiración centralizada
                </p>
              ) : null}
              {state.quality.others.dumbwaiter === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Montaplatos
                </p>
              ) : null}
              {state.quality.others.falseCeiling === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" /> Falso
                  techo
                </p>
              ) : null}
              {state.quality.others.freeHeight === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Altura libre &gt; 2.5m
                </p>
              ) : null}
              {state.quality.others.fullHoursSecurity === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Seguridad 24h
                </p>
              ) : null}
              {state.quality.others.garage === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Garaje
                </p>
              ) : null}
              {state.quality.others.gunRack === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Armero
                </p>
              ) : null}
              {state.quality.others.homeAutomation === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Domótica
                </p>
              ) : null}
              {state.quality.others.indoorAlarm === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Alarma interior
                </p>
              ) : null}
              {state.quality.others.lift === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Ascensor
                </p>
              ) : null}
              {state.quality.others.liftTruck === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Montacargas
                </p>
              ) : null}
              {state.quality.others.outdoorAlarm === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Alarma perimetral
                </p>
              ) : null}
              {state.quality.others.padelCourt === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" /> Pista
                  de pádel
                </p>
              ) : null}
              {state.quality.others.qualityBathrooms === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" /> Baños
                </p>
              ) : null}
              {state.quality.others.smokeOutlet === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Salida de humos
                </p>
              ) : null}
              {state.quality.others.storage === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Trastero
                </p>
              ) : null}
              {state.quality.others.strongBox === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" /> Caja
                  fuerte
                </p>
              ) : null}
              {state.quality.others.subFloorHeating === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" /> Suelo
                  radiante
                </p>
              ) : null}
              {state.quality.others.swimmingPool === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Piscina
                </p>
              ) : null}
              {state.quality.others.tennisCourt === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" /> Pista
                  de tenis
                </p>
              ) : null}
              {state.quality.others.terrace === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Terraza
                </p>
              ) : null}
              {state.quality.others.well === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" /> Pozo
                </p>
              ) : null}
              {state.quality.others.raisedFloor === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" /> Suelo
                  técnico
                </p>
              ) : null}
              {state.quality.others.furnished === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Amueblada
                </p>
              ) : null}
              {state.quality.others.implanted === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Implantada
                </p>
              ) : null}
              {state.quality.others.separateEntrance === true ? (
                <p>
                  {" "}
                  <Image width={20} height={20} src={check} alt="check" />{" "}
                  Entrada independiente
                </p>
              ) : null}
            </div>
            <div className="residentialItem__wrapper">
              <div className="residentialItem__description__owner">
                {consultant !== undefined ? (
                  <div className="residentialItem__description__owner__details">
                    <Image
                      width={size < 768 ? 558 : size < 1350 ? 345 : 200}
                      height={size < 768 ? 240 : size < 1350 ? 232 : 140}
                      src={consultant.avatar.replaceAll(" ", "%20")}
                      alt={consultant.fullName}
                    />
                    <p>{consultant.fullName}</p>
                    <p>{consultant.consultantPhoneNumber}</p>
                    <p>{consultant.consultantEmail}</p>
                  </div>
                ) : null}
              </div>
              <div className="residentialItem__description__form">
                {viewForm === true ? (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={sendEmail}
                  >
                    {({ errors, isSubmitting, touched }) => (
                      <Form
                        ref={form}
                        className="residentialItem__description__form__inputs"
                      >
                        <div className="residentialItem__description__form__wrapper">
                          <div className="residentialItem__description__form__wrapper__name">
                            <div className="residentialItem__description__form__wrapper__name__position">
                              <label className="residentialItem__description__form__label">
                                NOMBRE
                              </label>
                              <Field placeholder="Escriba aquí" name="nombre" />
                              {errors.nombre && touched.nombre ? (
                                <div>{errors.nombre}</div>
                              ) : null}
                            </div>
                            <div className="residentialItem__description__form__wrapper__name__position">
                              <label className="residentialItem__description__form__label">
                                APELLIDOS
                              </label>
                              <Field
                                placeholder="Escriba aquí"
                                name="apellidos"
                              />
                              {errors.apellidos && touched.apellidos ? (
                                <div>{errors.apellidos}</div>
                              ) : null}
                            </div>
                          </div>
                          <div className="residentialItem__description__form__wrapper__contact">
                            <div className="residentialItem__description__form__wrapper__contact__position">
                              <label className="residentialItem__description__form__label">
                                EMAIL
                              </label>
                              <Field
                                placeholder="ejemplo@gmail.eu"
                                name="email"
                              />
                              {errors.email && touched.email ? (
                                <div>{errors.email}</div>
                              ) : null}
                            </div>
                            <div className="residentialItem__description__form__wrapper__contact__position">
                              <label className="residentialItem__description__form__label">
                                TELÉFONO
                              </label>
                              <Field
                                placeholder="Escriba aquí"
                                name="telefono"
                              />
                              {errors.telefono && touched.telefono ? (
                                <div>{errors.telefono}</div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="residentialItem__description__form__wrapper__position">
                          <label className="residentialItem__description__form__label">
                            MENSAJE
                          </label>
                          <Field placeholder="Escriba aquí" name="mensaje" />
                          <p>
                            Al compartir sus datos, está aceptando nuestros
                            términos de uso y privacidad.
                          </p>
                        </div>
                        <div className="residentialItem__description__form__wrapper__position__reference">
                          <label className="residentialItem__description__form__label">
                            Referencia
                          </label>
                          <Field name="referencia" value={state.adReference} />
                        </div>
                        <button
                          className="residentialItem__description__form__button"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Enviar
                          <span>
                            <Image
                              width={35}
                              height={16}
                              src={send}
                              alt="enviar"
                            />
                          </span>
                        </button>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <div className="residentialItem__description__form__return">
                    <p>
                      Gracias por contactar con nosotros, en breve nos pondremos
                      en contacto
                    </p>
                    <button onClick={toggleForm}>Volver al formulario</button>
                  </div>
                )}
              </div>
            </div>
            <div className="goBack">
              <button className="goBack__button" onClick={goBack}>
                Volver al listado
              </button>
            </div>
            <div className="residentialItem__description__filter"></div>
            <div className="residentialItem__description__locationMap">
              <MapWithNoSSR lat={latitude} lng={longitude} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// =========================================================
// AQUÍ ESTÁ LA MAGIA DEL SERVIDOR: getServerSideProps
// =========================================================
export async function getServerSideProps(context) {
  if (context.query !== "carousel.css" && context.query !== undefined) {
    const { id } = context.query;
    const list = await getResidentialItem(id);
    const item = list && list.length > 0 ? list[0] : null;

    if (item) {
      // 1. Logica de Consultor
      let currentConsultant = {};
      if (item._id === id) {
        const itemConsultants = await getConsultants();
        currentConsultant = itemConsultants.find(
          (consultant) => consultant._id === item.consultant
        );
      }

      // 2. LOGICA SEO (Esto lo hacemos aqui para que WhatsApp reciba la URL optimizada)
      const DOMAIN = "https://gvre.es";
      let seoTitle = item.title || "Grandes Viviendas";
      let seoDesc = "Oportunidad de inversión";
      let seoImage = `${DOMAIN}/favicon.ico`;

      // Precios para la descripción
      let preciosTexto = [];
      if (
        item.adType?.includes("Venta") &&
        item.sale?.saleShowOnWeb &&
        item.sale?.saleValue > 0
      ) {
        preciosTexto.push(
          `${new Intl.NumberFormat("de-DE").format(item.sale.saleValue)} €`
        );
      }
      if (
        item.adType?.includes("Alquiler") &&
        item.rent?.rentShowOnWeb &&
        item.rent?.rentValue > 0
      ) {
        preciosTexto.push(
          `${new Intl.NumberFormat("de-DE").format(item.rent.rentValue)} €/mes`
        );
      }
      const precioFinal =
        preciosTexto.length > 0 ? preciosTexto.join(" | ") : "Consultar";
      const subtitleClean = (item.webSubtitle || "").replace(/"/g, "'");
      seoDesc = `${precioFinal} - ${subtitleClean}`;

      // IMAGEN: Usamos el optimizador de Next.js para bajar el peso
      if (item.images?.main) {
        const rawImage = item.images.main;
        if (rawImage.startsWith("http")) {
          // Codificamos URL y creamos el enlace al optimizador
          const encodedUrl = encodeURIComponent(rawImage);
          seoImage = `${DOMAIN}/_next/image?url=${encodedUrl}&w=1200&q=75`;
        } else {
          const separator = rawImage.startsWith("/") ? "" : "/";
          seoImage = `${DOMAIN}${separator}${rawImage.replace(/\s/g, "%20")}`;
        }
      }

      return {
        props: {
          list,
          currentConsultant,
          seoData: {
            title: seoTitle,
            description: seoDesc,
            image: seoImage,
          },
        },
      };
    } else {
      return { props: {} };
    }
  } else {
    return { props: {} };
  }
}
