import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import routes from '../../config/routes';
//import { Link, generatePath, NavLink } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Header from './../../components/Header/Header';
import banera from '../../assets/SVG/mobile/anuncios/anuncios_banos.svg';
import habit from '../../assets/SVG/mobile/anuncios/anuncios_habitaciones.svg';
import piscina from '../../assets/SVG/mobile/anuncios/anuncios_piscina.svg';
import refer from '../../assets/SVG/mobile/anuncios/anuncios_referencia.svg';
import sup from '../../assets/SVG/mobile/anuncios/anuncios_spfcie.svg';
import filterImg from '../../assets/SVG/mobile/comun/iconoFiltros.svg';
import order from '../../assets/SVG/mobile/comun/flechaOrdenar.svg';
import zoneMap from '../../assets/SVG/mobile/anuncios/anuncios_mapa.svg';
import carretera1 from '../../assets/maps/mapaR/carreteras/carretera1.svg';
import carretera2 from '../../assets/maps/mapaR/carreteras/carretera2.svg';
import carretera3 from '../../assets/maps/mapaR/carreteras/carretera3.svg';
import carretera4 from '../../assets/maps/mapaR/carreteras/carretera4.svg';
import carretera5 from '../../assets/maps/mapaR/carreteras/carretera5.svg';
import carretera6 from '../../assets/maps/mapaR/carreteras/carretera6.svg';
import carretera62 from '../../assets/maps/mapaR/carreteras/carretera6-2.svg';
import carretera7 from '../../assets/maps/mapaR/carreteras/carretera7.svg';
import carretera8 from '../../assets/maps/mapaR/carreteras/carretera8.svg';
import alam from '../../assets/maps/mapaR/barrios/alam.svg';
import alma from '../../assets/maps/mapaR/barrios/alma.svg';
import arav from '../../assets/maps/mapaR/barrios/arav.svg';
import cond from '../../assets/maps/mapaR/barrios/cond.svg';
import cort from '../../assets/maps/mapaR/barrios/cort.svg';
import enci from '../../assets/maps/mapaR/barrios/enci.svg';
import finc from '../../assets/maps/mapaR/barrios/finc.svg';
import flori from '../../assets/maps/mapaR/barrios/flori.svg';
import fuen1 from '../../assets/maps/mapaR/barrios/fuen1.svg';
import fuen2 from '../../assets/maps/mapaR/barrios/fuen2.svg';
import hisp from '../../assets/maps/mapaR/barrios/hisp.svg';
import jero from '../../assets/maps/mapaR/barrios/jero.svg';
import just from '../../assets/maps/mapaR/barrios/just.svg';
import mira from '../../assets/maps/mapaR/barrios/mira.svg';
import moal from '../../assets/maps/mapaR/barrios/moal.svg';
import mocl from '../../assets/maps/mapaR/barrios/mocl.svg';
import mora from '../../assets/maps/mapaR/barrios/mora.svg';
import nuev from '../../assets/maps/mapaR/barrios/nuev.svg';
import pala from '../../assets/maps/mapaR/barrios/pala.svg';
import prla from '../../assets/maps/mapaR/barrios/prla.svg';
import puer from '../../assets/maps/mapaR/barrios/puer.svg';
import rosa from '../../assets/maps/mapaR/barrios/rosa.svg';
import sala from '../../assets/maps/mapaR/barrios/sala.svg';
import somo from '../../assets/maps/mapaR/barrios/somo.svg';
import vald1 from '../../assets/maps/mapaR/barrios/vald1.svg';
import vald2 from '../../assets/maps/mapaR/barrios/vald2.svg';
import viso from '../../assets/maps/mapaR/barrios/viso.svg';
import { generalContext } from '../../providers/generalProvider';
import { getResidential } from '../../api-requests/requests';
import lupa from '../../assets/SVG/mobile/comun/filtros_lupa.svg';
import mayor from '../../assets/SVG/web/comunes/mayor.svg';
import cerrarFiltro from '../../assets/SVG/mobile/comun/cerrarCompleta.svg';
import ContactIndex from '../../components/ContactInfo/ContactIndex';
import supP from '../../assets/SVG/web/anuncios/anuncios_superficieP.svg';
import parking from '../../assets/SVG/web/anuncios/anuncios_garaje.svg';
//import { Navigate, useNavigate } from 'react-router' //se puede sustituir por router.push('/residentialItem')
import { BarLoader, ClipLoader } from 'react-spinners';

import { getZoneId } from '../../globalFunctions/MapZones/MapZones';
import { PricesSliders } from '../../styles/sliders-style';
import Link from 'next/link';
import Image from 'next/image';

let localFilters = "{}";
    if (typeof window !== 'undefined') {
        localFilters = window.localStorage.getItem('residentialFilters');
    }
const filt = JSON.parse(localFilters);

