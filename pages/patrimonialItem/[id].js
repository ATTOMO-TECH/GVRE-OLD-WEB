import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router.js";
import { Carousel } from "react-responsive-carousel";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import useWindowSize from "../../hooks/useWindowsSize.js";
import {
  getConsultants,
  getPatrimonialItem,
  sendInfoEmailFromActiveItemForm,
} from "../../api-requests/requests.js";
import Image from "next/image.js";
import Header from "../../components/Header/Header";
import DisplayVideo from "../../components/DisplayVideo/DisplayVideo";
import fullScreen from "../../assets/SVG/mobile/comun/pantallaCompleta.svg";
import closeFullScreen from "../../assets/SVG/mobile/comun/cerrarCompleta.svg";
import check from "../../assets/SVG/mobile/comun/check.svg";
import send from "../../assets/SVG/mobile/comun/flechaEnviar.svg";
import busIcon from "../../assets/SVG/mobile/comun/bus-icon.svg";
import metroIcon from "../../assets/SVG/mobile/comun/metro-icon.svg";

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

// Añadimos seoData aqui tambien
export default function PatrimonialItem({ list, currentConsultant, seoData }) {
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
  const [textareaArr, setTextareaArr] = useState([]);

  const goBack = (e) => {
    e.preventDefault();
    router.back();
  };

  useEffect(() => {
    const isIOS = /iPad|iPhone/.test(navigator.userAgent);
    if (router.pathname === "/patrimonialItem/[id]" && isIOS) {
      const scrollPageToTop = () => {
        window.scrollTo(0, 0);
      };
      setTimeout(scrollPageToTop, 200);
    }
  }, [router.pathname]);

  // Redirección
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

  // Usamos los datos SEO que vienen del servidor
  const ogTitle = seoData?.title || "Grandes Viviendas - Patrimonio";
  const ogDesc = seoData?.description || "Oportunidad de inversión";
  const ogImage = seoData?.image || "https://gvre.es/favicon.ico";

  return (
    <div className="patrimonialItem">
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

        {/* Fallback */}
        <meta itemprop="name" content={ogTitle} />
        <meta itemprop="description" content={ogDesc} />
        <meta itemprop="image" content={ogImage} />
      </Head>

      {state?.images ? (
        <div>
          <Header />
          {/* ... resto del JSX (Carousel, etc) ... */}
          {state?.featuredDrawings !== undefined &&
          state?.featuredDrawings !== false ? (
            <Carousel
              className="patrimonialItem__carousel"
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
                className="patrimonialItem__carousel__images custom-objetc-fit"
                src={state.images.main.replaceAll(" ", "%20")}
                alt={state.title}
                loading="lazy"
              />
              {state.images.others.map((image) => (
                <Image
                  width={1486}
                  height={862}
                  className="patrimonialItem__carousel__images custom-objetc-fit"
                  key={state._id}
                  src={image.replaceAll(" ", "%20")}
                  alt={state.title}
                  loading="lazy"
                />
              ))}
              {state.images.blueprint.map((image) => (
                <Image
                  width={1486}
                  height={862}
                  className="patrimonialItem__carousel__images custom-objetc-fit"
                  key={image}
                  src={image.replaceAll(" ", "%20")}
                  alt={state.title}
                />
              ))}
            </Carousel>
          ) : (
            <Carousel
              className="patrimonialItem__carousel"
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
                className="patrimonialItem__carousel__images custom-objetc-fit"
                src={state.images.main.replaceAll(" ", "%20")}
                alt={state.title}
                loading="lazy"
              />
              {state.images.others.map((image) => (
                <Image
                  width={1486}
                  height={862}
                  className="patrimonialItem__carousel__images custom-objetc-fit"
                  key={state._id}
                  src={image.replaceAll(" ", "%20")}
                  alt={state.title}
                  loading="lazy"
                />
              ))}
            </Carousel>
          )}
          {viewFullScreen === true ? (
            <div className="patrimonialItem__fullScreen">
              <button
                onClick={toggleFullScreen}
                className="patrimonialItem__fullScreen__close"
              >
                <Image
                  width={14}
                  height={14}
                  src={closeFullScreen}
                  alt="close full screen"
                />
              </button>
              <Carousel
                className="patrimonialItem__fullScreen__carousel"
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
                      //console.log('ruta:', image)
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
            <div className="patrimonialItem__map">
              <button
                onClick={toggleMap}
                className="patrimonialItem__map__close"
              >
                <Image
                  width={14}
                  height={14}
                  src={closeFullScreen}
                  alt="close full screen"
                />
              </button>
              <Carousel
                className="patrimonialItem__fullScreen__carousel"
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                useKeyboardArrows={true}
                autoFocus={true}
              >
                {state.images.blueprint.map((image) => (
                  <Image
                    width={1486}
                    height={862}
                    className="carouselImages custom-map-size"
                    key={image}
                    src={image.replaceAll(" ", "%20")}
                    alt={state.title}
                  />
                ))}
              </Carousel>
            </div>
          ) : null}
          <p className="patrimonialItem__ref">Ref. {state.adReference}</p>
          <div className="patrimonialItem__description">
            <div
              className={
                state.expensesIncluded !== 0 &&
                state.monthlyRent !== 0 &&
                state.expenses !== 0
                  ? "patrimonialItem__description__principal"
                  : "patrimonialItem__description__principalEmpty"
              }
            >
              <Image
                width={22}
                height={20}
                onClick={toggleFullScreen}
                src={fullScreen}
                alt="full screen"
              />
              {state.adType.length === 1 ? (
                <h2 className="patrimonialItem__description__principal__price">
                  {state.adType.map((type) =>
                    type === "Venta" &&
                    state.sale.saleShowOnWeb === true &&
                    state.sale.saleValue !== 0
                      ? `${new Intl.NumberFormat("de-DE").format(
                          Math.ceil(state.sale.saleValue) // Redondeo al alza aquí
                        )} €`
                      : type === "Alquiler" &&
                        state.rent.rentShowOnWeb === true &&
                        state.rent.rentValue !== 0
                      ? `${new Intl.NumberFormat("de-DE").format(
                          Math.ceil(state.rent.rentValue) // Redondeo al alza aquí
                        )} € mes`
                      : null
                  )}
                </h2>
              ) : (
                <h2 className="patrimonialItem__description__principal__prices">
                  {state.sale.saleShowOnWeb && state.sale.saleValue !== 0 ? (
                    <p>{`${new Intl.NumberFormat("de-DE").format(
                      Math.ceil(state.sale.saleValue) // Redondeo al alza aquí
                    )} €`}</p>
                  ) : null}
                  {state.rent.rentShowOnWeb && state.rent.rentValue !== 0 ? (
                    <p>{`${new Intl.NumberFormat("de-DE").format(
                      Math.ceil(state.rent.rentValue) // Redondeo al alza aquí
                    )} € mes`}</p>
                  ) : null}
                </h2>
              )}
              <h1 className="patrimonialItem__description__principal__title">
                {state.title}
              </h1>
              <h3 className="patrimonialItem__description__web__subtitle">
                {state.webSubtitle}
              </h3>
            </div>
            {state.adType.map((item, i) =>
              item === "Alquiler" ? (
                <div
                  key={i}
                  className={
                    state.expensesIncluded !== 0 &&
                    state.monthlyRent !== 0 &&
                    state.expenses !== 0
                      ? "patrimonialItem__description__rent"
                      : "patrimonialItem__description__rentEmpty"
                  }
                >
                  <h3 className="patrimonialItem__description__rent__title">
                    Alquiler
                  </h3>
                  <div
                    className={
                      state.expensesIncluded !== 0 &&
                      state.monthlyRent !== 0 &&
                      state.expenses !== 0
                        ? "patrimonialItem__description__rent__numbers"
                        : "patrimonialItem__description__rentEmpty__numbers"
                    }
                  >
                    {state?.expensesIncluded !== 0 ? (
                      <div>
                        <h4>
                          {new Intl.NumberFormat("de-DE").format(
                            Math.round(
                              Number(state?.expensesIncluded.toString())
                            )
                          )}{" "}
                          <span className="custom-rent-numbers-patrimonio">
                            €/mes
                          </span>
                        </h4>
                        {/* <p className='custom-rent-numbers-patrimonio'>€/m<sup>2</sup>/mes</p> */}
                        <p>Renta con gastos incluidos</p>
                      </div>
                    ) : null}
                    {state.monthlyRent !== 0 ? (
                      <div>
                        <h4>
                          {`${new Intl.NumberFormat("de-DE").format(
                            Math.ceil(state.monthlyRent) // <--- Agregado Math.ceil
                          )}`}{" "}
                          <span className="custom-rent-numbers-patrimonio">
                            €/m<sup>2</sup>/mes
                          </span>
                        </h4>
                        {/* <p className='custom-rent-numbers-patrimonio'>€/m<sup>2</sup></p> */}
                        <p>Renta</p>
                      </div>
                    ) : null}
                    {state.expenses !== 0 ? (
                      <div>
                        <h4>
                          {`${new Intl.NumberFormat("de-DE").format(
                            Math.ceil(state.expenses)
                          )}`}{" "}
                          <span className="custom-rent-numbers-patrimonio">
                            €/m<sup>2</sup>/mes
                          </span>
                        </h4>
                        {/* <p className='custom-rent-numbers-patrimonio'>€/m<sup>2</sup>/mes</p> */}
                        <p>Gastos</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null
            )}
            {state.description.web !== "" ? (
              <div className="patrimonialItem__description__web">
                {state.images.media && state.images.media !== "" ? (
                  <DisplayVideo
                    videoUrl={state.images.media}
                    portraitImage={state.images.main.replaceAll(" ", "%20")}
                  />
                ) : null}

                <h2>Descripción</h2>
                {/* <p>{state.description.web}</p> */}
                <textarea
                  spellCheck="false"
                  disabled
                  value={state.description.web}
                />
              </div>
            ) : null}
            <div className="patrimonialItem__description__distribution">
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
              <div className="patrimonialItem__description__distribution__buttons">
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
                {/* SI CAMBIA LA URL DE RESIDENTIALITEM HAY QUE CAMBIAR ESTE PATH TAMBIEN */}
                {state !== null && id !== undefined && (
                  <QRGenerator
                    urlString={`https://gvre.es/patrimonialItem/${state._id}`}
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
            <div className="patrimonialItem__description__numbers">
              <div>
                {state.plotSurface !== 0 ? (
                  <div className="patrimonialItem__description__numbers__build">
                    <p className="patrimonialItem__description__numbers__build__data">
                      {state.plotSurface}
                    </p>
                    <p>
                      m<sup>2</sup> de parcela.
                    </p>
                  </div>
                ) : null}
                {state.buildSurface !== 0 ? (
                  <div className="patrimonialItem__description__numbers__build">
                    <p className="patrimonialItem__description__numbers__build__data">
                      {state.buildSurface}
                    </p>
                    <p>
                      m<sup>2</sup> construidos
                    </p>
                  </div>
                ) : null}
                {state.quality.parking !== 0 ? (
                  <div className="patrimonialItem__description__numbers__bed">
                    <p className="patrimonialItem__description__numbers__bed__data">
                      {state.quality.parking}
                    </p>
                    <p>Plazas de garaje</p>
                  </div>
                ) : null}
                {state.quality.jobPositions !== 0 ? (
                  <div className="patrimonialItem__description__numbers__bed">
                    <p className="patrimonialItem__description__numbers__bed__data">
                      {state.quality.jobPositions}
                    </p>
                    <p>Puestos de trabajo</p>
                  </div>
                ) : null}
              </div>
              <div>
                {state.floor !== "" ? (
                  <div className="patrimonialItem__description__numbers__bed">
                    <p className="patrimonialItem__description__numbers__bed__data custom-numbers-size">
                      {state.floor}
                    </p>
                    <p>Planta</p>
                  </div>
                ) : null}
                {state.disponibility !== "" ? (
                  <div className="patrimonialItem__description__numbers__bath">
                    <p className="patrimonialItem__description__numbers__bath__data custom-numbers-size">
                      {state.disponibility}
                    </p>
                    <p>Disponibilidad</p>
                  </div>
                ) : null}
              </div>
              <div>
                {state.ibi.ibiValue !== 0 && state.ibi.ibiShowOnWeb === true ? (
                  <div className="patrimonialItem__description__numbers__bed">
                    <p className="patrimonialItem__description__numbers__bed__data">
                      {state.ibi.ibiValue}
                    </p>
                    <p>IBI €/año</p>
                  </div>
                ) : null}
                {state.communityExpenses.expensesValue !== 0 &&
                state.communityExpenses.expensesShowOnWeb === true ? (
                  <div className="patrimonialItem__description__numbers__bed">
                    <p className="patrimonialItem__description__numbers__bed__data">
                      {state.communityExpenses.expensesValue}
                    </p>
                    <p>Gastos de comunidad €/mes</p>
                  </div>
                ) : null}
                {state.trashFee.trashFeeValue !== 0 &&
                state.trashFee.trashFeeValue !== "" &&
                state.trashFee.trashFeeValue !== undefined &&
                state.trashFee.trashFeeShowOnWeb === true ? (
                  <div className="patrimonialItem__description__numbers__bed">
                    <p className="patrimonialItem__description__numbers__bed__data">
                      {state.trashFee.trashFeeValue}
                    </p>
                    <p>Tasa de basuras €/año</p>
                  </div>
                ) : null}
              </div>
            </div>
            {state.surfacesBox.length !== 0 ? (
              <div className="patrimonialItem__description__surfaceTable">
                <h3>Cuadro de superficies</h3>
                <div className="patrimonialItem__description__surfaceTable__table">
                  <table>
                    <tbody>
                      <tr className="patrimonialItem__description__surfaceTable__table__titles">
                        <td>Planta</td>
                        <td>Uso</td>
                        <td>
                          m<sup>2</sup>
                        </td>
                        <td>Precio</td>
                        <td>Disponibilidad</td>
                      </tr>
                      {state.surfacesBox.map((item, i) => (
                        <tr key={i}>
                          <td>{item.surfaceFloor}</td>
                          <td>{item.surfaceUse}</td>
                          <td>{item.metersAvailables}</td>
                          <td>{item.metersPrice}</td>
                          <td>{item.surfaceDisponibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
            <div className="patrimonialItem__description__extras">
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
            {state.quality.subway !== "" && state.quality.bus !== "" ? (
              <div className="patrimonialItem__description__transport">
                <div>
                  {state.quality.subway !== "" ? (
                    <div className="patrimonialItem__description__transport__bed">
                      <div>
                        <Image width={30} height={30} src={metroIcon} alt="" />
                        <p>Metro -</p>
                        <p className="patrimonialItem__description__transport__bed__data ">
                          {state.quality.subway.replace(",", " -")}
                        </p>
                      </div>
                    </div>
                  ) : null}
                  {state.quality.bus !== "" ? (
                    <div className="patrimonialItem__description__transport__bed">
                      <div>
                        <Image width={30} height={30} src={busIcon} alt="" />
                        <p>Autobús</p>
                        <p className="patrimonialItem__description__transport__bed__data ">
                          {state.quality.bus}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="patrimonialItem__wrapper">
              <div className="patrimonialItem__description__owner">
                {consultant !== undefined ? (
                  <div
                    key={consultant._id}
                    className="patrimonialItem__description__owner__details"
                  >
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
              <div className="patrimonialItem__description__form">
                {viewForm === true ? (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={sendEmail}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form
                        ref={form}
                        className="patrimonialItem__description__form__inputs"
                      >
                        <div className="patrimonialItem__description__form__wrapper">
                          <div className="patrimonialItem__description__form__wrapper__name">
                            <div className="patrimonialItem__description__form__wrapper__name__position">
                              <label className="patrimonialItem__description__form__label">
                                NOMBRE
                              </label>
                              <Field placeholder="Escriba aquí" name="nombre" />
                              {errors.nombre && touched.nombre ? (
                                <div>{errors.nombre}</div>
                              ) : null}
                            </div>
                            <div className="patrimonialItem__description__form__wrapper__name__position">
                              <label className="patrimonialItem__description__form__label">
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
                          <div className="patrimonialItem__description__form__wrapper__contact">
                            <div className="patrimonialItem__description__form__wrapper__contact__position">
                              <label className="patrimonialItem__description__form__label">
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
                            <div className="patrimonialItem__description__form__wrapper__contact__position">
                              <label className="patrimonialItem__description__form__label">
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
                        <div className="patrimonialItem__description__form__wrapper__position">
                          <label className="patrimonialItem__description__form__label">
                            MENSAJE
                          </label>
                          <Field placeholder="Escriba aquí" name="mensaje" />
                          <p>
                            Al compartir sus datos, está aceptando nuestros
                            términos de uso y privacidad.
                          </p>
                        </div>
                        <div className="patrimonialItem__description__form__wrapper__position__reference">
                          <label className="patrimonialItem__description__form__label">
                            Referencia
                          </label>
                          <Field name="referencia" value={state.adReference} />
                        </div>
                        <button
                          className="patrimonialItem__description__form__button"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Enviar{" "}
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
                  <div className="patrimonialItem__description__form__return">
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
            <div className="patrimonialItem__description__filter"></div>
            <div className="patrimonialItem__description__locationMap">
              <MapWithNoSSR lat={latitude} lng={longitude} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// =========================================================
// SERVIDOR - PATRIMONIAL
// =========================================================
export async function getServerSideProps(context) {
  if (context.query !== "carousel.css" && context.query !== undefined) {
    const { id } = context.query;
    const list = await getPatrimonialItem(id);
    const item = list && list.length > 0 ? list[0] : null;

    if (item !== null) {
      // 1. Consultor
      let currentConsultant = {};
      if (item._id === id) {
        const itemConsultants = await getConsultants();
        currentConsultant = itemConsultants.find(
          (consultant) => consultant._id === item.consultant
        );
      }

      // 2. SEO LÓGICA
      const DOMAIN = "https://gvre.es";
      let seoTitle = item.title || "Grandes Viviendas - Patrimonio";
      let seoDesc = "Oportunidad de inversión";
      let seoImage = `${DOMAIN}/favicon.ico`;

      // Precios
      let preciosTexto = [];
      if (
        item.adType?.includes("Venta") &&
        item.sale?.saleShowOnWeb &&
        item.sale?.saleValue > 0
      ) {
        preciosTexto.push(
          `${new Intl.NumberFormat("de-DE").format(
            Math.ceil(item.sale.saleValue)
          )} €`
        );
      }
      if (
        item.adType?.includes("Alquiler") &&
        item.rent?.rentShowOnWeb &&
        item.rent?.rentValue > 0
      ) {
        preciosTexto.push(
          `${new Intl.NumberFormat("de-DE").format(
            Math.ceil(item.rent.rentValue)
          )} €/mes`
        );
      }
      const precioFinal =
        preciosTexto.length > 0 ? preciosTexto.join(" | ") : "Consultar";
      const subtitleClean = (item.webSubtitle || "").replace(/"/g, "'");
      seoDesc = `${precioFinal} - ${subtitleClean}`;

      // IMAGEN OPTIMIZADA
      if (item.images?.main) {
        const rawImage = item.images.main;
        if (rawImage.startsWith("http")) {
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
    }
  } else {
    return { props: {} };
  }
}
