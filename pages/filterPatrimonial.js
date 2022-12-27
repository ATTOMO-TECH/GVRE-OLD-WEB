import React, {useState, useContext, useEffect} from 'react';
import carretera1 from './../assets/maps/mapaR/carreteras/carretera1.svg';
import carretera2 from './../assets/maps/mapaR/carreteras/carretera2.svg';
import carretera3 from './../assets/maps/mapaR/carreteras/carretera3.svg';
import carretera4 from './../assets/maps/mapaR/carreteras/carretera4.svg';
import carretera5 from './../assets/maps/mapaR/carreteras/carretera5.svg';
import carretera6 from './../assets/maps/mapaR/carreteras/carretera6.svg';
import carretera62 from './../assets/maps/mapaR/carreteras/carretera6-2.svg';
import carretera7 from './../assets/maps/mapaR/carreteras/carretera7.svg';
import carretera8 from './../assets/maps/mapaR/carreteras/carretera8.svg';
import carretera9 from './../assets/maps/mapaP/c9.svg';
import carretera10 from './../assets/maps/mapaP/c10.svg';
import plan1 from './../assets/maps/mapaP/plan1.svg';
import plan2 from './../assets/maps/mapaP/plan2.svg';
import vald from './../assets/maps/mapaP/vald.svg';
import pozu from './../assets/maps/mapaP/pozu.svg';
import pe from './../assets/maps/mapaP/pe.svg';
import secu from './../assets/maps/mapaP/secu.svg';
import ctba1 from './../assets/maps/mapaP/ctba1.svg';
import ctba2 from './../assets/maps/mapaP/ctba2.svg';
import cuzco1 from './../assets/maps/mapaP/cuzco1.svg';
import cuzco2 from './../assets/maps/mapaP/cuzco2.svg';
import azca from './../assets/maps/mapaP/azca.svg';
import cham from './../assets/maps/mapaP/cham.svg';
import alma from './../assets/maps/mapaP/alma.svg';
import cent from './../assets/maps/mapaP/cent.svg';
import ceba from './../assets/maps/mapaP/ceba.svg';
import meal from './../assets/maps/mapaP/meal.svg';
import juca from './../assets/maps/mapaP/juca.svg';
import amer from './../assets/maps/mapaP/amer.svg';
import amer2 from './../assets/maps/mapaP/amer2.svg';
import jova from './../assets/maps/mapaP/jova.svg';
import chama from './../assets/maps/mapaP/chama.svg';
import arso from './../assets/maps/mapaP/arso.svg';
import cana from './../assets/maps/mapaP/cana.svg';
import sanchi from './../assets/maps/mapaP/sanchi.svg';
import sanchi2 from './../assets/maps/mapaP/sanchi2.svg';
import sanchi3 from './../assets/maps/mapaP/sanchi3.svg';
import arva from './../assets/maps/mapaP/arva.svg';
import arva2 from './../assets/maps/mapaP/arva2.svg';
import jero from './../assets/maps/mapaR/barrios/jero.svg';
import sala from './../assets/maps/mapaR/barrios/sala.svg';
import viso from './../assets/maps/mapaR/barrios/viso.svg';
import avion from './../assets/maps/avion.svg';
import boca from './../assets/maps/boca.svg';
import lupa from './../assets/SVG/mobile/comun/filtros_lupa.svg'
import Header from './../components/Header/Header';
import { generalContext } from './../providers/generalProvider';
//import { NavLink, generatePath } from 'react-router-dom';
import routes from './../config/routes';
import { getZoneId } from './../globalFunctions/MapZones/MapZones';
import { PricesSliders } from './../styles/sliders-style';
import { ClipLoader } from 'react-spinners';
import { getPatrimonial } from '../api-requests/requests';
import Image from 'next/image';
import Link from 'next/link';
import Router  from 'next/router';


