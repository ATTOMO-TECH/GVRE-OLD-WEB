import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ContactInfo from "../components/ContactInfo/ContactIndex";
import desarrollos from "../assets/context/arquit.png";
import arquitectura from "../assets/context/cabecera.jpg";
import clientes from "../assets/context/users.svg";
import settings from "../assets/context/settings.svg";
import text from "../assets/context/file-text.svg";
import search from "../assets/context/search.svg";
import Image from "next/image";
import useWindowSize from "../hooks/useWindowsSize";
import { getWebData } from "../api-requests/requests";

export default function Services() {
  const size = useWindowSize();
  const [webData, setWebData] = useState({});
  const [interiorims, setInteriorimsImage] = useState("");
  const [development, setDevelopmentImage] = useState("");
  const [developmentDescription, setDevelopmentDescription] = useState([]);
  const [interiorismDescription, setInteriorimsDescription] = useState([]);

  async function fetchGetWebData() {
    const webData = await getWebData();
    setWebData(webData[0]);
    // console.log(webData[0]);
    const interiorismArray =
      webData[0].services.interiorims.description.split("\n");
    // console.log(interiorismArray);
    setInteriorimsDescription(interiorismArray);
    const developmentArray =
      webData[0].services.development.description.split("\n");
    // console.log(developmentArray);
    setDevelopmentDescription(developmentArray);
    setInteriorimsImage(webData[0].services.interiorims.image);
    setDevelopmentImage(webData[0].services.development.image);
  }
  useEffect(() => {
    fetchGetWebData();
  }, []);

  return (
    <div className="contextual">
      <Header />
      <div className="contextual__comercializacion">
        <h2>{webData?.services?.commercialization?.title}</h2>
        <p>{webData?.services?.commercialization?.description1}</p>
        <p>{webData?.services?.commercialization?.description2}</p>
        <div className="contextual__comercializacion__list">
          <div className="contextual__comercializacion__list__item">
            <p className="contextual__comercializacion__list__item__number">
              1
            </p>
            <p className="contextual__comercializacion__list__item__text">
              {webData?.services?.commercialization?.sections[0]}
            </p>
          </div>
          <div className="contextual__comercializacion__list__item">
            <p className="contextual__comercializacion__list__item__number">
              2
            </p>
            <p className="contextual__comercializacion__list__item__text">
              {webData?.services?.commercialization?.sections[1]}
            </p>
          </div>
          <div className="contextual__comercializacion__list__item">
            <p className="contextual__comercializacion__list__item__number">
              3
            </p>
            <p className="contextual__comercializacion__list__item__text">
              {webData?.services?.commercialization?.sections[2]}
            </p>
          </div>
        </div>
      </div>
      <div id="inversion" className="contextual__inversion">
        <h2>{webData?.services?.investment?.title}</h2>
        <p>{webData?.services?.investment?.description}</p>
        <div className="contextual__inversion__list">
          <div className="contextual__inversion__list__item">
            <p>{webData?.services?.investment?.sections[0]}</p>
          </div>
          <div className="contextual__inversion__list__item">
            <p>{webData?.services?.investment?.sections[1]}</p>
          </div>
          <div className="contextual__inversion__list__item">
            <p>{webData?.services?.investment?.sections[2]}</p>
          </div>
          <div className="contextual__inversion__list__item">
            <p>{webData?.services?.investment?.sections[3]}</p>
          </div>
          <div className="contextual__inversion__list__item">
            <p>{webData?.services?.investment?.sections[4]}</p>
          </div>
          <div className="contextual__inversion__list__item">
            <p>{webData?.services?.investment?.sections[5]}</p>
          </div>
        </div>
      </div>
      <div id="gestion" className="contextual__gestion">
        <h2>{webData?.services?.assetManagement?.title}</h2>
        <div className="contextual__gestion__list">
          <div className="contextual__gestion__list__item">
            <p>{webData?.services?.assetManagement?.description1}</p>
            <Image width={83} height={83} src={clientes} alt="icono clientes" />
          </div>
          <div className="contextual__gestion__list__item">
            <p>{webData?.services?.assetManagement?.description2}</p>
            <Image width={83} height={83} src={search} alt="icono lupa" />
          </div>
          <div className="contextual__gestion__list__item">
            <p>{webData?.services?.assetManagement?.description3}</p>
            <Image
              width={83}
              height={83}
              src={settings}
              alt="icono engranaje"
            />
          </div>
          <div className="contextual__gestion__list__item">
            <p>{webData?.services?.assetManagement?.description4}</p>
            <Image width={83} height={83} src={text} alt="icono texto" />
          </div>
        </div>
      </div>
      <div id="desarrollos" className="contextual__nuevos">
        <h2>{webData?.services?.development?.title}</h2>
        {developmentDescription.map((dev, i) => (
          <p key={i}>{dev}</p>
        ))}
        <Image
          width={size < 770 ? 300 : size < 1350 ? 400 : 624}
          height={size < 770 ? 300 : size < 1350 ? 400 : 578}
          src={development}
          alt="imagen desarrollos"
        />
      </div>
      <div id="arquitectura" className="contextual__arquitectura">
        <div>
          <h2>{webData?.services?.interiorims?.title}</h2>
          {interiorismDescription.map((dev, i) => (
            <p key={i}>{dev}</p>
          ))}
        </div>
        <Image
          width={890}
          height={655}
          src={interiorims}
          alt="imagen interior"
        />
      </div>
      <ContactInfo webData={webData} />
    </div>
  );
}
