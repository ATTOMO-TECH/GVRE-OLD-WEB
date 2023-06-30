import React, { useEffect, useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import routes from "../../config/routes";
//import { Link, generatePath, NavLink} from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import { generalContext } from "../../providers/generalProvider";
import Header from "../../components/Header/Header";
import { getPatrimonial } from "../../api-requests/requests";
import { getZoneId } from "../../globalFunctions/MapZones/MapZones";
import { PricesSliders } from "../../styles/sliders-style";
import ContactIndex from "../../components/ContactInfo/ContactIndex";

import parking from "../../assets/SVG/web/anuncios/anuncios_garaje.svg";
import job from "../../assets/SVG/web/anuncios/anuncios_trabajo.svg";
import refer from "../../assets/SVG/mobile/anuncios/anuncios_referencia.svg";
import sup from "../../assets/SVG/web/anuncios/anuncios_superficieP.svg";
import filterImg from "../../assets/SVG/mobile/comun/iconoFiltros.svg";
import order from "../../assets/SVG/mobile/comun/flechaOrdenar.svg";
import zoneMap from "../../assets/SVG/mobile/anuncios/anuncios_mapa.svg";
import lupa from "../../assets/SVG/mobile/comun/filtros_lupa.svg";
import carretera1 from "../../assets/maps/mapaR/carreteras/carretera1.svg";
import carretera2 from "../../assets/maps/mapaR/carreteras/carretera2.svg";
import carretera3 from "../../assets/maps/mapaR/carreteras/carretera3.svg";
import carretera4 from "../../assets/maps/mapaR/carreteras/carretera4.svg";
import carretera5 from "../../assets/maps/mapaR/carreteras/carretera5.svg";
import carretera6 from "../../assets/maps/mapaR/carreteras/carretera6.svg";
import carretera62 from "../../assets/maps/mapaR/carreteras/carretera6-2.svg";
import carretera7 from "../../assets/maps/mapaR/carreteras/carretera7.svg";
import carretera8 from "../../assets/maps/mapaR/carreteras/carretera8.svg";
import carretera9 from "../../assets/maps/mapaP/c9.svg";
import carretera10 from "../../assets/maps/mapaP/c10.svg";
import plan1 from "../../assets/maps/mapaP/plan1.svg";
import plan2 from "../../assets/maps/mapaP/plan2.svg";
import vald from "../../assets/maps/mapaP/vald.svg";
import pozu from "../../assets/maps/mapaP/pozu.svg";
import pe from "../../assets/maps/mapaP/pe.svg";
import secu from "../../assets/maps/mapaP/secu.svg";
import ctba1 from "../../assets/maps/mapaP/ctba1.svg";
import ctba2 from "../../assets/maps/mapaP/ctba2.svg";
import cuzco1 from "../../assets/maps/mapaP/cuzco1.svg";
import cuzco2 from "../../assets/maps/mapaP/cuzco2.svg";
import azca from "../../assets/maps/mapaP/azca.svg";
import cham from "../../assets/maps/mapaP/cham.svg";
import alma from "../../assets/maps/mapaP/alma.svg";
import cent from "../../assets/maps/mapaP/cent.svg";
import ceba from "../../assets/maps/mapaP/ceba.svg";
import meal from "../../assets/maps/mapaP/meal.svg";
import juca from "../../assets/maps/mapaP/juca.svg";
import amer from "../../assets/maps/mapaP/amer.svg";
import amer2 from "../../assets/maps/mapaP/amer2.svg";
import jova from "../../assets/maps/mapaP/jova.svg";
import chama from "../../assets/maps/mapaP/chama.svg";
import arso from "../../assets/maps/mapaP/arso.svg";
import cana from "../../assets/maps/mapaP/cana.svg";
import sanchi from "../../assets/maps/mapaP/sanchi.svg";
import sanchi2 from "../../assets/maps/mapaP/sanchi2.svg";
import sanchi3 from "../../assets/maps/mapaP/sanchi3.svg";
import arva from "../../assets/maps/mapaP/arva.svg";
import arva2 from "../../assets/maps/mapaP/arva2.svg";
import jero from "../../assets/maps/mapaR/barrios/jero.svg";
import sala from "../../assets/maps/mapaR/barrios/sala.svg";
import viso from "../../assets/maps/mapaR/barrios/viso.svg";
import mayor from "../../assets/SVG/web/comunes/mayor.svg";
import cerrarFiltro from "../../assets/SVG/mobile/comun/cerrarCompleta.svg";
//import { Navigate, useNavigate} from 'react-router'
import { BarLoader, ClipLoader } from "react-spinners";
import useWindowSize from "../../hooks/useWindowsSize";

export default function Patrimonial({
  orderedItems,
  pages,
  query,
  queryFilters,
}) {
  const router = useRouter();
  const {
    tipo,
    tipodeinmueble,
    referencia,
    zona,
    exclusivooficinas,
    clasico,
    coworking,
    porfecha,
    page,
  } = query;
  const arrPages = new Array(pages).fill(null);
  const [URLwithoutPage, setURLwithoutPage] = useState([]);
  if (tipo !== undefined) URLwithoutPage.push(`tipo=${tipo}`);
  if (tipodeinmueble !== undefined)
    URLwithoutPage.push(`tipodeinmueble=${tipodeinmueble}`);
  if (referencia !== undefined) URLwithoutPage.push(`referencia=${referencia}`);
  if (zona !== undefined) URLwithoutPage.push(`zona=${zona}`);
  if (exclusivooficinas !== undefined)
    URLwithoutPage.push(`exclusivooficinas=${exclusivooficinas}`);
  if (clasico !== undefined) URLwithoutPage.push(`clasico=${clasico}`);
  if (coworking !== undefined) URLwithoutPage.push(`coworking=${coworking}`);
  if (porfecha !== undefined) URLwithoutPage.push(`porfecha=${porfecha}`);

  const [, setOrderedItems] = useState([]);
  const [, /* refItem */ setRefItem] = useState([]);
  const [perPage] = useState(30);
  const [pageNumber, setPageNumber] = useState(0);
  const [pagElements, setPagElements] = useState();

  let localFilters = "{}";
  if (typeof window !== "undefined") {
    localFilters = window.localStorage.getItem("patrimonialFilters");
  }

  const [selected, setSelected] = useState(
    localFilters?.includes("zone") ? JSON.parse(localFilters).zone : []
  );
  const [selectedActive, setSelectedActive] = useState(false);
  const [saleOrRent, setSaleOrRent] = useState(
    localFilters?.includes("adType") ? JSON.parse(localFilters).adType : []
  );
  const [saleOrRentActive, setSaleOrRentActive] = useState(false);
  const [typeHouse, setTypeHouse] = useState(
    localFilters?.includes("adBuildingType")
      ? JSON.parse(localFilters).adBuildingType
      : []
  );
  const [typeHouseActive, setTypeHouseActive] = useState(false);
  const [extras, setExtras] = useState([]);
  const [extrasActive, setExtrasActive] = useState(false);
  //const [ref, setRef] = useState('');
  const [, /* itemRef */ setItemRef] = useState("initial");
  const [maxPrice, setMaxPrice] = useState(99999999.9);
  const [price, setPrice] = useState([0, maxPrice]);
  const [maxSurface, setMaxSurface] = useState(99999999.9);
  const [surface, setSurface] = useState([0, maxSurface]);

  const [filter, setFilter] = useState(false);
  const [filters, setFilters] = useState(JSON.parse(localFilters));
  const [disableButton, setDisableButton] = useState(false);
  const [disableSliders, setDisableSliders] = useState(false);
  const [verLupa, setVerLupa] = useState(true);
  const [orderItems, setOrderItems] = useState(false);
  const [state2] = useState([]);
  const [state, setState] = useContext(generalContext);

  const [coord, setCoord] = useState(0);
  const [param, setParam] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [elementId, setElementId] = useState("");
  //const navigate = useNavigate();
  const [maxZonePrice, setMaxZonePrice] = useState(0);
  const [getMaxPrices, setGetMaxPrices] = useState(false);

  const size = useWindowSize();

  const getTypeHouse = () => {
    setParam("");
    setRedirect(false);
    const searchFilters = filterResults();
    setFilters(searchFilters);
    //window.localStorage.setItem('patrimonialFilters')
    setFilter(!filter);
  };

  const setPosition = () => {
    if (coord !== 0) {
      window.localStorage.setItem("storedPosition2", JSON.stringify(coord));
    }
  };

  //window.localStorage.getItem('totalAds')

  const pageCount = pages;
  const getPostItems = orderedItems?.map((item) => {
    return item.department === "Patrimonio" && item.showOnWeb === true ? (
      <div
        onClick={setPosition}
        className="patrimonial__list__item"
        key={item._id}
      >
        {item.gvOperationClose === "Alquilado" ||
        item.gvOperationClose === "Vendido" ? (
          <div className="wrapper">
            <div className="patrimonial__list__item__status">
              <p>{item.gvOperationClose}</p>
            </div>
            <Carousel
              className="patrimonial__list__item__images"
              showArrows={true}
              showThumbs={false}
              infiniteLoop={true}
              showStatus={false}
            >
              <Image
                width={400}
                height={300}
                src={item.images.main.replaceAll(" ", "%20")}
                alt={item.title}
                loading="lazy"
              />
              {/*{item.images.others.map((image)=> (
                                <Image key={item.title} src={image} alt={item.title}/>
                            ))}*/}
            </Carousel>
            <div>
              <div className="patrimonial__list__item__text">
                {item.adType.length === 1 ? (
                  <h2 className="patrimonial__list__item__text__price">
                    {item.adType.map((type) =>
                      type === "Venta" &&
                      item.sale.saleShowOnWeb === true &&
                      item.sale.saleValue !== 0
                        ? `${new Intl.NumberFormat("de-DE").format(
                            item.sale.saleValue
                          )} €`
                        : type === "Alquiler" &&
                          item.rent.rentShowOnWeb === true &&
                          item.rent.rentValue !== 0
                        ? `${new Intl.NumberFormat("de-DE").format(
                            item.rent.rentValue
                          )} € mes`
                        : null
                    )}
                  </h2>
                ) : (
                  <h2 className="patrimonial__list__item__text__prices">
                    {item.sale.saleShowOnWeb && item.sale.saleValue !== 0 ? (
                      <p>{`${new Intl.NumberFormat("de-DE").format(
                        item.sale.saleValue
                      )} €`}</p>
                    ) : null}
                    {item.rent.rentShowOnWeb && item.rent.rentValue !== 0 ? (
                      <p>{`${new Intl.NumberFormat("de-DE").format(
                        item.rent.rentValue
                      )} € mes`}</p>
                    ) : null}
                  </h2>
                )}
                <h2 className="patrimonial__list__item__text__title">
                  {item.title}
                </h2>
                <h3 className="patrimonial__list__item__text__street">
                  {item.webSubtitle}
                </h3>
                <ul className="patrimonial__list__item__text__characteristics">
                  {item.buildSurface !== 0 ? (
                    <li>
                      <span>
                        <Image
                          width={11}
                          height={16}
                          src={sup}
                          alt="superficie"
                        />
                      </span>
                      {item.buildSurface}m<sup>2</sup>
                    </li>
                  ) : null}
                  {item.quality.jobPositions !== 0 ? (
                    <li>
                      <span>
                        <Image
                          width={15}
                          height={12}
                          src={job}
                          alt="puestos de trabajo"
                        />
                      </span>
                      {item.quality.jobPositions}
                    </li>
                  ) : null}
                  {item.quality.parking !== 0 ? (
                    <li className="patrimonial__list__item__text__characteristics__car">
                      <span>
                        <Image
                          width={21}
                          height={12}
                          src={parking}
                          alt="plazas parking"
                        />
                      </span>
                      {item.quality.parking}
                    </li>
                  ) : null}
                  {item.adReference !== 0 ? (
                    <li>
                      <span>
                        <Image
                          width={13}
                          height={12}
                          src={refer}
                          alt="referencia"
                        />
                      </span>
                      <p> Ref {item.adReference}</p>
                    </li>
                  ) : null}
                </ul>
                <div className="patrimonial__list__item__text__blocker"></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* {isLoading ? */}
            <Carousel
              className="patrimonial__list__item__images"
              showArrows={true}
              showThumbs={false}
              infiniteLoop={true}
              showStatus={false}
            >
              <Image
                width={400}
                height={300}
                src={item.images.main.replaceAll(" ", "%20")}
                alt={item.title}
                loading="lazy"
              />
              {/*{item.images.others.map((image)=> (
                                <Image key={item.title} src={image} alt={item.title}/>
                            ))}*/}
            </Carousel>
            {/* :<div className='spinnerBar'>  
                            <BarLoader color="#000000" width='80px' height='2px' className='barloader'/>
                        </div> */}

            <Link
              onClick={() => {
                setState({ item: item });
              }}
              href={`${routes.ItemPatrimonial}/${item._id}`}
            >
              <div className="patrimonial__list__item__text">
                {item.adType.length === 1 ? (
                  <h2 className="patrimonial__list__item__text__price">
                    {item.adType.map((type) =>
                      type === "Venta" && item.sale.saleShowOnWeb
                        ? `${new Intl.NumberFormat("de-DE").format(
                            item.sale.saleValue
                          )} €`
                        : type === "Alquiler" && item.rent.rentShowOnWeb
                        ? `${new Intl.NumberFormat("de-DE").format(
                            item.rent.rentValue
                          )} € mes`
                        : null
                    )}
                  </h2>
                ) : (
                  <h2 className="patrimonial__list__item__text__prices">
                    {item.sale.saleShowOnWeb ? (
                      <p>{`${new Intl.NumberFormat("de-DE").format(
                        item.sale.saleValue
                      )} €`}</p>
                    ) : null}
                    {item.rent.rentShowOnWeb ? (
                      <p>{`${new Intl.NumberFormat("de-DE").format(
                        item.rent.rentValue
                      )} € mes`}</p>
                    ) : null}
                  </h2>
                )}
                <h2 className="patrimonial__list__item__text__title">
                  {item.title}
                </h2>
                <h3 className="patrimonial__list__item__text__street">
                  {item.webSubtitle}
                </h3>
                <ul className="patrimonial__list__item__text__characteristics">
                  {item.buildSurface !== 0 ? (
                    <li>
                      <span>
                        <Image
                          width={11}
                          height={16}
                          src={sup}
                          alt="superficie"
                        />
                      </span>
                      {item.buildSurface}m<sup>2</sup>
                    </li>
                  ) : null}
                  {item.quality.jobPositions !== 0 ? (
                    <li>
                      <span>
                        <Image
                          width={15}
                          height={12}
                          src={job}
                          alt="puestos de trabajo"
                        />
                      </span>
                      {item.quality.jobPositions}
                    </li>
                  ) : null}
                  {item.quality.parking !== 0 ? (
                    <li className="patrimonial__list__item__text__characteristics__car">
                      <span>
                        <Image
                          width={21}
                          height={12}
                          src={parking}
                          alt="plazas parking"
                        />
                      </span>
                      {item.quality.parking}
                    </li>
                  ) : null}
                  {item.adReference !== 0 ? (
                    <li>
                      <span>
                        <Image
                          width={13}
                          height={12}
                          src={refer}
                          alt="referencia"
                        />
                      </span>
                      <p>Ref {item.adReference}</p>
                    </li>
                  ) : null}
                </ul>
                <div className="patrimonial__list__item__text__clickable"></div>
              </div>
            </Link>
          </div>
        )}
      </div>
    ) : null;
  });

  useEffect(() => {
    if (state.length >= 1) {
      let reducedState = [];
      state.map((item) =>
        item.department === "Patrimonio" && item.showOnWeb === true
          ? reducedState.push(item)
          : null
      );
      if (typeof window !== "undefined")
        window.localStorage.setItem(
          "storedState",
          JSON.stringify(reducedState)
        );
    }
  }, [state]);

  useEffect(() => {
    let extrasLocal = [];
    if (localFilters?.includes("exclusiveOfficeBuilding"))
      extrasLocal = [...extrasLocal, "exclusiveOfficeBuilding"];
    if (localFilters?.includes("classicBuilding"))
      extrasLocal = [...extrasLocal, "classicBuilding"];
    if (localFilters?.includes("coworking"))
      extrasLocal = [...extrasLocal, "coworking"];
    setExtras(extrasLocal);
  }, [localFilters]);

  useEffect(() => {
    const localState = window.localStorage.getItem("storedState");
    if (localState) {
      const patrimonialItems = JSON.parse(localState);
      setOrderedItems(patrimonialItems);
    }
  }, [state]);

  useEffect(() => {
    let splitedLocation = window.location.href.split("/");
    let elements = [];
    setPageNumber(parseInt(splitedLocation[4]) - 1);
    for (let i = 0; i < pageCount; i++) {
      if (URLwithoutPage.length !== 0) {
        const URL = URLwithoutPage.join("&");
        elements.push(
          <li
            key={i}
            className={
              i + 1 === parseInt(splitedLocation[4])
                ? "patrimonial__pagination__list__item currentPage"
                : "patrimonial__pagination__list__item"
            }
          >
            <a href={`/patrimonial/${i + 1}?${URL}&page=${i + 1}`}>{i + 1}</a>
          </li>
        );
      } else {
        elements.push(
          <li
            key={i}
            className={
              i + 1 === parseInt(splitedLocation[4])
                ? "patrimonial__pagination__list__item currentPage"
                : "patrimonial__pagination__list__item"
            }
          >
            <a href={`/patrimonial/${i + 1}?page=${i + 1}`}>{i + 1}</a>
          </li>
        );
      }
    }
    setPagElements(elements);
  }, [URLwithoutPage, pageCount]);

  useEffect(() => {
    if (
      selectedActive === true ||
      saleOrRentActive === true ||
      typeHouseActive === true ||
      extrasActive === true ||
      elementId !== "" /* || surface[0] !== 0.1 || surface[1] !== 99999999.9 */
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [
    elementId,
    selectedActive,
    saleOrRentActive,
    typeHouseActive,
    extrasActive,
  ]);

  useEffect(() => {
    //console.log('zonas',selected)
    //console.log('venta',saleOrRent)
    //console.log('tipo',typeHouse)
    if (
      selected.length === 0 &&
      saleOrRent.length === 0 &&
      typeHouse.length === 0 &&
      extras.length === 0
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [selected, saleOrRent, typeHouse, extras]);

  useEffect(() => {
    if (state2.length > 0) {
      state2.map((itemState) => {
        if (elementId === itemState.adReference) {
          setItemRef(itemState.adReference);
          setRefItem([itemState]);
        }
        return itemState;
      });
    }
    if (elementId !== "") {
      setVerLupa(false);
    } else {
      setVerLupa(true);
    }
  }, [elementId, state2]);

  useEffect(() => {
    if (filter === true) {
      if (
        saleOrRent.length === 0 &&
        typeHouse.length === 0 &&
        extras.length === 0 &&
        selected.length === 0
      ) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
      // let label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
      if (saleOrRent.length === 1) {
        /* console.log('entro en el if cuando la longitud es 1') */
        setMaxPrice(99999999.9);
        setMaxSurface(99999999.9);
        setPrice([0, 99999999.9]);
        setSurface([0, 99999999.9]);
        if (saleOrRent[0] === "Alquiler") {
          setDisableSliders(true);
          // if (label[0].innerHTML === '0 €/mes') {
          //     label[0].innerHTML = '0 €/mes'
          // }
          // if (label[1].innerHTML === '99.999.999,9 €/mes') {
          //     label[1].innerHTML = 'max'
          // }
        }
        if (saleOrRent[0] === "Venta") {
          setDisableSliders(true);
          // if (label[0].innerHTML === '0 €') {
          //     label[0].innerHTML = '0 €'
          // }
          // if (label[1].innerHTML === '99.999.999,9 €') {
          //     label[1].innerHTML = 'max'
          // }
        }
      }
      if (saleOrRent.length === 0 || saleOrRent.length === 2) {
        setMaxPrice(99999999.9);
        setMaxSurface(99999999.9);
        setPrice([0, 99999999.9]);
        setSurface([0, 99999999.9]);
        setDisableSliders(false);
      }
      // if (label[0].innerHTML==='0 €/mes'){
      //     label[0].innerHTML='0 €/mes'
      // }
      // if (label[1].innerHTML==='99.999.999,9 €/mes'){
      //     label[1].innerHTML='max'
      // }
      // if (label[3].innerHTML==='99.999.999,9 m2'){
      //     label[3].innerHTML='max'
      // }
      // if (label[2].innerHTML==='0 m2'){
      //     label[2].innerHTML='0 m2'
      // }
    }
  }, [
    filters,
    saleOrRent,
    typeHouse,
    extras,
    selected,
    filter,
    disableSliders,
  ]);

  useEffect(() => {
    const localPosition = JSON.parse(
      window.localStorage.getItem("storedPosition2")
    );
    if (localPosition !== 0 && localPosition !== null) {
      window.scroll({
        top: localPosition - 750,
      });
    } else {
      window.scroll({ top: 0 });
    }
  }, []);

  const onPrice = () => {
    setIsLoading(false);
    if (typeof window !== "undefined") {
      let activeFilters = JSON.parse(
        window.localStorage.getItem("patrimonialFilters")
      );
      activeFilters = { ...activeFilters, orderByDate: false };
      window.localStorage.setItem(
        "patrimonialFilters",
        JSON.stringify(activeFilters)
      );
      let newquery = query;
      newquery.porfecha = "false";
      toggleOrderItems();
      navigateToNewPath(1, newquery);
    }
  };

  const onDate = () => {
    if (typeof window !== "undefined") {
      setIsLoading(false);
      let activeFilters = JSON.parse(
        window.localStorage.getItem("patrimonialFilters")
      );
      activeFilters = { ...activeFilters, orderByDate: true };
      window.localStorage.setItem(
        "patrimonialFilters",
        JSON.stringify(activeFilters)
      );
      /* console.log(activeFilters); */
      // console.log(tipo, tipodeinmueble, referencia, zona, exclusivooficinas, clasico, coworking, page)
      // console.log(typeof tipo)
      let newquery = query;
      newquery.porfecha = "true";
      toggleOrderItems();
      navigateToNewPath(1, newquery);
    }
  };

  const toggleActive = (e) => {
    if (e.currentTarget.className === e.currentTarget.id) {
      e.currentTarget.className = `${e.currentTarget.className} active`;
      const idZoneSelected = getZoneId(e.currentTarget.name);

      if (!selected.includes(`${idZoneSelected[0]}`)) {
        idZoneSelected.forEach((idZone) => selected.push(idZone));
      }
      /* console.log(selected) */
      let activeFilters = {};
      activeFilters = { ...activeFilters, zone: selected };
      activeFilters = { ...activeFilters, adType: saleOrRent };
      /* console.log(activeFilters) */
      if (saleOrRent.length === 1) {
        setGetMaxPrices(true);
        getPatrimonial(activeFilters).then((items) => {
          /* console.log(items) */
          if (items.ads.length !== 0) {
            if (saleOrRent[0] === "Venta") {
              setMaxZonePrice(items.ads[0].sale.saleValue);
            } else {
              setMaxZonePrice(items.ads[0].rent.rentValue);
            }
          } else {
            setMaxZonePrice(0);
          }
          setGetMaxPrices(false);
        });
      }
    } else {
      e.currentTarget.className = `${e.currentTarget.id}`;
      const idZoneElement = getZoneId(e.currentTarget.name);
      idZoneElement.forEach((idZone) => {
        const newSelected = selected.filter((item) => item !== idZone);
        selected.splice(0, selected.length, ...newSelected);
      });
      if (saleOrRent.length === 1) {
        setGetMaxPrices(true);
        /* console.log(selected) */
        let activeFilters = {};
        activeFilters = { ...activeFilters, zone: selected };
        activeFilters = { ...activeFilters, adType: saleOrRent };
        getPatrimonial(activeFilters).then((items) => {
          /* console.log(items) */
          if (items.ads.length !== 0) {
            if (saleOrRent[0] === "Venta") {
              setMaxZonePrice(items.ads[0].sale.saleValue);
            } else {
              setMaxZonePrice(items.ads[0].rent.rentValue);
            }
          } else {
            setMaxZonePrice(0);
          }
          setGetMaxPrices(false);
        });
      }
    }
    if (selected.length !== 0) {
      setSelectedActive(true);
    } else {
      setSelectedActive(false);
    }
    //console.log(selected)
  };

  const selectSaleOrRent = (e) => {
    if (e.currentTarget.className === e.currentTarget.id) {
      e.currentTarget.className = `${e.currentTarget.className} activeButton`;
      if (!saleOrRent.includes(`${e.currentTarget.name}`)) {
        saleOrRent.push(e.currentTarget.name);
      }
    } else {
      e.currentTarget.className = `${e.currentTarget.id}`;
      const elementName = e.currentTarget.name;
      const newSaleOrRent = saleOrRent.filter((item) => item !== elementName);
      saleOrRent.splice(0, saleOrRent.length, ...newSaleOrRent);
    }
    if (saleOrRent.length !== 0) {
      setSaleOrRentActive(true);
    } else {
      setSaleOrRentActive(false);
    }
    if (saleOrRent.length === 1) {
      setGetMaxPrices(true);
      let activeFilters = {};
      activeFilters = { ...activeFilters, zone: selected };
      activeFilters = { ...activeFilters, adType: saleOrRent };
      getPatrimonial(activeFilters).then((items) => {
        /* console.log(items) */
        if (items.ads.length !== 0) {
          if (saleOrRent[0] === "Venta") {
            setMaxZonePrice(items.ads[0].sale.saleValue);
          } else {
            setMaxZonePrice(items.ads[0].rent.rentValue);
          }
        } else {
          setMaxZonePrice(0);
        }
        setGetMaxPrices(false);
      });
      saleOrRent.map((item) => {
        if (item === "Venta") {
          setDisableSliders(true);
          let priceArray = [];
          let surfaceArray = [];
          state2.map((item) => {
            if (item.showOnWeb === true && item.department === "Patrimonio") {
              priceArray.push(item.sale.saleValue);
              surfaceArray.push(item.buildSurface);
            }
            return item;
          });
          priceArray.sort(function (a, b) {
            return b - a;
          });
          surfaceArray.sort(function (a, b) {
            return b - a;
          });
          setMaxPrice(priceArray[0]);
          setPrice([0, priceArray[0]]);
          setMaxSurface(surfaceArray[0]);
          setSurface([0, surfaceArray[0]]);
        } else if (item === "Alquiler") {
          setDisableSliders(true);
          let priceArray = [];
          let surfaceArray = [];
          state2.map((item) => {
            if (item.showOnWeb === true && item.department === "Patrimonio") {
              item.adType.map((itemType) => {
                if (itemType === "Alquiler") {
                  priceArray.push(item.rent.rentValue);
                  surfaceArray.push(item.buildSurface);
                  return itemType;
                }
                return item;
              });
            }
            return item;
          });
          priceArray.sort(function (a, b) {
            return b - a;
          });
          surfaceArray.sort(function (a, b) {
            return b - a;
          });
          setMaxPrice(priceArray[0]);
          setPrice([0, priceArray[0]]);
          setMaxSurface(surfaceArray[0]);
          setSurface([0, surfaceArray[0]]);
        }
        return item;
      });
    }
    if (saleOrRent.length === 2 || saleOrRent.length === 0) {
      setDisableSliders(!disableSliders);
      setMaxPrice(99999999.9);
      setPrice([0, 99999999.9]);
      setMaxSurface(99999999.9);
      setSurface([0, 99999999.9]);
    }
  };

  const filterResults = () => {
    if (typeof window !== "undefined") {
      //Introducir una condición que guarde los valores de los sliders
      // 1. El de precio solo si saleOrRent.lenght === 1
      // 2. El de superficie siempre
      let activeFilters = {};
      let queryFilters = {};
      if (saleOrRent.length) {
        activeFilters = { ...activeFilters, adType: saleOrRent };
        const queryAdType = saleOrRent.join("-");
        queryFilters = { ...queryFilters, tipo: queryAdType };
      }
      if (typeHouse.length) {
        activeFilters = { ...activeFilters, adBuildingType: typeHouse };
        const queryAdBuildingType = typeHouse.join("-");
        queryFilters = { ...queryFilters, tipodeinmueble: queryAdBuildingType };
      }
      if (elementId) {
        activeFilters = { ...activeFilters, adReference: elementId };
        queryFilters = { ...queryFilters, referencia: elementId };
      }
      if (selected.length > 0) {
        /* const selectedIds = getZoneId(selected) */
        activeFilters = { ...activeFilters, zone: selected };
        /* console.log(selectedIds) */
        const querySelected = selected.join("-");
        queryFilters = { ...queryFilters, zona: querySelected };
      }
      if (extras.length) {
        if (extras.includes("exclusiveOfficeBuilding")) {
          activeFilters = { ...activeFilters, exclusiveOfficeBuilding: true };
          queryFilters = { ...queryFilters, exclusivooficinas: true };
        }

        if (extras.includes("classicBuilding")) {
          activeFilters = { ...activeFilters, classicBuilding: true };
          queryFilters = { ...queryFilters, clasico: true };
        }

        if (extras.includes("coworking")) {
          activeFilters = { ...activeFilters, coworking: true };
          queryFilters = { ...queryFilters, coworking: true };
        }
      }
      if (saleOrRent.length === 1) {
        if (saleOrRent[0] === "Venta") {
          activeFilters = { ...activeFilters, maxSalePrice: price[1] };
          activeFilters = { ...activeFilters, minSalePrice: price[0] };
          queryFilters = { ...queryFilters, precioventamax: price[1] };
          queryFilters = { ...queryFilters, precioventamin: price[0] };
        } else {
          activeFilters = { ...activeFilters, maxRentPrice: price[1] };
          activeFilters = { ...activeFilters, minRentPrice: price[0] };
          queryFilters = { ...queryFilters, precioalquilermax: price[1] };
          queryFilters = { ...queryFilters, precioalquilermin: price[0] };
        }
      }
      if (surface) {
        activeFilters = { ...activeFilters, minSurface: surface[0] };
        activeFilters = { ...activeFilters, maxSurface: surface[1] };
        queryFilters = { ...queryFilters, superficiemin: surface[0] };
        queryFilters = { ...queryFilters, superficiemax: surface[1] };
      }
      /* console.log(activeFilters) */
      window.localStorage.setItem(
        "patrimonialFilters",
        JSON.stringify(activeFilters)
      );
      if (porfecha !== undefined)
        queryFilters = { ...queryFilters, porfecha: "false" };
      navigateToNewPath(1, queryFilters);
    }
  };

  const addType = (e) => {
    if (e.currentTarget.className === e.currentTarget.id) {
      e.currentTarget.className = `${e.currentTarget.className} activeButton`;
      if (!typeHouse.includes(`${e.currentTarget.className}`)) {
        typeHouse.push(e.currentTarget.name);
      }
    } else {
      e.currentTarget.className = `${e.currentTarget.id}`;
      const elementName = e.currentTarget.name;
      const newType = typeHouse.filter((item) => item !== elementName);
      typeHouse.splice(0, typeHouse.length, ...newType);
    }
    if (typeHouse.length !== 0) {
      setTypeHouseActive(true);
    } else {
      setTypeHouseActive(false);
    }
  };

  const addExtra = (e) => {
    if (e.currentTarget.className === e.currentTarget.id) {
      e.currentTarget.className = `${e.currentTarget.className} activeButton`;
      if (!extras.includes(`${e.currentTarget.className}`)) {
        extras.push(e.currentTarget.name);
      }
    } else {
      e.currentTarget.className = `${e.currentTarget.id}`;
      const elementName = e.currentTarget.name;
      const newExtra = extras.filter((item) => item !== elementName);
      extras.splice(0, extras.length, ...newExtra);
    }
    if (extras.length !== 0) {
      setExtrasActive(true);
    } else {
      setExtrasActive(false);
    }
  };

  const handlePriceInput = (e, data1) => {
    setPrice(data1);
  };
  const handleSurfaceInput = (e, data2) => {
    setSurface(data2);
  };
  const addRef = (e) => {
    setElementId(e.currentTarget.value);
  };

  const toggleFilter = () => {
    setFilter(!filter);
  };

  const toggleOrderItems = () => {
    setOrderItems(!orderItems);
  };
  if (typeof window !== "undefined") {
    window.onmousemove = function (e) {
      const y = e.pageY;
      setCoord(y);
    };
  }

  const deletePosition = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("storedPosition2");
    }
  };
  const removeFilterOptions = () => {
    if (typeof window !== "undefined") {
      //1. Iniciar todas las variables a vacías
      setSelected([]);
      setSaleOrRent([]);
      setTypeHouse([]);
      setExtras([]);
      setElementId("");
      setSelectedActive(false);
      setSaleOrRentActive(false);
      setTypeHouseActive(false);
      setExtrasActive(false);
      //2. Restablecer los filtros en el local storage
      window.localStorage.setItem("patrimonialFilters", JSON.stringify({}));
      //3. Eliminar las clases active y activeButton de todos los elementos
      const collectionButtons = document.getElementsByClassName("activeButton");
      const collectionButtonsArr = Array.from(collectionButtons);
      /* console.log(collectionButtonsArr); */
      /* console.log(collectionButtonsArr.length); */
      if (collectionButtons.length !== 0) {
        //hacer un forEach para eliminar las clases
        collectionButtonsArr.forEach((element) =>
          element.classList.remove("activeButton")
        );
      }
      /* console.log(collectionButtons); */
      const toggleButtons = document.getElementsByClassName("active");
      const toggleButtonsArr = Array.from(toggleButtons);
      /* console.log(toggleButtonsArr); */
      /* console.log(toggleButtonsArr.length); */
      if (toggleButtons.length !== 0) {
        //hacer un forEach para eliminar las clases
        toggleButtonsArr.forEach((element) =>
          element.classList.remove("active")
        );
      }
      /* console.log(toggleButtons); */
    }
  };

  function navigateToNewPath(page, query) {
    const {
      tipo,
      tipodeinmueble,
      referencia,
      zona,
      exclusivooficinas,
      clasico,
      coworking,
      porfecha,
      precioventamax,
      precioventamin,
      precioalquilermax,
      precioalquilermin,
      superficiemin,
      superficiemax,
    } = query;
    // console.log( tipo, tipodeinmueble, referencia, zona, exclusivooficinas, clasico, coworking, porfecha, precioventamax, precioventamin, precioalquilermax, precioalquilermin, superficiemin, superficiemax)
    let queryFilters = {};
    if (tipo !== undefined) queryFilters = { ...queryFilters, tipo: tipo };
    if (tipodeinmueble !== undefined)
      queryFilters = { ...queryFilters, tipodeinmueble: tipodeinmueble };
    if (referencia !== undefined)
      queryFilters = { ...queryFilters, referencia: referencia };
    if (zona !== undefined) queryFilters = { ...queryFilters, zona: zona };
    if (exclusivooficinas !== undefined)
      queryFilters = { ...queryFilters, exclusivooficinas: true };
    if (clasico !== undefined)
      queryFilters = { ...queryFilters, clasico: true };
    if (coworking !== undefined)
      queryFilters = { ...queryFilters, coworking: true };
    if (porfecha === undefined || porfecha === "false")
      queryFilters = { ...queryFilters, porfecha: false };
    if (porfecha === "true") queryFilters = { ...queryFilters, porfecha: true };
    if (precioventamax !== undefined)
      queryFilters = { ...queryFilters, precioventamax: precioventamax };
    if (precioventamin !== undefined)
      queryFilters = { ...queryFilters, precioventamin: precioventamin };
    if (precioalquilermax !== undefined)
      queryFilters = { ...queryFilters, precioalquilermax: precioalquilermax };
    if (precioalquilermin !== undefined)
      queryFilters = { ...queryFilters, precioalquilermin: precioalquilermin };
    if (superficiemin !== undefined)
      queryFilters = { ...queryFilters, superficiemin: superficiemin };
    if (superficiemax !== undefined)
      queryFilters = { ...queryFilters, superficiemax: superficiemax };

    queryFilters = { ...queryFilters, page: page.toString() };
    const newRoute = {
      pathname: `${routes.Patrimonial}/${page}`,
      query: queryFilters,
    };
    // Navega a la nueva ruta
    router.push(newRoute);
  }

  return (
    <div className="patrimonial">
      <Header />
      {orderedItems.length > 0 ? (
        <div>
          {filter === true ? (
            <div className="patrimonial__filter">
              <div className="patrimonial__filter__position">
                <h2 className="patrimonial__filter__title">
                  Zonas{" "}
                  <span onClick={toggleFilter}>
                    <Image
                      width={14}
                      height={14}
                      src={cerrarFiltro}
                      alt="cerrar"
                    />
                  </span>
                </h2>
                <h3 className="patrimonial__filter__subTitle">
                  Seleccione una o varias zonas
                </h3>
                <div className="patrimonial__remove">
                  <button
                    onClick={removeFilterOptions}
                    className="patrimonial__buttons__remove__filters"
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      width={9}
                      height={9}
                      src={cerrarFiltro}
                      alt="boton borrar filtro"
                    />{" "}
                    Borrar filtros
                  </button>
                </div>
                <div className="patrimonial__filter__position__mapContainer">
                  <div className="patrimonial__filter__position__mapContainer__mapa">
                    <Image
                      width={size >= 1350 ? 475 : 536}
                      height={size >= 1350 ? 347 : 392}
                      className="c1"
                      src={carretera1}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 232 : 262}
                      height={size >= 1350 ? 63 : 71}
                      className="c2"
                      src={carretera2}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 413 : 466}
                      height={size >= 1350 ? 312 : 352}
                      className="c3"
                      src={carretera3}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 85 : 96}
                      height={size >= 1350 ? 53 : 60}
                      className="c4"
                      src={carretera4}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 147 : 166}
                      height={size >= 1350 ? 68 : 77}
                      className="c5"
                      src={carretera5}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 13 : 15}
                      height={size >= 1350 ? 156 : 176}
                      className="c6"
                      src={carretera6}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 7 : 8}
                      height={size >= 1350 ? 23 : 26}
                      className="c62"
                      src={carretera62}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 76 : 86}
                      height={size >= 1350 ? 10 : 12}
                      className="c7"
                      src={carretera7}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 85 : 96}
                      height={size >= 1350 ? 48 : 54}
                      className="c8"
                      src={carretera8}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 71 : 80}
                      height={size >= 1350 ? 79 : 89}
                      className="c9"
                      src={carretera9}
                      alt="componente mapa"
                    />
                    <Image
                      width={size >= 1350 ? 62 : 70}
                      height={size >= 1350 ? 36 : 41}
                      className="c10"
                      src={carretera10}
                      alt="componente mapa"
                    />
                    {getMaxPrices ? (
                      <ClipLoader
                        color="#000000"
                        size={40}
                        className="cliploader"
                      />
                    ) : null}
                    {/* <Image className='secu' src={secu} alt='componente mapa' /> */}
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Madrid Secundario"
                      id="secu"
                      className={`secu${
                        localFilters
                          ?.toString()
                          .includes("61dfdddf3e6cc4fe56c2986d")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image
                        className="secu"
                        src={secu}
                        alt="componente mapa"
                      />
                      <p>
                        Madrid <br /> Secundario
                      </p>
                    </button>
                    <Image className="ceba" src={ceba} alt="componente mapa" />
                    <button
                      name="El Plantio"
                      onClick={!getMaxPrices ? toggleActive : null}
                      id="plan"
                      className={`plan${
                        localFilters
                          ?.toString()
                          .includes("61dfddcb3e6cc4fe56c29865")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image
                        src={plan1}
                        alt="componente mapa"
                        className="plan__1"
                      />
                      <Image
                        src={plan2}
                        alt="componente mapa"
                        className="plan__2"
                      />
                      <p>El plantío</p>
                    </button>
                    <button
                      type="image"
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Valdemarin"
                      id="vald"
                      className={`vald${
                        localFilters
                          ?.toString()
                          .includes("61dfddc53e6cc4fe56c29863")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={vald} alt="componente mapa" />
                      <p>Valdemarín</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Pozuelo"
                      id="pozu"
                      className={`pozu${
                        localFilters
                          ?.toString()
                          .includes("61dfddcf3e6cc4fe56c29867")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={pozu} alt="componente mapa" />
                      <p>Pozuelo</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="PE La Finca"
                      id="pe"
                      className={`pe${
                        localFilters
                          ?.toString()
                          .includes("61dfddd53e6cc4fe56c29869")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={pe} alt="componente mapa" />
                      <p>
                        P.E. <br /> La Finca
                      </p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="CTBA"
                      id="ctba"
                      className={`ctba${
                        localFilters
                          ?.toString()
                          .includes("61dfdd9d3e6cc4fe56c29853")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image
                        src={ctba1}
                        alt="componente mapa"
                        className="ctba__1"
                      />
                      <Image
                        src={ctba2}
                        alt="componente mapa"
                        className="ctba__2"
                      />
                      <p>CTBA</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Cuzco"
                      id="cuzco"
                      className={`cuzco${
                        localFilters
                          ?.toString()
                          .includes("61dfdd933e6cc4fe56c2984f")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image
                        src={cuzco1}
                        alt="componente mapa"
                        className="cuzco__2"
                      />
                      <Image src={cuzco2} alt="componente mapa" />
                      <p>Cuzco</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Azca"
                      id="azca"
                      className={`azca${
                        localFilters
                          ?.toString()
                          .includes("61dfdd883e6cc4fe56c2984d")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={azca} alt="componente mapa" />
                      <p>Azca</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Chamberi"
                      id="cham"
                      className={`cham${
                        localFilters
                          ?.toString()
                          .includes("61dfdd7e3e6cc4fe56c29849")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={cham} alt="componente mapa" />
                      <p>Chamberí</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Almagro"
                      id="alma"
                      className={`alma${
                        localFilters
                          ?.toString()
                          .includes("61dfdd783e6cc4fe56c29847")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={alma} alt="componente mapa" />
                      <p>Almagro</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Centro"
                      id="cent"
                      className={`cent${
                        localFilters
                          ?.toString()
                          .includes("61dfdd6d3e6cc4fe56c29843")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={cent} alt="componente mapa" />
                      <p>Centro</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Mendez Alvaro"
                      id="meal"
                      className={`meal${
                        localFilters
                          ?.toString()
                          .includes("61dfdd623e6cc4fe56c2983f")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={meal} alt="componente mapa" />
                      <p>Méndez Álvaro</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Julian Camarillo"
                      id="juca"
                      className={`juca${
                        localFilters
                          ?.toString()
                          .includes("61dfddc13e6cc4fe56c29861")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={juca} alt="componente mapa" />
                      <p>Julián Camarillo</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Av. America"
                      id="amer"
                      className={`amer${
                        localFilters
                          ?.toString()
                          .includes("61dfddb23e6cc4fe56c2985b")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={amer} alt="componente mapa" />
                      <Image
                        src={amer2}
                        alt="componente mapa"
                        className="amer__2"
                      />
                      <p>Av. América</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Josefa Valcarcel"
                      id="jova"
                      className={`jova${
                        localFilters
                          ?.toString()
                          .includes("61dfddb73e6cc4fe56c2985d")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={jova} alt="componente mapa" />
                      <p>Josefa Valcárcel</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Chamartin"
                      id="chama"
                      className={`chama${
                        localFilters
                          ?.toString()
                          .includes("61dfdd983e6cc4fe56c29851")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={chama} alt="componente mapa" />
                      <p>Chamartín</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Arturo Soria"
                      id="arso"
                      className={`arso${
                        localFilters
                          ?.toString()
                          .includes("61dfddbc3e6cc4fe56c2985f")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={arso} alt="componente mapa" />
                      <p>
                        Arturo <br /> Soria
                      </p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Campos de las Naciones"
                      id="cana"
                      className={`cana${
                        localFilters
                          ?.toString()
                          .includes("61dfdda73e6cc4fe56c29857")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={cana} alt="componente mapa" />
                      <p>
                        Campo de las <br /> Naciones
                      </p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Las Tablas - San Chinarro"
                      id="sanchi"
                      className={`sanchi${
                        localFilters
                          ?.toString()
                          .includes("61dfdda23e6cc4fe56c29855")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image
                        src={sanchi}
                        alt="componente mapa"
                        className="sanchi__1"
                      />
                      <Image
                        src={sanchi2}
                        alt="componente mapa"
                        className="sanchi__2"
                      />
                      <Image
                        src={sanchi3}
                        alt="componente mapa"
                        className="sanchi__3"
                      />
                      <p>
                        Las Tablas
                        <br /> San Chinarro
                      </p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Arroyo de la Vega"
                      id="arva"
                      className={`arva${
                        localFilters
                          ?.toString()
                          .includes("61dfddac3e6cc4fe56c29859")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image
                        src={arva}
                        alt="componente mapa"
                        className="arva__2"
                      />
                      <Image src={arva2} alt="componente mapa" />
                      <p>
                        Arroyo de <br />
                        la Vega
                      </p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="El Viso"
                      id="viso"
                      className={`viso${
                        localFilters
                          ?.toString()
                          .includes("61dfdd833e6cc4fe56c2984b")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={viso} alt="componente mapa" />
                      <p>El Viso</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Barrio Salamanca"
                      id="sala"
                      className={`sala${
                        localFilters
                          ?.toString()
                          .includes("61dfdd733e6cc4fe56c29845")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={sala} alt="componente mapa" />
                      <p>Salamanca</p>
                    </button>
                    <button
                      onClick={!getMaxPrices ? toggleActive : null}
                      name="Jeronimos"
                      id="jero"
                      className={`jero${
                        localFilters
                          ?.toString()
                          .includes("61dfdd673e6cc4fe56c29841")
                          ? " active"
                          : ""
                      }`}
                    >
                      <Image src={jero} alt="componente mapa" />
                      <p>Jerónimos</p>
                    </button>
                  </div>
                </div>
                <div className="patrimonial__filter__selectors">
                  <div className="patrimonial__filter__selectors__estado">
                    <h3>Estado</h3>
                    <div className="patrimonial__filter__selectors__estado__buttons">
                      <button
                        onClick={selectSaleOrRent}
                        name="Alquiler"
                        id="alq"
                        className={`alq${
                          localFilters?.toString().includes("Alquiler")
                            ? " activeButton"
                            : ""
                        }`}
                      >
                        Alquiler
                      </button>
                      <button
                        onClick={selectSaleOrRent}
                        name="Venta"
                        id="vent"
                        className={`vent${
                          localFilters?.toString().includes("Venta")
                            ? " activeButton"
                            : ""
                        }`}
                      >
                        Venta
                      </button>
                    </div>
                  </div>
                  <div className="patrimonial__filter__selectors__tipo">
                    <h3>Tipo</h3>
                    <div className="patrimonial__filter__selectors__tipo__buttons">
                      <button
                        onClick={addType}
                        name="Oficina"
                        id="oficina"
                        className={`oficina${
                          localFilters?.toString().includes("Oficina")
                            ? " activeButton"
                            : ""
                        }`}
                      >
                        Oficina
                      </button>
                      <button
                        onClick={addType}
                        name="Edificio"
                        id="edificio"
                        className={`edificio${
                          localFilters?.toString().includes("Edificio")
                            ? " activeButton"
                            : ""
                        }`}
                      >
                        Edificio
                      </button>
                      <button
                        onClick={addType}
                        name="Local"
                        id="retail"
                        className={`retail${
                          localFilters?.toString().includes("Local")
                            ? " activeButton"
                            : ""
                        }`}
                      >
                        Local
                      </button>
                    </div>
                  </div>
                  <div className="patrimonial__filter__selectors__tipo">
                    <h3>Extras</h3>
                    <div className="patrimonial__filter__selectors__tipo__buttons">
                      <button
                        onClick={addExtra}
                        name="exclusiveOfficeBuilding"
                        id="exclusiveOfficeBuilding"
                        className={`exclusiveOfficeBuilding${
                          localFilters
                            ?.toString()
                            .includes("exclusiveOfficeBuilding")
                            ? " activeButton"
                            : ""
                        }`}
                      >
                        Exclusivo oficinas
                      </button>
                      <button
                        onClick={addExtra}
                        name="classicBuilding"
                        id="classicBuilding"
                        className={`classicBuilding${
                          localFilters?.toString().includes("classicBuilding")
                            ? " activeButton"
                            : ""
                        }`}
                      >
                        Edificio clásico
                      </button>
                      <button
                        onClick={addExtra}
                        name="coworking"
                        id="coworking"
                        className={`coworking${
                          localFilters?.toString().includes("coworking")
                            ? " activeButton"
                            : ""
                        }`}
                      >
                        Coworking
                      </button>
                    </div>
                  </div>
                  <div className="patrimonial__filter__selectors__sliders">
                    <p
                      className={
                        disableSliders === true
                          ? "patrimonial__filter__selectors__sliders__price"
                          : "patrimonial__filter__selectors__sliders__priceDisabled"
                      }
                    >
                      Precio €
                    </p>
                    {disableSliders ? (
                      <PricesSliders
                        className={
                          "filtroPatrimonio__filterPosition__selectors__sliders__price"
                        }
                        getAriaLabel={() => "Minimum distance"}
                        value={price}
                        onChange={handlePriceInput}
                        valueLabelDisplay="on"
                        disableSwap
                        min={0}
                        max={
                          saleOrRent[0] === "Venta"
                            ? maxZonePrice !== 0
                              ? maxZonePrice
                              : 50000000
                            : maxZonePrice !== 0
                            ? maxZonePrice
                            : 300000
                        }
                        step={saleOrRent[0] === "Venta" ? 500000 : 1000}
                        valueLabelFormat={
                          saleOrRent[0] === "Venta"
                            ? (value) =>
                                `${new Intl.NumberFormat("de-DE").format(
                                  value
                                )} €`
                            : (value) =>
                                `${new Intl.NumberFormat("de-DE").format(
                                  value
                                )} €/mes`
                        }
                      />
                    ) : (
                      <PricesSliders
                        className={
                          "filtroPatrimonio__filterPosition__selectors__sliders__priceDisabled"
                        }
                        getAriaLabel={() => "Minimum distance"}
                        value={price}
                        onChange={handlePriceInput}
                        valueLabelDisplay="on"
                        disableSwap
                        disabled="true"
                        min={0}
                        max={saleOrRent[0] === "Venta" ? 50000000 : 300000}
                        step={saleOrRent[0] === "Venta" ? 500000 : 1000}
                        valueLabelFormat={
                          saleOrRent[0] === "Venta"
                            ? (value) =>
                                `${new Intl.NumberFormat("de-DE").format(
                                  value
                                )} €`
                            : (value) =>
                                `${new Intl.NumberFormat("de-DE").format(
                                  value
                                )} €/mes`
                        }
                      />
                    )}
                    <p className="patrimonial__filter__selectors__sliders__surface">
                      Superficie m<sup>2</sup>
                    </p>
                    <PricesSliders
                      className={
                        "patrimonial__filter__selectors__sliders__surface"
                      }
                      getAriaLabel={() => "Minimum distance"}
                      value={surface}
                      onChange={handleSurfaceInput}
                      valueLabelDisplay="on"
                      disableSwap
                      min={0}
                      max={20000}
                      step={100}
                      valueLabelFormat={(value) =>
                        `${new Intl.NumberFormat("de-DE").format(value)} m2`
                      }
                    />
                  </div>
                  <div className="patrimonial__filter__selectors__buscar">
                    {disableButton === false ? (
                      <button
                        onClick={() => getTypeHouse()}
                        className="patrimonial__filter__selectors__buscar__all"
                      >
                        Ver todos
                      </button>
                    ) : (
                      <button className="patrimonial__filter__selectors__buscar__allDisabled">
                        Ver todos
                      </button>
                    )}
                    {disableButton === true ? (
                      <button
                        className="patrimonial__filter__selectors__buscar__search"
                        onClick={() => getTypeHouse()}
                      >
                        Buscar
                      </button>
                    ) : (
                      <button className="patrimonial__filter__selectors__buscar__searchDisabled">
                        Buscar
                      </button>
                    )}
                  </div>
                  <div className="patrimonial__filter__selectors__ref">
                    <h4>Búsqueda por referencia</h4>
                    <input onChangeCapture={addRef} type="text" />
                    <Image
                      width={17}
                      height={17}
                      className={
                        verLupa === true
                          ? "patrimonial__filter__selectors__ref__lupa"
                          : "patrimonial__filter__selectors__ref__lupaOculta"
                      }
                      src={lupa}
                      alt="lupa"
                    />
                    {/* {itemRef!==elementId && elementId!=='' ?<p className='patrimonial__filter__selectors__ref__existe'>La referencia no existe</p> : null } */}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <h1 className="patrimonial__title">Patrimonio</h1>
          <div className="patrimonial__buttons">
            <button
              onClick={toggleFilter}
              className="patrimonial__buttons__filter"
              style={{ cursor: "pointer" }}
            >
              <Image src={filterImg} alt="boton filtro" /> Filtros
            </button>
            <div className="patrimonial__buttons__order">
              <button
                onClick={toggleOrderItems}
                className="patrimonial__buttons__order__title"
                style={{ cursor: "pointer" }}
              >
                Ordenar por <Image src={order} alt="boton ordenar por" />
              </button>
              <ul
                className={
                  orderItems === false
                    ? "patrimonial__buttons__order__listDisabled"
                    : "patrimonial__buttons__order__list"
                }
              >
                <li
                  onClick={onPrice}
                  className="patrimonial__buttons__order__list__first"
                  style={{ cursor: "pointer" }}
                >
                  Precio más alto
                </li>
                <li onClick={onDate} style={{ cursor: "pointer" }}>
                  Más reciente
                </li>
              </ul>
            </div>
          </div>
          <div className="patrimonial__list">{getPostItems}</div>
          <div onClick={deletePosition} className="patrimonial__pagination">
            <ul className="patrimonial__pagination__list">
              {parseInt(page) !== 1 && (
                <li className="patrimonial__pagination__list__item">
                  <a
                    className="patrimonial__pagination__list__item__back"
                    onClick={() => navigateToNewPath(parseInt(page) - 1, query)}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <Image
                      width={8}
                      height={10}
                      src={mayor}
                      alt="simbolo mayor"
                    />{" "}
                  </a>
                </li>
              )}
              {arrPages.map((__pag, i) => {
                return (
                  <li
                    key={i}
                    className={
                      i + 1 === parseInt(page)
                        ? "patrimonial__pagination__list__item currentPage"
                        : "patrimonial__pagination__list__item"
                    }
                  >
                    <p
                      onClick={() => navigateToNewPath(i + 1, query)}
                      style={{ cursor: "pointer" }}
                    >
                      {i + 1}
                    </p>
                  </li>
                );
              })}
              {parseInt(page) !== pagElements?.length && (
                <li className="patrimonial__pagination__list__item">
                  <p
                    className="patrimonial__pagination__list__item__next"
                    onClick={() => navigateToNewPath(parseInt(page) + 1, query)}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <Image
                      width={8}
                      height={10}
                      src={mayor}
                      alt="simbolo menor"
                    />{" "}
                  </p>
                </li>
              )}
            </ul>
          </div>
          <div className="patrimonial__zoneMap">
            <Link
              href={routes.FilterPatrimonial}
              className="patrimonial__zoneMap__button"
            >
              <span>
                <Image src={zoneMap} alt="boton mapa" />
              </span>{" "}
              Abrir el mapa de zonas
            </Link>
          </div>
          <ContactIndex />
        </div>
      ) : (
        <div className="patrimonial__empty">
          {
            // isFound ?
            <div className="patrimonial__empty">
              <h2 className="patrimonial__empty__text">
                Lamentablemente no existen anuncios bajo sus criterios de
                búsqueda
              </h2>
              <Link
                className="patrimonial__empty__button"
                href={`${routes.FilterPatrimonial}`}
              >
                Volver al mapa
              </Link>
            </div>
            //    :
            // <BarLoader color="#000000" width='150px' height='2px'/>
          }
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  let queryFilters = {};
  const query = context.query;
  // console.log(query)
  const {
    tipo,
    tipodeinmueble,
    referencia,
    zona,
    exclusivooficinas,
    clasico,
    coworking,
    page,
    porfecha,
    precioventamax,
    precioventamin,
    precioalquilermax,
    precioalquilermin,
    superficiemin,
    superficiemax,
  } = context.query;
  // console.log(tipo, tipodeinmueble, referencia, zona, exclusivooficinas, clasico, coworking, porfecha, page )
  // console.log(typeof porfecha)
  if (tipo !== undefined)
    queryFilters = { ...queryFilters, adType: tipo.split("-") };
  if (tipodeinmueble !== undefined)
    queryFilters = {
      ...queryFilters,
      adBuildingType: tipodeinmueble.split("-"),
    };
  if (referencia !== undefined)
    queryFilters = { ...queryFilters, adReference: referencia };
  if (zona !== undefined)
    queryFilters = { ...queryFilters, zone: zona.split("-") };
  if (exclusivooficinas !== undefined)
    queryFilters = { ...queryFilters, garage: true };
  if (clasico !== undefined)
    queryFilters = { ...queryFilters, swimmingPool: true };
  if (coworking !== undefined)
    queryFilters = { ...queryFilters, terrace: true };
  if (page !== undefined) queryFilters = { ...queryFilters, page: page };
  if (porfecha === "true") {
    queryFilters = { ...queryFilters, orderByDate: true };
  } else {
    queryFilters = { ...queryFilters, orderByDate: false };
  }
  if (precioventamax !== undefined)
    queryFilters = { ...queryFilters, maxSalePrice: precioventamax };
  if (precioventamin !== undefined)
    queryFilters = { ...queryFilters, minSalePrice: precioventamin };
  if (precioalquilermax !== undefined)
    queryFilters = { ...queryFilters, maxRentPrice: precioalquilermax };
  if (precioalquilermin !== undefined)
    queryFilters = { ...queryFilters, minRentPrice: precioalquilermin };
  if (superficiemin !== undefined)
    queryFilters = { ...queryFilters, minSurface: superficiemin };
  if (superficiemax !== undefined)
    queryFilters = { ...queryFilters, maxSurface: superficiemax };

  // console.log('porfecha:', porfecha)
  const { ads, totalAds } = await getPatrimonial(queryFilters);
  // console.log('totales',totalAds)
  const orderedItems = ads;
  const elements = totalAds;
  const pages = Math.ceil(elements / 30);

  // console.log(orderedItems.length)
  return {
    props: {
      orderedItems,
      elements,
      pages,
      query,
      queryFilters,
    },
  };
}