export default function FilterPatrimonial (){

    const [selected] = useState([]);
    const [selectedActive, setSelectedActive] = useState(false);
    const [saleOrRent] = useState([]);
    const [saleOrRentActive, setSaleOrRentActive] = useState(false);
    const [typeHouse] = useState([]);
    const [typeHouseActive, setTypeHouseActive] = useState(false);
    const [extras] = useState([]);
    const [extrasActive, setExtrasActive] = useState(false);
    //const [ref, setRef] = useState('');
    const [/* itemRef */, setItemRef] = useState ('initial');
    const [maxPrice, setMaxPrice] = useState(99999999.9)
    const [price, setPrice] = useState([0,maxPrice]);
    const [maxSurface, setMaxSurface] = useState(99999999.9);
    const [surface, setSurface] = useState([0,maxSurface]);
    const [disableButton, setDisableButton] = useState(false);
    const [disableSliders, setDisableSliders] = useState(true);
    const [verLupa, setVerLupa] = useState(true);
    const [state] = useContext(generalContext);
    const [itemPage] = useState([]);
    const [elementId, setElementId] = useState('');
    const [maxZonePrice, setMaxZonePrice] = useState(0);
    const [getMaxPrices, setGetMaxPrices] = useState(false);


    const toggleActive = (e) => {
        /* console.log(e.currentTarget.name) */
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} active`
            selected.push(e.currentTarget.name)
            /* console.log(selected) */
            const selectedId = getZoneId(selected)
            /* console.log(selectedId) */
            let activeFilters = {};
            activeFilters = { ...activeFilters, zone: selectedId };
            activeFilters = { ...activeFilters, adType: saleOrRent };
            /* console.log(activeFilters) */
            if(saleOrRent.length === 1){
                setGetMaxPrices(true);
                getPatrimonial(activeFilters).then(items =>{
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
            e.currentTarget.className = `${e.currentTarget.id}`
            const elementName = e.currentTarget.name
            const newSelected = selected.filter(item => item !== elementName)
            selected.splice(0, selected.length, ...newSelected)
            const selectedId = getZoneId(selected)
            if(saleOrRent.length === 1){
                setGetMaxPrices(true);
                /* console.log(selectedId) */
                let activeFilters = {};
                activeFilters = { ...activeFilters, zone: selectedId };
                activeFilters = { ...activeFilters, adType: saleOrRent };
                getPatrimonial(activeFilters).then(items =>{
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
        /*console.log(selected)*/
    }
    
    const selectSaleOrRent = (e) => {
        /* console.log(price) */
        /* console.log(surface) */
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} activeButton`
            saleOrRent.push(e.currentTarget.name)
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
            const selectedId = getZoneId(selected);
            activeFilters = { ...activeFilters, zone: selectedId };
            activeFilters = { ...activeFilters, adType: saleOrRent };
            getPatrimonial(activeFilters).then(items =>{
                /* console.log(items) */
                if(items.ads.length !== 0){
                    if(saleOrRent[0]=== 'Venta') {setMaxZonePrice(items.ads[0].sale.saleValue)}
                    else {setMaxZonePrice(items.ads[0].rent.rentValue)}
                }else{
                    setMaxZonePrice(0)
                }
                setGetMaxPrices(false);
            })
            saleOrRent.forEach(item => {
                if (item === 'Venta') {
                    setDisableSliders(true)
                    
                }else if (item ==='Alquiler'){
                    setDisableSliders(true)
                }
            })
        }
        if (saleOrRent.length===2 || saleOrRent.length===0){
            setDisableSliders(!disableSliders)
            setMaxPrice(99999999.9)
            setPrice([0, 99999999.9]);
            setMaxSurface(99999999.9)
            setSurface([0,99999999.9]);
        }
        
    }

    const addType = (e) => {
        if (e.currentTarget.className === e.currentTarget.id) {
            e.currentTarget.className = `${e.currentTarget.className} activeButton`
            typeHouse.push(e.currentTarget.name)
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
            extras.push(e.currentTarget.name)
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

    const addRef = (e) => {
        setElementId(e.currentTarget.value)
    }

    const handlePriceInput = (e, data1) => {
        setPrice(data1);
    };
    const handleSurfaceInput = (e, data2) => {
        setSurface(data2);
    };


    const filterResults = () => {
        if (typeof window !== 'undefined') {
            //Introducir una condición que guarde los valores de los sliders
            // 1. El de precio solo si saleOrRent.lenght === 1
            // 2. El de superficie siempre
            // activeFilters = { ...activeFilters, price: price }
            // activeFilters = { ...activeFilters, surface: surface }
            let activeFilters = {}
            const queryString = []


            if (itemPage.length) {
                activeFilters = { ...activeFilters, showOnWeb: itemPage[0] }
                /* console.log(itemPage) */
            }
            if (saleOrRent.length) {
                activeFilters = { ...activeFilters, adType: saleOrRent }
                /* console.log(saleOrRent) */
                const queryAdType = saleOrRent.join('-')
                const query = `tipo=${queryAdType}`
                queryString.push(query)
            }
            if (typeHouse.length) {
                activeFilters = { ...activeFilters, adBuildingType: typeHouse }
                const queryAdBuildingType = typeHouse.join('-')
                const query = `tipodeinmueble=${queryAdBuildingType}`
                queryString.push(query)
            }
            if (elementId) {
                activeFilters = { ...activeFilters, adReference: elementId }
                const query = `referencia=${elementId}`
                queryString.push(query)
            }
            if (selected.length > 0) {
                const selectedIds = getZoneId(selected)
                activeFilters = { ...activeFilters, zone: selectedIds }
                /* console.log(selectedIds) */
                /* console.log(activeFilters) */
                const querySelected = selectedIds.join('-')
                const query = `zona=${querySelected}`
                queryString.push(query)
            }
            if (extras.length) {
                if (extras.includes('exclusiveOfficeBuilding')) {
                    activeFilters = { ...activeFilters, exclusiveOfficeBuilding: true }
                    const query = `exclusivooficinas=${true}`
                    queryString.push(query)
                }
                
                if (extras.includes('classicBuilding')) {
                    activeFilters = { ...activeFilters, classicBuilding: true }
                    const query = `clasico=${true}`
                    queryString.push(query)
                }
                
                if (extras.includes('coworking')) {
                    activeFilters = { ...activeFilters, coworking: true }
                    const query = `coworking=${true}`
                    queryString.push(query)
                }
            }
            if(saleOrRent.length === 1){
                if(saleOrRent[0] === 'Venta'){
                    activeFilters = { ...activeFilters, maxSalePrice: price[1] }           
                    activeFilters = { ...activeFilters, minSalePrice: price[0] }
                    const query1 = `precioventamax=${price[1]}`
                    queryString.push(query1)
                    const query2 = `precioventamin=${price[0]}`
                    queryString.push(query2)
                }else{
                    activeFilters = { ...activeFilters, maxRentPrice: price[1] }           
                    activeFilters = { ...activeFilters, minRentPrice: price[0] }
                    const query1 = `precioalquilermax=${price[1]}`
                    queryString.push(query1)
                    const query2 = `precioalquilermin=${price[0]}`
                    queryString.push(query2)
                }          
            }
            if(surface){
                activeFilters = { ...activeFilters, minSurface: surface[0] }           
                activeFilters = { ...activeFilters, maxSurface: surface[1] }
                const query1 = `superficiemin=${surface[0]}`
                queryString.push(query1)
                const query2 = `superficiemax=${surface[1]}`
                queryString.push(query2)

            }
            window.localStorage.setItem('patrimonialFilters', JSON.stringify(activeFilters))
            /* console.log(activeFilters) */
            const queryPage = `page=1`
            queryString.push(queryPage)
            const query = queryString.join('&')
            // console.log(query)
            Router.push(`${routes.Patrimonial}/${1}?${query}`)
        }

    }

    useEffect(() => {
        /* console.log(surface) */
        if (selectedActive === true || saleOrRentActive === true || typeHouseActive === true  || extrasActive === true || elementId !== '' /* || surface[0] !== 0.1 || surface[1] !== 99999999.9 */) {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
    }, [elementId, selectedActive, saleOrRentActive, typeHouseActive, extrasActive /* , surface */])

    useEffect(() => {
        if(saleOrRent.length === 0 && typeHouse.length === 0  && selected.length === 0){
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
        let label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
        if(saleOrRent.length === 1){
            /* console.log('entro en el if cuando la longitud es 1') */
            setMaxPrice(99999999.9)
            setMaxSurface(99999999.9)
            setPrice([0, 99999999.9])
            setSurface([0, 99999999.9])
            if (saleOrRent[0] === 'Alquiler') {
                setDisableSliders(true)
                if (label[0].innerHTML === '0 €/mes') {
                    label[0].innerHTML = '0 €/mes'
                }
                if (label[1].innerHTML === '99.999.999,9 €/mes') {
                    label[1].innerHTML = 'max'
                }
            }
            if (saleOrRent[0] === 'Venta') {
                setDisableSliders(true)
                if (label[0].innerHTML === '0 €') {
                    label[0].innerHTML = '0 €'
                }
                if (label[1].innerHTML === '99.999.999,9 €') {
                    label[1].innerHTML = 'max'
                }
            }
        }
        if(saleOrRent.length === 0 || saleOrRent.length === 2){
            setMaxPrice(99999999.9)
            setMaxSurface(99999999.9)
            setPrice([0, 99999999.9])
            setSurface([0, 99999999.9])
            setDisableSliders(false)
        }
        if (label[0].innerHTML==='0 €/mes'){
            label[0].innerHTML='0 €/mes'
        }
        if (label[1].innerHTML==='99.999.999,9 €/mes'){
            label[1].innerHTML='max'
        }
        if (label[3].innerHTML==='99.999.999,9 m2'){
            label[3].innerHTML='max'
        }
        if (label[2].innerHTML==='0 m2'){
            label[2].innerHTML='0 m2'
        }
    }
    ,[saleOrRent, typeHouse, selected, disableSliders])

    useEffect(() => {
        if (state.length > 0) {
            state.map(itemState => {
                if (elementId === itemState.reference) {
                    setItemRef(itemState.reference)
                }
                return(itemState)
            })
        }
        if (elementId!== '') {
            setVerLupa(false)
        }else{
            setVerLupa(true)
        }   
    },[elementId, state])


    return (
        <div className='filtroPatrimonio'>
        <Header/>
        <h2 className='filtroPatrimonio__title'>Mapa</h2>
        <h3 className='filtroPatrimonio__subTitle'>Seleccione una o varias zonas</h3>
        <div className='filtroPatrimonio__filterPosition'>
            <div className='filtroPatrimonio__filterPosition__mapContainer'>
                <div className='filtroPatrimonio__filterPosition__mapContainer__mapa'>
                    <Image className='c1' src={carretera1} alt='componente mapa' />
                    <Image className='c2' src={carretera2} alt='componente mapa' />
                    <Image className='c3' src={carretera3} alt='componente mapa' />
                    <Image className='c4' src={carretera4} alt='componente mapa' />
                    <Image className='c5' src={carretera5} alt='componente mapa' />
                    <Image className='c6' src={carretera6} alt='componente mapa' />
                    <Image className='c62' src={carretera62} alt='componente mapa' />
                    <Image className='c7' src={carretera7} alt='componente mapa' />
                    <Image className='c8' src={carretera8} alt='componente mapa' />
                    <Image className='c9' src={carretera9} alt='componente mapa' />
                    <Image className='c10' src={carretera10} alt='componente mapa' />
                    {/* <Image className='secu' src={secu} alt='componente mapa' /> */}
                    {
                        getMaxPrices ? 
                        <ClipLoader color="#000000" size={40} className='cliploader' />
                        : null
                    }
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Madrid Secundario' id='secu' className='secu'>
                        <Image className='secu' src={secu} alt='componente mapa' />
                        <p>Madrid <br/> Secundario</p>
                    </button>
                    <Image className='ceba' src={ceba} alt='componente mapa' />
                    <Image className='avion' src={avion} alt='componente mapa' />
                    <Image className='boca' src={boca} alt='componente mapa' />
                    <div className='a1'>A1</div>
                    <div className='a2'>A2</div>
                    <div className='a3'>A3</div>
                    <div className='a5'>A5</div>
                    <div className='a6'>A6</div>
                    <button name='El Plantio' onClick={!getMaxPrices ? toggleActive : null} id='plan' className='plan'>
                        <Image src={plan1} alt='componente mapa' className='plan__1'/>
                        <Image src={plan2} alt='componente mapa' className='plan__2'/>
                        <p>El plantío</p>
                    </button>
                    <button type='image' onClick={!getMaxPrices ? toggleActive : null} name='Valdemarin' id='vald' className='vald'>
                        <Image src={vald} alt='componente mapa' />
                        <p>Valdemarín</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Pozuelo' id='pozu' className='pozu'>
                        <Image src={pozu} alt='componente mapa' />
                        <p>Pozuelo</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='PE La Finca' id='pe' className='pe'>
                        <Image src={pe} alt='componente mapa' />
                        <p>P.E. <br/> La Finca</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='CTBA (Cuatro torres business area)' id='ctba' className='ctba'>
                        <Image src={ctba1} alt='componente mapa' className='ctba__1'/>
                        <Image src={ctba2} alt='componente mapa' className='ctba__2'/>
                        <p>CTBA</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Cuzco' id='cuzco' className='cuzco'>
                        <Image src={cuzco1} alt='componente mapa' className='cuzco__2'/>
                        <Image src={cuzco2} alt='componente mapa' />
                        <p>Cuzco</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Azca' id='azca' className='azca'>
                        <Image src={azca} alt='componente mapa' />
                        <p>Azca</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Chamberi' id='cham' className='cham'>
                        <Image src={cham} alt='componente mapa' />
                        <p>Chamberí</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Almagro' id='alma' className='alma'>
                        <Image src={alma} alt='componente mapa' />
                        <p>Almagro</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Centro' id='cent' className='cent'>
                        <Image src={cent} alt='componente mapa'/>
                        <p>Centro</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Mendez Alvaro' id='meal' className='meal'>
                        <Image src={meal} alt='componente mapa' />
                        <p>Méndez Álvaro</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Julian Camarillo' id='juca' className='juca' >
                        <Image src={juca} alt='componente mapa' />
                        <p>Julián Camarillo</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Av. America' id='amer' className='amer'>
                        <Image src={amer} alt='componente mapa' />
                        <Image src={amer2} alt='componente mapa' className='amer__2'/>
                        <p>Av. América</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Josefa Valcarcel' id='jova' className='jova'>
                        <Image src={jova} alt='componente mapa' />
                        <p>Josefa Valcárcel</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Chamartin' id='chama' className='chama'>
                        <Image src={chama} alt='componente mapa' />
                        <p>Chamartín</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Arturo Soria' id='arso' className='arso'>
                        <Image src={arso} alt='componente mapa' />
                        <p>Arturo <br/> Soria</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Campos de las Naciones' id='cana' className='cana'>
                        <Image src={cana} alt='componente mapa' />
                        <p>Campo de las <br/> Naciones</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Las Tablas - San Chinarro' id='sanchi' className='sanchi'>
                        <Image src={sanchi} alt='componente mapa' className='sanchi__1'/>
                        <Image src={sanchi2} alt='componente mapa' className='sanchi__2'/>
                        <Image src={sanchi3} alt='componente mapa' className='sanchi__3'/>
                        <p>Las Tablas<br/> San Chinarro</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Arroyo de la Vega' id='arva' className='arva'>
                        <Image src={arva} alt='componente mapa'className='arva__2'/>
                        <Image src={arva2} alt='componente mapa' />
                        <p>Arroyo de <br/>la Vega</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='El Viso' id='viso' className='viso'>
                        <Image src={viso} alt='componente mapa' />
                        <p>El Viso</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Salamanca' id='sala' className='sala'>
                        <Image src={sala} alt='componente mapa' />
                        <p>Salamanca</p>
                    </button>
                    <button onClick={!getMaxPrices ? toggleActive : null} name='Jeronimos' id='jero' className='jero'>
                        <Image src={jero} alt='componente mapa' />
                        <p>Jerónimos</p>
                    </button>
                </div>
            </div>
            <div className='filtroPatrimonio__filterPosition__selectors'>
                <div className='filtroPatrimonio__filterPosition__selectors__estado'>
                    <h3>Estado</h3>
                    <div className='filtroPatrimonio__filterPosition__selectors__estado__buttons'>
                        <button onClick={selectSaleOrRent} name='Alquiler' id='alq' className='alq'>Alquiler</button>
                        <button onClick={selectSaleOrRent} name='Venta' id='vent' className='vent'>Venta</button>
                    </div>
                </div>
                <div className='filtroPatrimonio__filterPosition__selectors__tipo'>
                    <h3>Tipo</h3>
                    <div className='filtroPatrimonio__filterPosition__selectors__tipo__buttons'>
                        <button onClick={addType} name='Oficina' id='oficina' className='oficina'>Oficina</button>
                        <button onClick={addType} name='Edificio' id='edificio' className='edificio'>Edificio</button>
                        <button onClick={addType} name='Local' id='retail' className='retail'>Local</button>
                    </div>
                    
                </div>
                <div className='filtroPatrimonio__filterPosition__selectors__tipo'>
                    <h3>Extras</h3>
                    <div className='filtroPatrimonio__filterPosition__selectors__tipo__buttons'>
                        <button onClick={addExtra} name='exclusiveOfficeBuilding' id='exclusiveOfficeBuilding' className='exclusiveOfficeBuilding'>Exclusivo oficinas</button>
                        <button onClick={addExtra} name='classicBuilding' id='classicBuilding' className='classicBuilding'>Edificio clásico</button>
                        <button onClick={addExtra} name='coworking' id='coworking' className='coworking'>Coworking</button>
                    </div>
                </div>
                <div className='filtroPatrimonio__filterPosition__selectors__sliders'>
                            <p className={disableSliders === true ? 'filtroPatrimonio__filterPosition__selectors__sliders__price' : 'filtroPatrimonio__filterPosition__selectors__sliders__priceDisabled'}>Precio €</p>
                            {disableSliders ?
                                <PricesSliders
                                className={'filtroPatrimonio__filterPosition__selectors__sliders__price'}
                                getAriaLabel={() => 'Minimum distance'}
                                value={price}
                                onChange={handlePriceInput}
                                valueLabelDisplay='on'
                                disableSwap
                                min={0}


                                max={saleOrRent[0] === 'Venta'  ? ( maxZonePrice !== 0 ? maxZonePrice : 50000000 ) : (maxZonePrice !== 0 ? maxZonePrice : 300000) }
                                step={saleOrRent[0]==='Venta' ? 500000 : 1000}

                                valueLabelFormat={saleOrRent[0] === 'Venta' ? value => `${new Intl.NumberFormat('de-DE').format(value)} €` : value => `${new Intl.NumberFormat('de-DE').format(value)} €/mes`}
                            />:
                            <PricesSliders
                                className={'filtroPatrimonio__filterPosition__selectors__sliders__priceDisabled'}
                                getAriaLabel={() => 'Minimum distance'}
                                value={price}
                                onChange={handlePriceInput}
                                valueLabelDisplay='on'
                                disableSwap
                                disabled='true'
                                min={0}
                                max={saleOrRent[0] === 'Venta' ? 50000000 : 300000}
                                step={saleOrRent[0]==='Venta' ? 500000 : 1000}
                                valueLabelFormat={saleOrRent[0] === 'Venta' ? value => `${new Intl.NumberFormat('de-DE').format(value)} €` : value => `${new Intl.NumberFormat('de-DE').format(value)} €/mes`}
                            />}
                            <p className={'filtroPatrimonio__filterPosition__selectors__sliders__surface'}>Superficie m<sup>2</sup></p>
                            <PricesSliders
                                className={'filtroPatrimonio__filterPosition__selectors__sliders__surface'}
                                getAriaLabel={() => 'Minimum distance'}
                                value={surface}
                                onChange={handleSurfaceInput}
                                valueLabelDisplay='on'
                                disableSwap
                                min={0}
                                max={20000}
                                step={100}
                                valueLabelFormat={value => `${new Intl.NumberFormat('de-DE').format(value)} m2`}
                            />
                        </div>
                        <div className='filtroPatrimonio__filterPosition__selectors__buscar'>
                            {disableButton=== false ?
                                <button onClick={filterResults} className='filtroPatrimonio__filterPosition__selectors__buscar__all' href={`${routes.Patrimonial}/1`}>Ver todos</button>
                                :
                                <button className='filtroPatrimonio__filterPosition__selectors__buscar__allDisabled'>Ver todos</button>
                            }
                            {disableButton===true ?
                                <button className='filtroPatrimonio__filterPosition__selectors__buscar__search' 
                                    onClick={filterResults} 
                                    href={`${routes.Patrimonial}/1`}>Buscar
                                </button>
                                :
                                <button className='filtroPatrimonio__filterPosition__selectors__buscar__searchDisabled' >Buscar</button>
                            }
                        </div>
                <div className='filtroPatrimonio__filterPosition__selectors__ref'>
                    <h4>Búsqueda por referencia</h4>
                    <input onChange={addRef} type='text'/>
                    <Image className={verLupa === true ? 'filtroPatrimonio__filterPosition__selectors__ref__lupa' : 'filtroPatrimonio__filterPosition__selectors__ref__lupaOculta'} src={lupa} alt='lupa'/>
                    {/* {itemRef!==elementId && elementId!=='' ?<p className='filtroPatrimonio__filterPosition__selectors__ref__existe'>La referencia no existe</p> : null } */}
                </div>
            </div>
        </div>
    </div>
    )
}