export default function Residential({orderedItems, elements, pages}){
    const router = useRouter();
    const page = router.query.page;

    const [, setOrderedItems] = useState([])
    const [/* refItem */, setRefItem] = useState([])
    const [perPage] = useState(30);
    const [pageNumber, setPageNumber] = useState(0);
    const [pagElements, setPagElements] = useState();

    const [selected, setSelected] = useState(localFilters.includes('zone') ? JSON.parse(localFilters).zone :[]);
    const [selectedActive, setSelectedActive] = useState(false);
    const [saleOrRent, setSaleOrRent] = useState(localFilters.includes('adType') ? JSON.parse(localFilters).adType :[]);
    const [saleOrRentActive, setSaleOrRentActive] = useState(false);
    const [typeHouse, setTypeHouse] = useState(localFilters.includes('adBuildingType') ? JSON.parse(localFilters).adBuildingType :[]);
    const [typeHouseActive, setTypeHouseActive] = useState(false);
    const [extras, setExtras] = useState([]);
    const [extrasActive, setExtrasActive] = useState(false);
    //const [ref, setRef] = useState('');
    const [/*itemRef*/, setItemRef] = useState('initial');
    const [maxPrice, setMaxPrice] = useState(99999999.9)
    const [price, setPrice] = useState([0, maxPrice]);
    const [maxSurface, setMaxSurface] = useState(99999999.9);
    const [surface, setSurface] = useState([0, maxSurface]);

    const [filter, setFilter] = useState(false);
    const [filters, setFilters] = useState(JSON.parse(localFilters));
    const [disableButton, setDisableButton] = useState(false);
    const [disableSliders, setDisableSliders] = useState(false);
    const [verLupa, setVerLupa] = useState(true);
    const [orderItems, setOrderItems] = useState(false);
    const [state2] = useState([])
    const [state, setState] = useContext(generalContext);
    const [coord, setCoord] = useState(0)
    const [param, setParam] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isFound, setIsFound] = useState(false);
    const [elementId, setElementId] = useState('');
    //const navigate = useNavigate()
    const [maxZonePrice, setMaxZonePrice] = useState(0);
    const [getMaxPrices, setGetMaxPrices] = useState(false);

    const getTypeHouse = () => {
        setParam('')
        setRedirect(false)
        const searchFilters = filterResults()
        setFilters(searchFilters)
        setFilter(!filter)
        //router.push(`${routes.Residential}/1`)
        router.reload()
        //window.localStorage.setItem('residentialFilters')
        // if (typeof window !== 'undefined'){
        //     router.push({
        //     pathname: `${routes.Residential}/1`,
        //     query: {
        //       filters: JSON.stringify(window.localStorage.getItem('residentialFilters'))
        //     }
        //   });
        // }
    }

    const setPosition = () => {
        if (coord !== 0) {
        /*console.log('setPosition',coord)*/
            window.localStorage.setItem(
                'storedPosition2', JSON.stringify(coord)
            )
        }
    }
    const pageCount = pages;
    // if (typeof window !== 'undefined'){
    //     window.localStorage.getItem('totalAds')
    //     pageCount = Math.ceil(parseInt(window?.localStorage.getItem('totalAds')) / perPage);
    //     console.log(pageCount)
    // }
    const getPostItems = orderedItems?.map(item => {
            return item.department === "Residencial" && item.showOnWeb === true ?
                <div onClick={setPosition} className='residential__list__item' key={item._id} >
                    {item.gvOperationClose === 'Alquilado' || item.gvOperationClose === 'Vendido' ?
                        <div className='wrapper'>
                            <div className='residential__list__item__status'>
                                <p>{item.gvOperationClose}</p>
                            </div>
                            <Carousel
                                className='residential__list__item__images'
                                showArrows={true}
                                showThumbs={false}
                                infiniteLoop={true}
                                showStatus={false}
                            >
                                <Image width={400} height={300} src={item.images.main} alt={item.title} loading="lazy" />
                                {/*{item.images.others.map((image)=> (
                                <Image key={image} src={image} alt={item.title} loading="lazy"/>
                            ))}*/}
                            </Carousel>
                            <div>
                                <div className='residential__list__item__text'>
                                    {item.adType.length === 1 ?
                                        <h2 className='residential__list__item__text__price'>{item.adType.map(type =>
                                            type === 'Venta' && item.sale.saleShowOnWeb ?
                                                `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €` :
                                                type === 'Alquiler' && item.rent.rentShowOnWeb ?
                                                    `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                                        </h2>
                                        :
                                        <h2 className='residential__list__item__text__prices'>
                                            {item.sale.saleShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p> : null}
                                            {item.rent.rentShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p> : null}
                                        </h2>
                                    }
                                    <h2 className='residential__list__item__text__title'>{item.title}</h2>
                                    <h3 className='residential__list__item__text__street'>{item.webSubtitle}</h3>
                                    <ul className='residential__list__item__text__characteristics'>
                                        {item.buildSurface !== 0 ?
                                            <li><span><Image src={sup} alt='superficie' /></span>{item.buildSurface}m<sup>2</sup></li>
                                            : null}
                                        {item.plotSurface !== 0 ?
                                            <li><span><Image src={supP} alt='superficie' /></span>{item.plotSurface}m<sup>2</sup></li>
                                            : null}
                                        {item.quality.bedrooms !== 0 ?
                                            <li><span><Image src={habit} alt='habitaciones' /></span>{item.quality.bedrooms}</li>
                                            : null}
                                        {item.quality.bathrooms !== 0 ?
                                            <li><span><Image src={banera} alt='baños' /></span>{item.quality.bathrooms}</li>
                                            : null}
                                        {item.quality.parking !== 0 ?
                                            <li className='residential__list__item__text__characteristics__car'><span><Image src={parking} alt='plazas parking' /></span>{item.quality.parking}</li>
                                            : null}
                                        {item.quality.outdoorPool !== 0 ?
                                            <li><span><Image src={piscina} alt='piscina' /></span>{item.quality.outdoorPool}</li>
                                            : null}
                                        {item.adReference !== 0 ?
                                            <li><span><Image src={refer} alt='referencia' /></span><p>Ref {item.adReference}</p></li>
                                            : null}
                                    </ul>
                                    <div className='residential__list__item__text__blocker'></div>
                                </div>
                            </div>
                        </div>
                        :
                        <div >
                            {/*{item.images.main > 0 && item.images.others > 0 ? OPCION 1*/}
                            {/* {isLoading ? */}
                                <Carousel
                                    className='residential__list__item__images'
                                    showArrows={true}
                                    showThumbs={false}
                                    infiniteLoop={true}
                                    showStatus={false}
                                >
                                    <Image width={400} height={300} src={item.images.main} alt={item.title} loading="lazy" />
                                    {/*{item.images.others.map((image)=> (
                                <Image key={image} src={image} alt={item.title} loading="lazy"/>
                            ))}*/}
                                </Carousel>
                                {/* : <div className='spinnerBar'>
                                    <BarLoader color="#000000" width='80px' height='2px' className='barloader' />
                                </div>
                            } */}
                            <Link onClick={() => { setState({ item: item })
                             }} href={`${routes.ItemResidential}/${item._id}`}>
                                <div className='residential__list__item__text'>
                                    {item.adType.length === 1 ?
                                        <h2 className='residential__list__item__text__price'>{item.adType.map(type =>
                                            type === 'Venta' && item.sale.saleShowOnWeb === true && item.sale.saleValue !== 0 ?
                                                `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €` :
                                                type === 'Alquiler' && item.rent.rentShowOnWeb === true && item.rent.rentValue !== 0 ?
                                                    `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                                        </h2>
                                        :
                                        <h2 className='residential__list__item__text__prices'>
                                            {item.sale.saleShowOnWeb && item.sale.saleValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p> : null}
                                            {item.rent.rentShowOnWeb && item.rent.rentValue !== 0 ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p> : null}
                                        </h2>
                                    }
                                    <h2 className='residential__list__item__text__title'>{item.title}</h2>
                                    <h3 className='residential__list__item__text__street'>{item.webSubtitle}</h3>
                                    <ul className='residential__list__item__text__characteristics'>
                                        {item.buildSurface !== 0 ?
                                            <li><span><Image src={sup} alt='superficie' /></span>{item.buildSurface}m<sup>2</sup></li>
                                            : null}
                                        {item.plotSurface !== 0 ?
                                            <li><span><Image src={supP} alt='superficie' /></span>{item.plotSurface}m<sup>2</sup></li>
                                            : null}
                                        {item.quality.bedrooms !== 0 ?
                                            <li><span><Image src={habit} alt='habitaciones' /></span>{item.quality.bedrooms}</li>
                                            : null}
                                        {item.quality.bathrooms !== 0 ?
                                            <li><span><Image src={banera} alt='baños' /></span>{item.quality.bathrooms}</li>
                                            : null}
                                        {item.quality.outdoorPool !== 0 ?
                                            <li><span><Image src={piscina} alt='piscina' /></span>{item.quality.outdoorPool}</li>
                                            : null}
                                        {item.quality.parking !== 0 ?
                                            <li className='residential__list__item__text__characteristics__car'><span><Image src={parking} alt='plazas parking' /></span>{item.quality.parking}</li>
                                            : null}
                                        {item.adReference !== 0 ?
                                            <li><span><Image src={refer} alt='referencia' /></span><p> Ref {item.adReference}</p></li>
                                            : null}
                                    </ul>
                                    <div className='residential__list__item__text__clickable'></div>
                                </div>
                            </Link>
                        </div>
                    }
                </div> : null
        })

    useEffect(() => {
        if (state.length >= 1) {
            let reducedState = []
            state.map(item =>
                item.department === 'Residencial' && item.showOnWeb === true ? reducedState.push(item) : null
            )
            if (typeof window !== 'undefined')
            window.localStorage.setItem(
                'storedState', JSON.stringify(reducedState)
            )
        }
    }, [state])

    useEffect(()=>{
        let extrasLocal = [];
        if(localFilters.includes('garage')) extrasLocal = [...extrasLocal, 'garage']
        if(localFilters.includes('swimmingPool')) extrasLocal = [...extrasLocal, 'swimmingPool']
        if(localFilters.includes('terrace')) extrasLocal = [...extrasLocal, 'terrace']
        setExtras(extrasLocal)
    },[])

    useEffect(() => {
        const localState = window.localStorage.getItem('storedState')
        if (localState) {
            const residentialItems = JSON.parse(localState);
            setOrderedItems(residentialItems)
        }
    }, [state])

    useEffect(() => {
        let splitedLocation = window.location.href.split('/');
        let elements = []
        setPageNumber(parseInt(splitedLocation[4]) - 1)
        for (let i = 0; i < pageCount; i++) {
            elements.push(
                <li key={i} className={i + 1 === parseInt(splitedLocation[4]) ? 'residential__pagination__list__item currentPage' : 'residential__pagination__list__item'}><a href={`/residential/${i + 1}?page=${i+1}`}>{i + 1}</a></li>
            )
        }
        setPagElements(elements)
    }, [pageCount])

    /**
     * Este será el useEffect que tendremos que sacar al getStaticProps()
     */
    // useEffect(() => {
    //     let activeFilters = filters ? filters : {};
    //     activeFilters.page = 1;
    //     // console.log('activeFilters',activeFilters)
    //     let splitedLocation = window.location.href.split('/');
    //     activeFilters.page = parseInt(splitedLocation[4])
    //     if(localFilters !== ''){
    //         if(localFilters.includes('garage')){
    //             activeFilters = {...activeFilters, garage:true}
    //         }
    //         if(localFilters.includes('swimmingPool')){
    //             activeFilters = {...activeFilters, swimmingPool:true}
    //         }
    //         if(localFilters.includes('terrace')){
    //             activeFilters = {...activeFilters, terrace:true}
    //         }
    //     }
    //     /* console.log(activeFilters) */
    //     getResidential(activeFilters).then(items => {
    //             setState(items.ads)
    //             window.localStorage.setItem('storedState', JSON.stringify(items.ads))
    //             window.localStorage.setItem('totalAds', items.totalAds-1)
    //             setIsLoading(true)
    //             setIsFound(true)

    //         /* console.log(items.ads)
    //         items.ads.forEach(item => console.log(item.createdAt, item.title)) */
    //     })
    // }, [filters, setState])

    useEffect(() => {
        if (selectedActive === true || saleOrRentActive === true || typeHouseActive === true || extrasActive === true || elementId !== '' /* ||  surface[0] !== 0.1 || surface[1] !== 99999999.9 */ ) {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
    }, [elementId, selectedActive, saleOrRentActive, typeHouseActive, extrasActive /*, surface */])

    useEffect(()=>{
        if (selected.length === 0 && saleOrRent.length === 0 && typeHouse.length === 0 && extras.length === 0 ) {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    },[selected, saleOrRent, typeHouse, extras])

    useEffect(() => {
        if (state2.length > 0) {
            state2.map(itemState => {
                if (elementId === itemState.adReference) {
                    setItemRef(itemState.adReference)
                    setRefItem([itemState])
                }
                return (itemState)
            })
        }
        if (elementId !== '') {
            setVerLupa(false)
        } else {
            setVerLupa(true)
        }
    }, [elementId, state2])

    useEffect(() => {
        if (filter === true) {
            if(saleOrRent.length === 0 && typeHouse.length === 0 && extras.length === 0  && selected.length === 0){
                setDisableButton(false)
            } else {
                setDisableButton(true)
            }
            let label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
            console.log(label)
            if(saleOrRent.length === 1){
                /* console.log('entro en el if cuando la longitud es 1') */
                setMaxPrice(99999999.9)
                setMaxSurface(99999999.9)
                setPrice([0, 99999999.9])
                setSurface([0, 99999999.9])
                if (saleOrRent[0] === 'Alquiler') {
                    setDisableSliders(true)
                    // if (label[0].innerHTML === '0 €/mes') {
                    //     label[0].innerHTML = '0 €/mes'
                    // }
                    // if (label[1].innerHTML === '99.999.999,9 €/mes') {
                    //     label[1].innerHTML = 'max'
                    // }
                }
                if (saleOrRent[0] === 'Venta') {
                    setDisableSliders(true)
                    // if (label[0].innerHTML === '0 €') {
                    //     label[0].innerHTML = '0 €'
                    // }
                    // if (label[1].innerHTML === '99.999.999,9 €') {
                    //     label[1].innerHTML = 'max'
                    // }
                }
            }
            if (saleOrRent.length === 0 || saleOrRent.length === 2){
                setMaxPrice(99999999.9)
                setMaxSurface(99999999.9)
                setPrice([0, 99999999.9])
                setSurface([0, 99999999.9])
                setDisableSliders(false)
            }
            // if (label[0].innerHTML === '0 €/mes') {
            //     label[0].innerHTML = '0 €/mes'
            // }
            // if (label[1].innerHTML === '99.999.999,9 €/mes') {
            //     label[1].innerHTML = 'max'
            // }
            // if (label[3].innerHTML === '99.999.999,9 m2') {
            //     label[3].innerHTML = 'max'
            // }
            // if (label[2].innerHTML === '0 m2') {
            //     label[2].innerHTML = '0 m2'
            // }
        }
    }, [filters, saleOrRent, typeHouse, extras, selected, filter, disableSliders])

    useEffect(() => {
        setTimeout(function () {
            const localPosition = JSON.parse(window.localStorage.getItem('storedPosition2'))
            /*console.log('posicion',localPosition);*/
            if (localPosition !== 0 && localPosition !== null) {
              /*console.log('hago el scroll despues de 2 s')*/
                window.scroll({
                  top:localPosition -500
                })
            } else {
                window.scroll(
                    { top: 0 }
                )
            }
        }, 2000)
    }, [])

    const onPrice = () => {
        setIsLoading(false)
        if (typeof window !== 'undefined') {
            let activeFilters = JSON.parse(window.localStorage.getItem('residentialFilters'));
            activeFilters = { ...activeFilters, orderByDate: false };
            window.localStorage.setItem('residentialFilters', JSON.stringify(activeFilters));
            /* console.log(activeFilters) */
            getResidential(activeFilters).then(items => {
                /* console.log(items) */
                setState(items.ads)
                window.localStorage.setItem('storedState', JSON.stringify(items.ads))
                window.localStorage.setItem('totalAds', items.totalAds-1)
                setIsLoading(true)
                setIsFound(true)
                setOrderedItems(items.ads);
                setOrderItems (!orderItems);
                setPageNumber(1);
                const currentPage = document.getElementsByClassName('residential__pagination__list__item currentPage');
                currentPage[0].classList.remove('currentPage');
                const pageNumbers = document.getElementsByClassName('residential__pagination__list__item');
                pageNumbers[1].classList.add("currentPage");
                router.push(`/residential/1`);
            })

        }
    }

    const onDate = () => {
        if (typeof window !== 'undefined') {
            setIsLoading(false)
            let activeFilters = JSON.parse(window.localStorage.getItem('residentialFilters'));
            activeFilters = { ...activeFilters, orderByDate: true }
            window.localStorage.setItem('residentialFilters', JSON.stringify(activeFilters));
            /* console.log(activeFilters) */
            getResidential(activeFilters).then(items => {
                /* console.log(items) */
                setState(items.ads)
                window.localStorage.setItem('storedState', JSON.stringify(items.ads))
                window.localStorage.setItem('totalAds', items.totalAds-1)
                setIsLoading(true)
                setIsFound(true)
                setOrderedItems(items.ads);
                setOrderItems (!orderItems);
                setPageNumber(1);
                const currentPage = document.getElementsByClassName('residential__pagination__list__item currentPage');
                currentPage[0].classList.remove('currentPage');
                const pageNumbers = document.getElementsByClassName('residential__pagination__list__item');
                pageNumbers[1].classList.add("currentPage");
                router.push(`/residential/1`);
            })
        }
    }

    const toggleActive = (e) => {
        /* console.log('Zona seleccionada', e.currentTarget.name) */
        if (e.currentTarget.className === e.currentTarget.id) {
            if(e.currentTarget.className === 'nuev' || e.currentTarget.className === 'hisp'){
                const idZoneSelected = getZoneId(e.currentTarget.name)
                if(!selected.includes(`${idZoneSelected}`)){
                    idZoneSelected.forEach(idZone => selected.push(idZone))
                }
            /* console.log(selected); */
                document.getElementById('nuev').className = 'nuev active';
                document.getElementById('hisp').className = 'hisp active';
            }else{
                e.currentTarget.className = `${e.currentTarget.className} active`
                const idZoneSelected = getZoneId(e.currentTarget.name)

                if(!selected.includes(`${idZoneSelected[0]}`)){
                    idZoneSelected.forEach(idZone => selected.push(idZone))
                }
                /* console.log(selected) */
            }
        /* console.log('array de zonas', selected) */
            /* console.log(selected) */
            let activeFilters = {};
            activeFilters = { ...activeFilters, zone: selected };
            activeFilters = { ...activeFilters, adType: saleOrRent };
            /* console.log(activeFilters) */
            if(saleOrRent.length === 1){
                setGetMaxPrices(true);
                getResidential(activeFilters).then(items =>{
                    /* console.log(items) */
                    if(items.ads.length !== 0){
                        if(saleOrRent[0]=== 'Venta') {setMaxZonePrice(items.ads[0].sale.saleValue)}
                        else {setMaxZonePrice(items.ads[0].rent.rentValue)}
                    }else{
                        setMaxZonePrice(0)
                    }
                    setGetMaxPrices(false);
                })
            }

        } else {
            if(e.currentTarget.id === 'nuev' || e.currentTarget.id === 'hisp'){
                document.getElementById('nuev').classList.remove('active');
                document.getElementById('hisp').classList.remove('active');
                const idZoneElement = getZoneId(e.currentTarget.name);
                //Tengo que eliminar todos los id de la variable Selected que sean iguales a cada uno de los que hay en la variable idZoneElement
                idZoneElement.forEach(idZone =>{
                    const newSelected = selected.filter(item => item !== idZone);
                    selected.splice(0, selected.length, ...newSelected);
                })
            }else {
                e.currentTarget.className = `${e.currentTarget.id}`
                const idZoneElement = getZoneId(e.currentTarget.name);
                idZoneElement.forEach(idZone =>{
                    const newSelected = selected.filter(item => item !== idZone);
                    selected.splice(0, selected.length, ...newSelected);
                })
            }

            if(saleOrRent.length === 1){
                setGetMaxPrices(true);
                /* console.log(selected) */
                let activeFilters = {};
                activeFilters = { ...activeFilters, zone: selected };
                activeFilters = { ...activeFilters, adType: saleOrRent };
                getResidential(activeFilters).then(items =>{
                    /* console.log(items) */
                    if(items.ads.length !== 0){
                        if(saleOrRent[0]=== 'Venta') {setMaxZonePrice(items.ads[0].sale.saleValue)}
                        else {setMaxZonePrice(items.ads[0].rent.rentValue)}
                    }else{
                        setMaxZonePrice(0)
                    }
                    setGetMaxPrices(false);
                })
            }
        }
        if (selected.length !== 0) {
            setSelectedActive(true)
        } else {
            setSelectedActive(false)
        }
    }

    const selectSaleOrRent = (e) => {
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} activeButton`
            if(!saleOrRent.includes(`${e.currentTarget.name}`)){
                saleOrRent.push(e.currentTarget.name)
            }
        } else {
            e.currentTarget.className = `${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newSaleOrRent = saleOrRent.filter(item => item !== elementName)
            saleOrRent.splice(0, saleOrRent.length, ...newSaleOrRent)
        }
        if (saleOrRent.length !== 0) {
            setSaleOrRentActive(true)
        } else {
            setSaleOrRentActive(false)
        }
        if (saleOrRent.length === 1) {
            setGetMaxPrices(true);
            let activeFilters = {};
            activeFilters = { ...activeFilters, zone: selected };
            activeFilters = { ...activeFilters, adType: saleOrRent };
            getResidential(activeFilters).then(items =>{
                /* console.log(items) */
                if(items.ads.length !== 0){
                    if(saleOrRent[0]=== 'Venta') {setMaxZonePrice(items.ads[0].sale.saleValue)}
                    else {setMaxZonePrice(items.ads[0].rent.rentValue)}
                }else{
                    setMaxZonePrice(0)
                }
                setGetMaxPrices(false);
            })
            saleOrRent.map(item => {
                if (item === 'Venta') {
                    setDisableSliders(true)
                    let priceArray = [];
                    let surfaceArray = [];
                    state2.map(item => {
                        if (item.showOnWeb === true && item.department === 'Residencial') {
                            priceArray.push(item.sale.saleValue);
                            surfaceArray.push(item.buildSurface);
                        }
                        return (item)
                    })
                    priceArray.sort(function (a, b) {
                        return b - a
                    })
                    surfaceArray.sort(function (a, b) {
                        return b - a
                    })
                    setMaxPrice(priceArray[0])
                    setPrice([0, priceArray[0]])
                    setMaxSurface(surfaceArray[0])
                    setSurface([0, surfaceArray[0]])
                } else if (item === 'Alquiler') {
                    setDisableSliders(true)
                    let priceArray = [];
                    let surfaceArray = [];
                    state2.map(item => {
                        if (item.showOnWeb === true && item.department === 'Residencial') {
                            item.adType.map(itemType => {
                                if (itemType === 'Alquiler') {
                                    priceArray.push(item.rent.rentValue);
                                    surfaceArray.push(item.buildSurface);
                                    return (itemType)
                                }
                                return (item)
                            })
                        }
                        return (item)
                    })
                    priceArray.sort(function (a, b) {
                        return b - a
                    })
                    surfaceArray.sort(function (a, b) {
                        return b - a
                    })
                    setMaxPrice(priceArray[0])
                    setPrice([0, priceArray[0]])
                    setMaxSurface(surfaceArray[0])
                    setSurface([0, surfaceArray[0]])
                }
                return (item)
            })
        }
        if (saleOrRent.length === 2 || saleOrRent.length === 0) {
            setDisableSliders(!disableSliders)
            setMaxPrice(99999999.9)
            setPrice([0, 99999999.9]);
            setMaxSurface(99999999.9)
            setSurface([0, 99999999.9]);
        }
    }

    const filterResults = () => {
        if (typeof window !== 'undefined') {
            let activeFilters = {}
            let splitedLocation = window.location.href.split('/');
            activeFilters.page = parseInt(splitedLocation[4])
            if (saleOrRent.length) {
                activeFilters = { ...activeFilters, adType: saleOrRent }
            }
            if (typeHouse.length) {
                activeFilters = { ...activeFilters, adBuildingType: typeHouse }
            }
            /*if (elementId.length === itemRef) {
                activeFilters = { ...activeFilters, adReference: elementId }
                console.log(elementId)
            }*/
            if (elementId) {
                activeFilters = { ...activeFilters, adReference: elementId }
            }
            if (selected.length > 0) {
                /* const selectedIds = getZoneId(selected) */
                activeFilters = { ...activeFilters, zone: selected }
                /* console.log(selectedIds) */
            }
            if (extras.length) {
                if (extras.includes('garage')) {
                    activeFilters = { ...activeFilters, garage: true }
                }

                if (extras.includes('swimmingPool')) {
                    activeFilters = { ...activeFilters, swimmingPool: true }
                }

                if (extras.includes('terrace')) {
                    activeFilters = { ...activeFilters, terrace: true }
                }
            }
            if(saleOrRent.length === 1){
                if(saleOrRent[0] === 'Venta'){
                    activeFilters = { ...activeFilters, maxSalePrice: price[1] }
                    activeFilters = { ...activeFilters, minSalePrice: price[0] }
                }else{
                    activeFilters = { ...activeFilters, maxRentPrice: price[1] }
                    activeFilters = { ...activeFilters, minRentPrice: price[0] }
                }
            }
            if(surface){
                activeFilters = { ...activeFilters, minSurface: surface[0] }
                activeFilters = { ...activeFilters, maxSurface: surface[1] }
            }
            /* console.log(activeFilters) */
            window.localStorage.setItem('residentialFilters', JSON.stringify(activeFilters))
        }
    }

    const addType = (e) => {
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} activeButton`
            if(!typeHouse.includes(`${e.currentTarget.className}`)){
                typeHouse.push(e.currentTarget.name)
            }
        } else {
            e.currentTarget.className = `${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newType = typeHouse.filter(item => item !== elementName)
            typeHouse.splice(0, typeHouse.length, ...newType)
        }
        if (typeHouse.length !== 0) {
            setTypeHouseActive(true)
        } else {
            setTypeHouseActive(false)
        }
    }
    const addExtra = (e) => {
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} activeButton`
            if(!extras.includes(`${e.currentTarget.className}`)){
                extras.push(e.currentTarget.name)
            }
        } else {
            e.currentTarget.className = `${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newExtra = extras.filter(item => item !== elementName)
            extras.splice(0, extras.length, ...newExtra)
        }
        if (extras.length !== 0) {
            setExtrasActive(true)
        } else {
            setExtrasActive(false)
        }
    }

    const handlePriceInput = (e, data1) => {
        setPrice(data1);
    };

    const handleSurfaceInput = (e, data2) => {
        setSurface(data2);
    };

    const addRef = (e) => {
        setElementId(e.currentTarget.value)
    }

    const toggleFilter = () => {
        setFilter(!filter)
    }

    const toggleOrderItems = () => {
        setOrderItems(!orderItems)
    }

    if (typeof window !== 'undefined'){
        window.onmousemove = function (e) {
            const y = e.pageY
            /*console.log('y:',y)*/
            setCoord(y);
        }
    }

    const deletePosition = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('storedPosition2')
        }
    }

    const removeFilterOptions = () => {
        if (typeof window !== 'undefined') {
            //1. Iniciar todas las variables a vacías
            setSelected([]);
            setSaleOrRent([]);
            setTypeHouse([]);
            setExtras([]);
            setElementId('');
            setSelectedActive(false);
            setSaleOrRentActive(false);
            setTypeHouseActive(false);
            setExtrasActive(false);
            //2. Restablecer los filtros en el local storage
            window.localStorage.setItem('residentialFilters', JSON.stringify({}));
            //3. Eliminar las clases active y activeButton de todos los elementos
            const collectionButtons = document.getElementsByClassName("activeButton");
            var collectionButtonsArr = Array.from(collectionButtons);
            /* console.log(collectionButtonsArr); */
            /* console.log(collectionButtonsArr.length); */
            if(collectionButtons.length !== 0) {
                //hacer un forEach para eliminar las clases
                collectionButtonsArr.forEach(element => element.classList.remove("activeButton"));
            }
            /* console.log(collectionButtons); */
            const toggleButtons = document.getElementsByClassName("active");
            var toggleButtonsArr = Array.from(toggleButtons);
            /* console.log(toggleButtonsArr); */
            /* console.log(toggleButtonsArr.length); */
            if(toggleButtons.length !== 0) {
                //hacer un forEach para eliminar las clases
                toggleButtonsArr.forEach(element => element.classList.remove("active"));
            }
            /* console.log(toggleButtons); */
        }
    }

    /*const seeAll = () => {
        const storedSOR = window.localStorage.getItem('saleOrRentStored')
        const SOR = JSON.parse(storedSOR)
        const array = Object.values(state2)
        const sortArray = (a, b) => {
            if (SOR === 'Alquiler') {
                if (a.rent.rentValue < b.rent.rentValue) { return 1; }
                if (a.rent.rentValue > b.rent.rentValue) { return -1; }
            } else {
                if (a.sale.saleValue < b.sale.saleValue) { return 1; }
                if (a.sale.saleValue > b.sale.saleValue) { return -1; }
            }
        }
        let finalArray = []
        array.sort(sortArray).map(item =>
            item.department === 'Residencial' ? finalArray.push(item) : null
        );
        setOrderedItems(finalArray)
        setFilter(!filter)
        window.scroll(
            { top: 0 }
        )
    }*/

    const obj = {
        zone: ["61dfdcde3e6cc4fe56c29817"], 
        adType: ["Venta"]
    }


    return (
        <div className='residential'>
            <Header />
            {orderedItems.length >0 ?
                <div>
                    {filter === true ?
                        <div className='residential__filter'>
                            <div className='residential__filter__position'>
                                <h2 className='residential__filter__position__title'>Zonas <span onClick={toggleFilter}><Image src={cerrarFiltro} alt='cerrar' /></span></h2>
                                <h3 className='residential__filter__position__subTitle'>Seleccione una o varias zonas</h3>
                                <div className='residential__buttons'>
                                    <button onClick={removeFilterOptions} className='residential__buttons__remove__filters'><Image src={cerrarFiltro} alt='boton borrar filtro' /> Borrar filtros</button>
                                </div>
                                <div className='residential__filter__position__mapContainer'>
                                    <div className='residential__filter__position__mapContainer__mapa'>

                                        <Image className='c1' src={carretera1} alt='componente mapa' />
                                        <Image className='c2' src={carretera2} alt='componente mapa' />
                                        <Image className='c3' src={carretera3} alt='componente mapa' />
                                        <Image className='c4' src={carretera4} alt='componente mapa' />
                                        <Image className='c5' src={carretera5} alt='componente mapa' />
                                        <Image className='c6' src={carretera6} alt='componente mapa' />
                                        <Image className='c62' src={carretera62} alt='componente mapa' />
                                        <Image className='c7' src={carretera7} alt='componente mapa' />
                                        <Image className='c8' src={carretera8} alt='componente mapa' />
                                        {
                                            getMaxPrices ?
                                            <ClipLoader color="#000000" size={40} className='cliploader' />
                                            : null
                                        }
                                        <button name='Monteclaro' onClick={!getMaxPrices ? toggleActive : null} id='mocl'
                                        className={`mocl${
                                                localFilters.toString().includes("61dfdc8b3e6cc4fe56c29807")
                                                    ? " active"
                                                    : ""
                                                }`}
                                        >
                                            <Image src={mocl} alt='componente mapa' />
                                            <p>Monte <br /> Claro</p>
                                            <div></div>
                                        </button>
                                        <button type='image' onClick={!getMaxPrices ? toggleActive : null} name='Montealina' id='moal'
                                        className={`moal${
                                                localFilters.toString().includes("61dfdc843e6cc4fe56c29805")
                                                    ? " active"
                                                    : ""
                                                }`}
                                        >
                                            <Image src={moal} alt='componente mapa' />
                                            <p>Monte<br />Alina</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Prado Largo' id='prla'
                                        className={`prla${
                                                localFilters.toString().includes("61dfdc953e6cc4fe56c29809")
                                                    ? " active"
                                                    : ""
                                                }`}
                                        >
                                            <Image src={prla} alt='componente mapa' />
                                            <p>Prado<br />Largo</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Las Encinas' id='enci'
                                        className={`enci${
                                                localFilters.toString().includes("61dfdc9f3e6cc4fe56c2980b")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={enci} alt='componente mapa' />
                                            <p>Las Encinas</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Alamo de Bulanas' id='alam'
                                        className={`alam${
                                                localFilters.toString().includes("61dfdca93e6cc4fe56c2980d")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={alam} alt='componente mapa' />
                                            <p>Álamos de<br />Bularas</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='La Florida' id='flori'
                                        className={`flori${
                                                localFilters.toString().includes("61dfdc5f3e6cc4fe56c297ff")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={flori} alt='componente mapa' />
                                            <p>La Florida</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='La Finca' id='finc'
                                        className={`finc${
                                                localFilters.toString().includes("61dfdce53e6cc4fe56c29819")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={finc} alt='componente mapa' />
                                            <p>La Finca</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Somosaguas' id='somo'
                                        className={`somo${
                                                localFilters.toString().includes("61dfdd2e3e6cc4fe56c2982d")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={somo} alt='componente mapa' />
                                            <p>Somosaguas</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Aravaca' id='arav'
                                        className={`arav${
                                                localFilters.toString().includes("61dfdc733e6cc4fe56c29801")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={arav} alt='componente mapa' />
                                            <p>Aravaca</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Valdemarin' id='vald1'
                                        className={`vald1${
                                                localFilters.toString().includes("61dfdc7b3e6cc4fe56c29803")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={vald1} alt='componente mapa' />
                                            <Image className='vald2' src={vald2} alt='componente mapa' />
                                            <p>Valdemarín</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Colonia Fuentelarreyna' id='fuen1'
                                        className={`fuen1${
                                                localFilters.toString().includes("61dfdd563e6cc4fe56c2983b")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={fuen1} alt='componente mapa' />
                                            <Image className='fuen2' src={fuen2} alt='componente mapa' />
                                            <p>Fuentelarreina</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Puerta de Hierro' id='puer'
                                        className={`puer${
                                                localFilters.toString().includes("61dfdd4b3e6cc4fe56c29837")
                                                    ? " active"
                                                    : ""
                                                }`} >
                                            <Image src={puer} alt='componente mapa' />
                                            <p>Puerta de <br />Hierro</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Rosales' id='rosa'
                                        className={`rosa${
                                                localFilters.toString().includes("61dfdcf13e6cc4fe56c2981b")
                                                    ? " active"
                                                    : ""
                                                }`} >
                                            <Image src={rosa} alt='componente mapa' />
                                            <p>Rosales</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Palacio' id='pala'
                                        className={`pala${
                                                localFilters.toString().includes("61dfdd0b3e6cc4fe56c29821")
                                                    ? " active"
                                                    : ""
                                                }`} >
                                            <Image src={pala} alt='componente mapa' />
                                            <p>Palacio</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Mirasierra' id='mira'
                                        className={`mira${
                                                localFilters.toString().includes("61dfdcb13e6cc4fe56c2980f")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={mira} alt='componente mapa' />
                                            <p>Mirasierra</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Almagro' id='alma'
                                        className={`alma${
                                                localFilters.toString().includes("61dfdcd63e6cc4fe56c29815")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={alma} alt='componente mapa' />
                                            <p>Almagro</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Justicia' id='just'
                                        className={`just${
                                                localFilters.toString().includes("61dfdcfc3e6cc4fe56c2981d")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={just} alt='componente mapa' />
                                            <p>Justicia</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Cortes' id='cort'
                                        className={`cort${
                                                localFilters.toString().includes("61dfdd043e6cc4fe56c2981f")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={cort} alt='componente mapa' />
                                            <p>Cortes</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Nueva España - Hispanoamerica' id='nuev'
                                        className={`nuev${
                                                localFilters.toString().includes("61dfdd383e6cc4fe56c29831")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={nuev} alt='componente mapa' />
                                            <p>Nueva España</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Nueva España - Hispanoamerica' id='hisp'
                                        className={`hisp${
                                                localFilters.toString().includes("61dfdd383e6cc4fe56c29831")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={hisp} alt='componente mapa' />
                                            <p>Hispano <br /> América</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='El Viso' id='viso'
                                        className={`viso${
                                                localFilters.toString().includes("61dfdcc23e6cc4fe56c29811")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={viso} alt='componente mapa' />
                                            <p>El Viso</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Barrio Salamanca' id='sala'
                                        className={`sala${
                                                localFilters.toString().includes("61dfdd113e6cc4fe56c29823")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={sala} alt='componente mapa' />
                                            <p>Salamanca</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Jeronimos' id='jero'
                                        className={`jero${
                                                localFilters.toString().includes("61dfdccd3e6cc4fe56c29813")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={jero} alt='componente mapa' />
                                            <p>Jerónimos</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='La Moraleja' id='mora'
                                        className={`mora${
                                                localFilters.toString().includes("61dfdd1d3e6cc4fe56c29827")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={mora} alt='componente mapa' />
                                            <p>Moraleja</p>
                                        </button>
                                        <button onClick={!getMaxPrices ? toggleActive : null} name='Conde de Orgaz' id='cond'
                                        className={`cond${
                                                localFilters.toString().includes("61dfdcde3e6cc4fe56c29817")
                                                    ? " active"
                                                    : ""
                                                }`}>
                                            <Image src={cond} alt='componente mapa' />
                                            <p>Conde<br />Orgaz</p>
                                        </button>
                                    </div>
                                </div>
                                <div className='residential__filter__selectors'>
                                    <div className='residential__filter__selectors__estado'>
                                        <h3>Estado</h3>
                                        <div className='residential__filter__selectors__estado__buttons'>
                                            <button onClick={selectSaleOrRent} name='Alquiler' id='alq'
                                            className={`alq${
                                                localFilters.toString().includes("Alquiler")
                                                    ? " activeButton"
                                                    : ""
                                                }`}
                                            >Alquiler</button>
                                            <button onClick={selectSaleOrRent} name='Venta' id='vent'
                                            className={`vent${
                                                localFilters.toString().includes("Venta")
                                                    ? " activeButton"
                                                    : ""
                                                }`}>Venta</button>
                                        </div>
                                    </div>
                                    <div className='residential__filter__selectors__tipo'>
                                        <h3>Tipo</h3>
                                        <div className='residential__filter__selectors__tipo__buttons'>
                                            <button onClick={addType} name='Casa' id='casa'
                                            className={`casa${
                                                localFilters.toString().includes("Casa")
                                                    ? " activeButton"
                                                    : ""
                                                }`}
                                            >Casa</button>
                                            <button onClick={addType} name='Piso' id='piso'
                                            className={`piso${
                                                localFilters.toString().includes("Piso")
                                                    ? " activeButton"
                                                    : ""
                                                }`}
                                            >Piso</button>
                                            <button onClick={addType} name='Parcela' id='parcela'
                                            className={`parcela${
                                                localFilters.toString().includes("Parcela")
                                                    ? " activeButton"
                                                    : ""
                                                }`}
                                            >Parcela</button>
                                        </div>
                                    </div>
                                    <div className='residential__filter__selectors__extras'>
                                        <h3>Extras</h3>
                                        <div className='residential__filter__selectors__extras__buttons'>
                                            <button onClick={addExtra} name='swimmingPool' id='piscina'
                                            className={`piscina${
                                                localFilters.toString().includes("swimmingPool")
                                                    ? " activeButton"
                                                    : ""
                                                }`}
                                            >Piscina</button>
                                            <button onClick={addExtra} name='garage' id='garaje'
                                            className={`garaje${
                                                localFilters.toString().includes("garage")
                                                    ? " activeButton"
                                                    : ""
                                                }`}
                                            >Garaje</button>
                                            <button onClick={addExtra} name='terrace' id='terraza'
                                            className={`terraza${
                                                localFilters.toString().includes("terrace")
                                                    ? " activeButton"
                                                    : ""
                                                }`}
                                            >Terraza</button>
                                        </div>
                                    </div>
                                    <div className='residential__filter__selectors__sliders'>
                                        <p className={disableSliders === true ? 'residential__filter__selectors__sliders__price' : 'residential__filter__selectors__sliders__priceDisabled'}>Precio €</p>
                                        {disableSliders ?
                                            <PricesSliders
                                            className={'residential__filter__selectors__sliders__price' }
                                            getAriaLabel={() => 'Minimum distance'}
                                            value={price}
                                            onChange={handlePriceInput}
                                            valueLabelDisplay='on'
                                            disableSwap
                                            min={0}
                                            max={saleOrRent[0] === 'Venta'  ? ( maxZonePrice !== 0 ? maxZonePrice : 20000000 ) : (maxZonePrice !== 0 ? maxZonePrice : 30000) }
                                            step={saleOrRent[0] === 'Venta' ? 500000 : 1000}

                                            valueLabelFormat={saleOrRent[0] === 'Venta' ? value => `${new Intl.NumberFormat('de-DE').format(value)} €` : value => `${new Intl.NumberFormat('de-DE').format(value)} €/mes`}
                                        /> :
                                        <PricesSliders
                                            className={'residential__filter__selectors__sliders__priceDisabled'}
                                            getAriaLabel={() => 'Minimum distance'}
                                            value={price}
                                            onChange={handlePriceInput}
                                            valueLabelDisplay='on'
                                            disableSwap
                                            disabled='true'
                                            min={0}
                                            max={saleOrRent[0] === 'Venta' ? 20000000 : 30000}
                                            step={saleOrRent[0] === 'Venta' ? 500000 : 1000}
                                            valueLabelFormat={saleOrRent[0] === 'Venta' ? value => `${new Intl.NumberFormat('de-DE').format(value)} €` : value => `${new Intl.NumberFormat('de-DE').format(value)} €/mes`}
                                        />
                                        }
                                        <p className={'residential__filter__selectors__sliders__surface'}>Superficie m<sup>2</sup></p>
                                        <PricesSliders
                                            className={'residential__filter__selectors__sliders__surface'}
                                            getAriaLabel={() => 'Minimum distance'}
                                            value={surface}
                                            onChange={handleSurfaceInput}
                                            valueLabelDisplay='on'
                                            disableSwap
                                            min={0}
                                            max={15000}
                                            step={100}
                                            valueLabelFormat={value => `${new Intl.NumberFormat('de-DE').format(value)} m2`}
                                        />
                                    </div>
                                    <div className='residential__filter__selectors__buscar'>
                                        {disableButton === false ?
                                            <a onClick={getTypeHouse} href={`${routes.Residential}/1?filters=${JSON.stringify(obj)}`} className='residential__filter__selectors__buscar__all'>Ver todos</a>
                                            :
                                            <button className='residential__filter__selectors__buscar__allDisabled'>Ver todos</button>
                                        }
                                        {disableButton === true ?
                                            <a className='residential__filter__selectors__buscar__search'
                                                onClick={getTypeHouse}
                                                href={`${routes.Residential}/1?filters=${JSON.stringify(obj)}`}
                                                >Buscar
                                            </a>
                                            :
                                            <button className='residential__filter__selectors__buscar__searchDisabled' >Buscar</button>
                                        }
                                    </div>
                                    <div className='residential__filter__selectors__ref'>
                                        <h4>Búsqueda por referencia</h4>
                                        <input onChangeCapture={addRef} type='text' />
                                        <Image className={verLupa === true ? 'residential__filter__selectors__ref__lupa' : 'residential__filter__selectors__ref__lupaOculta'} src={lupa} alt='lupa' />
                                        {/* {itemRef !== elementId && elementId !== '' ? <p className='residential__filter__selectors__ref__existe'>La referencia no existe</p> : null} */}
                                    </div>
                                </div>
                            </div>
                        </div> : null
                    }
                    <h1 className='residential__title'>Residencial</h1>
                    <div className='residential__buttons'>
                        <button onClick={toggleFilter} className='residential__buttons__filter'><Image src={filterImg} alt='boton filtro' /> Filtros</button>
                        <div className='residential__buttons__order'>
                            <button onClick={toggleOrderItems} className='residential__buttons__order__title'>Ordenar por <Image src={order} alt='boton ordenar por' /></button>
                            <ul className={orderItems === false ? 'residential__buttons__order__listDisabled' : 'residential__buttons__order__list'}>
                                <li onClick={onPrice} className='residential__buttons__order__list__first'>Precio más alto</li>
                                <li onClick={onDate}>Más reciente</li>
                            </ul>
                        </div>
                    </div>
                    <div className='residential__list'>
                        {getPostItems}
                    </div>
                    <div onClick={deletePosition} className='residential__pagination'>
                        <ul className='residential__pagination__list'>
                            <li className='residential__pagination__list__item'><a className='residential__pagination__list__item__back' href={`/residential/${pageNumber}?page=${pageNumber}`}> <Image width={8} height={10} src={mayor} alt='simbolo mayor' /> </a></li>
                            {pagElements}
                            <li className='residential__pagination__list__item'><a className='residential__pagination__list__item__next' href={`/residential/${pageNumber}?page=${pageNumber + 2}`}> <Image width={8} height={10} src={mayor} alt='simbolo menor' /> </a></li>
                        </ul>
                    </div>
                    <div className='residential__zoneMap'>
                        <Link href={`${routes.FilterResidential}`} className='residential__zoneMap__button'><span><Image src={zoneMap} alt='boton mapa' /></span> Abrir el mapa de zonas</Link>
                    </div>
                    <ContactIndex />
                </div>
                :
                <div className='residential__empty'>
                    {
                        isFound ?
                            (
                                <div className='residential__empty'>
                                    <h2 className='residential__empty__text'>Lamentablemente no existen anuncios bajo sus criterios de búsqueda</h2>
                                    <Link className='residential__empty__button' href={`${routes.FilterResidential}`}>Volver al mapa</Link>
                                </div>
                            )
                            :
                            <BarLoader color="#000000" width='150px' height='2px' />
                    }
                </div>
            }
        </div>
    )

}

export async function getServerSideProps(context){
        let filters = {}
        const query = context.query
        const {tipo, tipodeinmueble, referencia, zona, garaje, piscina, terraza, page} = context.query
        console.log(tipo, tipodeinmueble, referencia, zona, garaje, piscina, terraza, page)
        if(tipo !== undefined)              filters = { ...filters, adType: tipo.split('-') }
        if(tipodeinmueble !== undefined)    filters = { ...filters, adBuildingType: tipodeinmueble.split('-') }
        if(referencia !== undefined)        filters = { ...filters, adReference: referencia }
        if(zona !== undefined)              filters = { ...filters, zone: zona.split('-') }
        if(garaje !== undefined)            filters = { ...filters, garage: true }
        if(piscina !== undefined)           filters = { ...filters, swimmingPool: true }
        if(terraza !== undefined)           filters = { ...filters, terrace: true }
        if(page !== undefined)              filters = { ...filters, page: page }
        
        const {ads, totalAds} = await getResidential(filters)
        console.log('totales',totalAds)
        const orderedItems = ads
        const elements = totalAds
        const pages = Math.ceil(elements / 30)
    
    //}
    console.log(orderedItems.length)
        return {
            props: {
                orderedItems,
                elements,
                pages, 
                query
            }
  }
  }