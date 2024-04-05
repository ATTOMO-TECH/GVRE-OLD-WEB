import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header/Header";
// import { catalogs } from "../constants/globalconstants";
import CatalogCard from "../components/CatalogCard/catalog-card";
import FullScreenPDF from "../components/CatalogModal/catalof-modal";
import { getCatalogs, getMainImageCatalog } from "../api-requests/requests";

const CatalogPDF = dynamic(
  () => import("../components/catalog-pdf/catalog-pdf"),
  {
    ssr: false,
  }
);

export default function Catalog() {
  const [displayFullScren, setDisplayFullScren] = useState(false);
  const [number, setNumber] = useState(1);
  const [catalogs, setCatalogs] = useState([]);
  const [mainImageCatalog, setMainImageCatalog] = useState([]);

  async function fetchGetCatalogs() {
    const allCatalogs = await getCatalogs();
    setCatalogs(allCatalogs);
    const sortedCatalog = allCatalogs.sort(function sortCatalog(a, b) {
      return b.year - a.year;
    });
  }

  const fetchMainImageCatalog = async () => {
    const image = await getMainImageCatalog();
    setMainImageCatalog(image);
  };

  useEffect(() => {
    fetchGetCatalogs();
    window.scroll({ top: 0 });
  }, []);

  useEffect(() => {
    fetchMainImageCatalog();
  }, []);

  return (
    <div className="catalogo__main__container">
      <div
        className="catalogo__main__container__banner"
        style={{
          backgroundImage: `url(${mainImageCatalog[0]?.imgSection})`,
        }}
      >
        <div
          style={{
            height: "97px",
            backgroundColor: "rgba(255, 255, 255, 0.623)",
            zIndex: "1000",
          }}
        >
          <Header />
        </div>
        {catalogs.length !== 0 && (
          <CatalogPDF
            catalogs={catalogs}
            catalogNumber={number}
            displayFullScren={displayFullScren}
            setDisplayFullScren={setDisplayFullScren}
          />
        )}
      </div>
      <div className="catalogo__main__container__text">
        <h3>Catálogos</h3>
        <p>
          Consulta nuestros catálogos y descubre las casas del sector
          residencial de lujo de GV Real Estate
        </p>
      </div>
      <div className="catalogo__main__container__catalogs">
        {catalogs.map((cat, i) => (
          <CatalogCard
            key={i}
            index={i}
            setCatalogNumber={setNumber}
            cardData={cat}
          />
        ))}
      </div>
      <FullScreenPDF
        catalogs={catalogs}
        catalogNumber={number}
        displayFullScren={displayFullScren}
        setDisplayFullScren={setDisplayFullScren}
      />
    </div>
  );
}
