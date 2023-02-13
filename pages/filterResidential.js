import React, { useState, useContext, useEffect } from 'react';
import carretera1 from './../assets/maps/mapaR/carreteras/carretera1.svg';
import carretera2 from './../assets/maps/mapaR/carreteras/carretera2.svg';
import carretera3 from './../assets/maps/mapaR/carreteras/carretera3.svg';
import carretera4 from './../assets/maps/mapaR/carreteras/carretera4.svg';
import carretera5 from './../assets/maps/mapaR/carreteras/carretera5.svg';
import carretera6 from './../assets/maps/mapaR/carreteras/carretera6.svg';
import carretera62 from './../assets/maps/mapaR/carreteras/carretera6-2.svg';
import carretera7 from './../assets/maps/mapaR/carreteras/carretera7.svg';
import carretera8 from './../assets/maps/mapaR/carreteras/carretera8.svg';
import alam from './../assets/maps/mapaR/barrios/alam.svg';
import alma from './../assets/maps/mapaR/barrios/alma.svg';
import arav from './../assets/maps/mapaR/barrios/arav.svg';
import cond from './../assets/maps/mapaR/barrios/cond.svg';
import cort from './../assets/maps/mapaR/barrios/cort.svg';
import enci from './../assets/maps/mapaR/barrios/enci.svg';
import finc from './../assets/maps/mapaR/barrios/finc.svg';
import flori from './../assets/maps/mapaR/barrios/flori.svg';
import fuen1 from './../assets/maps/mapaR/barrios/fuen1.svg';
import fuen2 from './../assets/maps/mapaR/barrios/fuen2.svg';
import hisp from './../assets/maps/mapaR/barrios/hisp.svg';
import jero from './../assets/maps/mapaR/barrios/jero.svg';
import just from './../assets/maps/mapaR/barrios/just.svg';
import mira from './../assets/maps/mapaR/barrios/mira.svg';
import moal from './../assets/maps/mapaR/barrios/moal.svg';
import mocl from './../assets/maps/mapaR/barrios/mocl.svg';
import mora from './../assets/maps/mapaR/barrios/mora.svg';
import nuev from './../assets/maps/mapaR/barrios/nuev.svg';
import pala from './../assets/maps/mapaR/barrios/pala.svg';
import prla from './../assets/maps/mapaR/barrios/prla.svg';
import puer from './../assets/maps/mapaR/barrios/puer.svg';
import rosa from './../assets/maps/mapaR/barrios/rosa.svg';
import sala from './../assets/maps/mapaR/barrios/sala.svg';
import somo from './../assets/maps/mapaR/barrios/somo.svg';
import vald1 from './../assets/maps/mapaR/barrios/vald1.svg';
import vald2 from './../assets/maps/mapaR/barrios/vald2.svg';
import viso from './../assets/maps/mapaR/barrios/viso.svg';
import avion from './../assets/maps/avion.svg';
import boca from './../assets/maps/boca.svg';
import lupa from './../assets/SVG/mobile/comun/filtros_lupa.svg'
import Header from './../components/Header/Header';
import { generalContext } from './../providers/generalProvider';
//import { NavLink, generatePath } from 'react-router-dom';
import Link, { LinkProps } from 'next/link';
import routes from './../config/routes';
import { getZoneId } from './../globalFunctions/MapZones/MapZones';
import Image from 'next/image';
import Router from 'next/router';
import useWindowSize from '../hooks/useWindowsSize';

