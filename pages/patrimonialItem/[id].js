import React, { useContext, useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router.js";
import { Carousel } from "react-responsive-carousel";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Geocode from "react-geocode";
import emailjs from "emailjs-com";
import useWindowSize from "../../hooks/useWindowsSize.js";
import {
  getConsultants,
  getPatrimonialItem,
} from "../../api-requests/requests.js";
import Image from "next/image.js";
import Header from "../../components/Header/Header";
import MapItem from "../../components/MapItem/MapItem";
import DisplayVideo from "../../components/DisplayVideo/DisplayVideo";
import fullScreen from "../../assets/SVG/mobile/comun/pantallaCompleta.svg";
import closeFullScreen from "../../assets/SVG/mobile/comun/cerrarCompleta.svg";
import check from "../../assets/SVG/mobile/comun/check.svg";
import send from "../../assets/SVG/mobile/comun/flechaEnviar.svg";
import busIcon from "../../assets/SVG/mobile/comun/bus-icon.svg";
import metroIcon from "../../assets/SVG/mobile/comun/metro-icon.svg";

const QRGenerator = dynamic(
  () => import("../../components/QRgenerator/QRgenerator"),
  {
    ssr: false,
  }
);
const DownLoadBuildingSheet = dynamic(
  () =>
    import("../../components/DownLoadBuildingSheet/DownLoadBuildingSheet.js"),
  {
    ssr: false,
  }
);

const DownLoadBuildingDrawings = dynamic(
  () => import("../../components/DownloadDrawings/DownloadDrawings.js"),
  {
    ssr: false,
  }
);

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_KEY);
Geocode.setLanguage("es");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

export default function PatrimonialItem({ list, currentConsultant }) {
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
  //Redirección a la home si el inmueble está inactivo
  useEffect(() => {
    if (
      list[0].adStatus !== "Activo" ||
      list[0].gvOperationClose === "Alquilado" ||
      list[0].gvOperationClose === "Vendido"
    )
      router.push("/");
  }, [list, router]);


  useEffect(() => {
    Geocode.fromAddress(
      `${state.adDirection.address.street} 
      ${state.adDirection.address.directionNumber}, 
      ${state.adDirection.city}`
    ).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat + 0.0013);
        setLongitude(lng + 0.0013);
      },
      (error) => {
        console.error('ERROR', error);
      }
    );
  }, [list, state]);

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, []);

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

  const sendEmail = (e) => {
    emailjs
      .sendForm("gmail", "template_zpo7p8a", form.current, "d0RpjhV6JfLsc5KLH")
      .then(
        (result) => {
          setViewForm(!viewForm);
          return result;
        },
        (error) => {
          alert(
            "El email no se ha podido enviar correctamente, intentelo de nuevo más tarde, disculpe las molestias."
          );
          return error;
        }
      );
  };

  const toggleForm = () => {
    setViewForm(!viewForm);
  };

  useEffect(() => {
    const textarea1 = document.getElementsByTagName("textarea");
    //console.log(textarea)
    const textareaArr1 = Array.from(textarea1);
    //console.log(textareaArr1)
    if (textareaArr1 !== undefined) {
      setTextareaArr(textareaArr1);
      textareaArr1?.forEach((elemento) => {
        //console.log('elemento:',elemento)
        elemento.style.height = `${elemento.scrollHeight}px`;
      });
    }
  }, []);

  useEffect(() => {
    const setTextAreaRows = () => {
      let scrollHeight = 0;
      textareaArr.forEach((elemento) => {
        //setTextAreaHeight(elemento.scrollHeight);
        //console.log('elemento:',elemento.scrollHeight);
        //console.log('elemento:',elemento.scrollHeight);
        //console.log('elemento:',textAreaHeight);
        if (elemento.scrollHeight > scrollHeight) {
          scrollHeight = elemento.scrollHeight;
        }
      });
      //console.log(Math.ceil(scrollHeight/20))
      return Math.ceil(scrollHeight / 20);
    };
    window.addEventListener("resize", setTextAreaRows);
  }, [textareaArr]);

  return (
    <div className="patrimonialItem">
      {state?.images ? (
        <div>
          <Header />
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
                <h2 className="patrimonialItem__description__principal__prices">
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
                    {state.expensesIncluded !== 0 ? (
                      <div>
                        <h4>
                          {`${new Intl.NumberFormat("de-DE").format(
                            Math.round(state.expensesIncluded)
                          )}`}{" "}
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
                            state.monthlyRent
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
                            state.expenses
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
                  Altura libre 2.5m
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
              <MapItem lat={latitude} lng={longitude} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export async function getServerSideProps(context) {
  //console.log("context",context)

  if (context.query !== "carousel.css" && context.query !== undefined) {
    const { id } = context.query;
    //console.log('query id',id)
    const list = await getPatrimonialItem(id);
    //console.log('lista', list.length)
    const item = list[0];
    // console.log("lista", list);
    // console.log("objeto", item);
    if (item !== null) {
      const buildingId = item._id;
      //console.log('_id',_id)
      let currentConsultant = {};
      if (buildingId === id) {
        const itemConsultants = await getConsultants();
        currentConsultant = itemConsultants.find(
          (consultant) => consultant._id === item.consultant
        );
      }
      return {
        props: {
          list,
          currentConsultant,
        },
      };
    }
  } else {
    return {
      props: {},
    };
  }
}