export default function FilterResidential() {

    const [selected] = useState([]);
    const [selectedActive, setSelectedActive] = useState(false);
    const [saleOrRent] = useState([]);
    const [saleOrRentActive, setSaleOrRentActive] = useState(false);
    const [typeHouse] = useState([]);
    const [typeHouseActive, setTypeHouseActive] = useState(false);
    const [extras] = useState([]);
    const [extrasActive, setExtrasActive] = useState(false);
    const [/*itemRef*/, setItemRef] = useState('initial');
    //const [ref, setRef] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [verLupa, setVerLupa] = useState(true);
    const [state ] = useContext(generalContext);
    const [itemPage] = useState([]);
    const [elementId, setElementId] = useState('');
    /*const [filter, setFilter] = useState({});*/
    const size = useWindowSize();
console.log(size)

    const toggleActive = (e) => {
        /* console.log(e.currentTarget.name) */
        if (e.currentTarget.className === e.currentTarget.id) {
            if(e.currentTarget.className === 'nuev' || e.currentTarget.className === 'hisp'){
            selected.push(e.currentTarget.name);
            /* console.log(selected); */
                document.getElementById('nuev').className = 'nuev active';
                document.getElementById('hisp').className = 'hisp active';
                //hago una llamada al endpoint para obtener el precio máximo de la zona solo si 
                //saleOrRent.length === 1
                
            }else{
                e.currentTarget.className = `${e.currentTarget.className} active`
                selected.push(e.currentTarget.name)
                /* console.log(selected) */
                
            }
        } else {
            if(e.currentTarget.id === 'nuev' || e.currentTarget.id === 'hisp'){
                document.getElementById('nuev').classList.remove('active');
                document.getElementById('hisp').classList.remove('active');
                const elementName = e.currentTarget.name;
                const newSelected = selected.filter(item => item !== elementName);
                selected.splice(0, selected.length, ...newSelected);
                
            }else {
                e.currentTarget.className = `${e.currentTarget.id}`
                const elementName = e.currentTarget.name;
                const newSelected = selected.filter(item => item !== elementName);
                selected.splice(0, selected.length, ...newSelected);
                
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
        setElementId(e.target.value)
        /*console.log('valor',e.target.value)*/
        /*console.log('temRef',itemRef)*/
        /*console.log('elementId',elementId)*/

    }


    const filterResults = () => {
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
            const querySelected = selectedIds.join('-')
            const query = `zona=${querySelected}`
            queryString.push(query)
        }

        if (extras.length) {
            if (extras.includes('garage')) {
                activeFilters = { ...activeFilters, garage: true }
                const query = `garaje=${true}`
                queryString.push(query)
            }

            if (extras.includes('swimmingPool')) {
                activeFilters = { ...activeFilters, swimmingPool: true }
                const query = `piscina=${true}`
                queryString.push(query)
            }

            if (extras.includes('terrace')) {
                activeFilters = { ...activeFilters, terrace: true }
                const query = `terraza=${true}`
                queryString.push(query)
            }
        }
        /* console.log(activeFilters) */
        window.localStorage.setItem('residentialFilters', JSON.stringify(activeFilters))
        const queryPage = `page=1`
        queryString.push(queryPage)
        const query = queryString.join('&')
        // console.log(query)
        Router.push(`${routes.Residential}/${1}?${query}`)

    }
    useEffect(() => {
        if (selectedActive === true || saleOrRentActive === true || typeHouseActive === true || extrasActive === true || elementId !== '') {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
    }, [elementId, selectedActive, saleOrRentActive, typeHouseActive, extrasActive])

    useEffect(() => {
        if (state.length > 0) {
            state.map(itemState => {
              /*console.log(state)*/
                if (elementId === itemState.adReference) {
                  /*console.log('itemState',itemState)*/
                    setItemRef(itemState.adReference)
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
        <div className='filtroResidencial'>
            <Header />
            <h2 className='filtroResidencial__title'>Mapa</h2>
            <h3 className='filtroResidencial__subTitle'>Seleccione una o varias zonas</h3>
            <div className='filterPosition'>
                <div className='filterPosition__mapContainer'>
                    <div className='mapa'>
                        <Image width={size >= 1350 ? 536*1.54 : 536*1.6 } height={size >= 1350 ? 392*1.53 : 353*1.1 } className='c1' src={carretera1} alt='componente mapa' />
                        <Image width={size >= 1350 ? 262*1.54 : 262*1.6 } height={size >= 1350 ? 70*1.53 : 63*1.1 } className='c2' src={carretera2} alt='componente mapa' />
                        <Image width={size >= 1350 ? 466*1.54 : 466*1.6 } height={size >= 1350 ? 352*1.53 : 316*1.1 } className='c3' src={carretera3} alt='componente mapa' />
                        <Image width={size >= 1350 ? 97*1.54 : 97*1.6 } height={size >= 1350 ? 60*1.53 : 54*1.1 } className='c4' src={carretera4} alt='componente mapa' />
                        <Image width={size >= 1350 ? 166*1.54 : 166*1.6 } height={size >= 1350 ? 77*1.53 : 70*1.1 } className='c5' src={carretera5} alt='componente mapa' />
                        <Image width={size >= 1350 ? 15*1.54 : 15*1.6 } height={size >= 1350 ? 176*1.53 : 158*1.1 } className='c6' src={carretera6} alt='componente mapa' />
                        <Image width={size >= 1350 ? 8*1.54 : 8*1.6 } height={size >= 1350 ? 26*1.53 : 23*1.1 } className='c62' src={carretera62} alt='componente mapa' />
                        <Image width={size >= 1350 ? 86*1.54 : 86*1.6 } height={size >= 1350 ? 12*1.53 : 11*1.1 } className='c7' src={carretera7} alt='componente mapa' />
                        <Image width={size >= 1350 ? 97*1.54 : 97*1.6 } height={size >= 1350 ? 54*1.53 : 49*1.1 } className='c8' src={carretera8} alt='componente mapa' />
                        <Image className='avion' src={avion} alt='componente mapa' />
                        <Image className='boca' src={boca} alt='componente mapa' />
                        <div className='a1'>A1</div>
                        <div className='a2'>A2</div>
                        <div className='a3'>A3</div>
                        <div className='a5'>A5</div>
                        <div className='a6'>A6</div>
                        <button name='Monteclaro' onClick={toggleActive} id='mocl' className='mocl'>
                            <p>Monte <br /> Claro</p>
                            <Image type='image' src={mocl} alt='componente mapa' />
                            <div></div>
                        </button>
                        <button type='image' onClick={toggleActive} name='Montealina' id='moal' className='moal'>
                            <Image type='image' src={moal} alt='componente mapa' />
                            <p>Monte<br />Alina</p>
                        </button>
                        <button onClick={toggleActive} name='Prado Largo' id='prla' className='prla'>
                            <Image type='image' src={prla} alt='componente mapa' />
                            <p>Prado<br />Largo</p>
                        </button>
                        <button onClick={toggleActive} name='Las Encinas' id='enci' className='enci'>
                            <Image type='image' src={enci} alt='componente mapa' />
                            <p>Las Encinas</p>
                        </button>
                        <button onClick={toggleActive} name='Alamo de Bulanas' id='alam' className='alam'>
                            <Image type='image' src={alam} alt='componente mapa' />
                            <p>Álamos de<br />Bularas</p>
                        </button>
                        <button onClick={toggleActive} name='La Florida' id='flori' className='flori'>
                            <Image type='image' src={flori} alt='componente mapa' />
                            <p>La Florida</p>
                        </button>
                        <button onClick={toggleActive} name='La Finca' id='finc' className='finc'>
                            <Image type='image' src={finc} alt='componente mapa' />
                            <p>La Finca</p>
                        </button>
                        <button onClick={toggleActive} name='Somosaguas' id='somo' className='somo'>
                            <Image type='image' src={somo} alt='componente mapa' />
                            <p>Somosaguas</p>
                        </button>
                        <button onClick={toggleActive} name='Aravaca' id='arav' className='arav'>
                            <Image type='image' src={arav} alt='componente mapa' />
                            <p>Aravaca</p>
                        </button>
                        <button onClick={toggleActive} name='Valdemarin' id='vald1' className='vald1'>
                            <Image type='image' src={vald1} alt='componente mapa' />
                            <Image type='image' className='vald2' src={vald2} alt='componente mapa' />
                            <p>Valdemarín</p>
                        </button>
                        <button onClick={toggleActive} name='Colonia Fuentelarreyna' id='fuen1' className='fuen1'>
                            <Image type='image' height={size >= 1350 ? 95 : 66} src={fuen1} alt='componente mapa' />
                            <Image type='image' className='fuen2' src={fuen2} alt='componente mapa' />
                            <p>Fuentelarreyna</p>
                        </button>
                        <button onClick={toggleActive} name='Puerta de Hierro' id='puer' className='puer' >
                            <Image height={size >= 1350 ? 90 : 61} type='image' src={puer} alt='componente mapa' />
                            <p>Puerta de <br />Hierro</p>
                        </button>
                        <button onClick={toggleActive} name='Rosales' id='rosa' className='rosa'>
                            <Image height={size >= 1350 ? 55 : 45} type='image' src={rosa} alt='componente mapa' />
                            <p>Rosales</p>
                        </button>
                        <button onClick={toggleActive} name='Palacio' id='pala' className='pala'>
                            <Image height={size >= 1350 ? 70 : 59} type='image' src={pala} alt='componente mapa' />
                            <p>Palacio</p>
                        </button>
                        <button onClick={toggleActive} name='Mirasierra' id='mira' className='mira'>
                            <Image height={size >= 1350 ? 95 : 86} type='image' src={mira} alt='componente mapa' />
                            <p>Mirasierra</p>
                        </button>
                        <button onClick={toggleActive} name='Almagro' id='alma' className='alma'>
                            <Image height={size >= 1350 ? 90 : 85} type='image' src={alma} alt='componente mapa' />
                            <p>Almagro</p>
                        </button>
                        <button onClick={toggleActive} name='Justicia' id='just' className='just'>
                            <Image type='image' src={just} alt='componente mapa' />
                            <p>Justicia</p>
                        </button>
                        <button onClick={toggleActive} name='Cortes' id='cort' className='cort'>
                            <Image type='image' src={cort} alt='componente mapa' />
                            <p>Cortes</p>
                        </button>
                        <button onClick={toggleActive} name='Nueva España - Hispanoamerica' id='nuev' className='nuev'>
                            <Image type='image' src={nuev} alt='componente mapa' />
                            <p>Nueva España</p>
                        </button>
                        <button onClick={toggleActive} name='Nueva España - Hispanoamerica' id='hisp' className='hisp'>
                            <Image type='image' src={hisp} alt='componente mapa' />
                            <p>Hispano <br /> América</p>
                        </button>
                        <button onClick={toggleActive} name='El Viso' id='viso' className='viso'>
                            <Image type='image' src={viso} alt='componente mapa' />
                            <p>El Viso</p>
                        </button>
                        <button onClick={toggleActive} name='Barrio Salamanca' id='sala' className='sala'>
                            <Image height={size >= 1350 ? 80 : 70} type='image' src={sala} alt='componente mapa' />
                            <p>Salamanca</p>
                        </button>
                        <button onClick={toggleActive} name='Jeronimos' id='jero' className='jero'>
                            <Image type='image' src={jero} alt='componente mapa' />
                            <p>Jerónimos</p>
                        </button>
                        <button onClick={toggleActive} name='La Moraleja' id='mora' className='mora'>
                            <Image height={size >= 1350 ? 95 : 90} type='image' src={mora} alt='componente mapa' />
                            <p>Moraleja</p>
                        </button>
                        <button onClick={toggleActive} name='Conde de Orgaz' id='cond' className='cond'>
                            <Image height={size >= 1350 ? 70 : 53} type='image' src={cond} alt='componente mapa' />
                            <p>Conde<br />Orgaz</p>
                        </button>
                    </div>
                </div>
                <div className='selectors'>
                    <div className='selectors__estado'>
                        <h3>Estado</h3>
                        <div className='selectors__estado__buttons'>
                            <button onClick={(e) => {
                                selectSaleOrRent(e)
                            }} name='Venta' id='vent' className='vent'>Venta</button>
                            <button onClick={(e) => {
                                selectSaleOrRent(e)
                            }} name='Alquiler' id='alq' className='alq'>Alquiler</button>
                        </div>
                    </div>
                    <div className='selectors__tipo'>
                        <h3>Tipo</h3>
                        <div className='selectors__tipo__buttons'>
                            <button onClick={(e) => addType(e)} name='Casa' id='casa' className='casa'>Casa</button>
                            <button onClick={(e) => addType(e)} name='Piso' id='piso' className='piso'>Piso</button>
                            <button onClick={(e) => addType(e)} name='Parcela' id='parcela' className='parcela'>Parcela</button>
                        </div>
                    </div>
                    <div className='selectors__extras'>
                        <h3>Extras</h3>
                        <div className='selectors__extras__buttons'>
                            <button onClick={(e) => addExtra(e)} name='swimmingPool' id='piscina' className='piscina'>Piscina</button>
                            <button onClick={(e) => addExtra(e)} name='garage' id='garaje' className='garaje'>Garaje</button>
                            <button onClick={(e) => addExtra(e)} name='terrace' id='terraza' className='terraza'>Terraza</button>
                        </div>
                    </div>
                    <div className='selectors__buscar'>
                        {/* href={`${routes.Residential}/${1}`} */}
                        {disableButton === false ?
                            <button onClick={filterResults} className='selectors__buscar__all' >Ver todos</button>
                            :
                            <button className='selectors__buscar__allDisabled'>Ver todos</button>
                        }
                        {disableButton === true ?
                            // <button className='selectors__buscar__search' onClick={filterResults}>Buscar
                            // </button>
                            /**  Comentado para probar a hacer la llamada sin que vaya a la vista de Residential
                            */
                            <button className='selectors__buscar__search'
                                onClick={filterResults}
                                //href={`${routes.Residential}/${1}?${queryURL}`}
                                >Buscar
                            </button>
                            :
                            <button className='selectors__buscar__searchDisabled' >Buscar</button>
                        }
                    </div>
                    <div className='selectors__ref'>
                        <h4>Búsqueda por referencia</h4>
                        <input onChange={addRef} type='text' />
                        <Image className={verLupa === true ? 'selectors__ref__lupa' : 'selectors__ref__lupaOculta'} src={lupa} alt='lupa' />
                        {/* {itemRef !== elementId && elementId !== '' ? <p className='selectors__ref__existe'>La referencia no existe</p> : null} */}
                    </div>
                </div>
            </div>
        </div >
    )

}