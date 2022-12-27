import React, { useEffect,useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import routes from '../../config/routes';
import { generalContext } from '../../providers/generalProvider';
import ContactIndex from '../../components/ContactInfo/ContactIndex';
import Header from '../../components/Header/Header';
import { getCosta } from '../../api-requests/requests';
import { Carousel } from 'react-responsive-carousel';
import { BarLoader } from 'react-spinners';
import banera from '../../assets/SVG/mobile/anuncios/anuncios_banos.svg';
import habit from '../../assets/SVG/mobile/anuncios/anuncios_habitaciones.svg';
import piscinaImg from '../../assets/SVG/mobile/anuncios/anuncios_piscina.svg';
import refer from '../../assets/SVG/mobile/anuncios/anuncios_referencia.svg';
import sup from '../../assets/SVG/mobile/anuncios/anuncios_spfcie.svg';
import order from '../../assets/SVG/mobile/comun/flechaOrdenar.svg';
import supP from '../../assets/SVG/web/anuncios/anuncios_superficieP.svg';
import mayor from '../../assets/SVG/web/comunes/mayor.svg'

export default function Costa({orderedItems, pages, query}){

    const router = useRouter();
    const {porfecha, page} = query
    const arrPages = new Array(pages).fill(null)
    const [URLwithoutPage, setURLwithoutPage] = useState([])
    if(porfecha !== undefined)          URLwithoutPage.push(`porfecha=${porfecha}`)

    const [, setOrderedItems] = useState([])
    const [perPage] = useState(30);
    const [pageNumber, setPageNumber] = useState(0)
    const [state, setState] = useContext(generalContext);
    const [coord, setCoord] = useState(0);
    const [pagElements, setPagElements] = useState();
    const [orderItems, setOrderItems] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFound, setIsFound] = useState(false);

    const setPosition = () => {
        if (typeof window !== 'undefined') {
            if (coord !== 0) {
                window.localStorage.setItem(
                    'storedPosition2', JSON.stringify(coord)
                    )
                }
        }
    }

    const pageCount = pages;
    const getPostItems = orderedItems?.map(item => {
        return item.showOnWeb === true? 
        <div onClick={setPosition} className='costa__list__item' key={item._id} details={item}>
            {item.gvOperationClose === 'Alquilado' || item.gvOperationClose === 'Vendido' ?
                <div className='wrapper'>
                    <div className='costa__list__item__status'>
                        <p>{item.gvOperationClose}</p>
                    </div>
                    <Carousel 
                        className='costa__list__item__images'
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        <Image width={400} height={300} src={item.images.main} alt={item.title}/>
                        {/* {item.images.others.map((image)=> (
                            <img key={item.title} src={image} alt={item.title}/>
                        ))} */}
                    </Carousel>
                    <div>
                        <div className='costa__list__item__text'>
                            {item.adType.length === 1 ? 
                                <h2 className='costa__list__item__text__price'>{item.adType.map(type => 
                                    type==='Venta' && item.sale.saleShowOnWeb ? 
                                    `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`:
                                    type==='Alquiler' && item.rent.rentShowOnWeb ?
                                    `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                                </h2>
                                :
                                <h2 className='costa__list__item__text__prices'>
                                    {item.sale.saleShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p>:null}
                                    {item.rent.rentShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p>:null}
                                </h2>
                            }                        
                            <h2 className='costa__list__item__text__title'>{item.title}</h2>
                            <h3 className='costa__list__item__text__street'>{item.webSubtitle}</h3>
                            <ul className='costa__list__item__text__characteristics'>
                                {item.buildSurface !== 0 ? 
                                    <li><span><Image width={11} height={16} src={sup} alt='superficie'/></span>{item.buildSurface}m<sup>2</sup></li>
                                :null}
                                {item.plotSurface !== 0 ?
                                    <li><span><Image width={15} height={12} src={supP} alt='superficie'/></span>{item.plotSurface}m<sup>2</sup></li>
                                :null}
                                {item.quality.outdoorPool !== 0 ?
                                    <li><span><Image width={30} height={12} src={piscinaImg} alt='piscina'/></span>{item.quality.outdoorPool}</li>
                                :null}
                                {item.quality.bathrooms !== 0 ?
                                    <li><span><Image width={15} height={12} src={banera} alt='baños'/></span>{item.quality.bathrooms}</li>
                                :null}
                                {item.quality.bedrooms !== 0 ?
                                    <li><span><Image width={18} height={12} src={habit} alt='habitaciones'/></span>{item.quality.bedrooms}</li>
                                :null}
                                {item.adReference !== 0 ? 
                                    <li><span><Image width={13} height={12} src={refer} alt='referencia'/></span><p>Ref {item.adReference}</p></li>
                                :null}
                            </ul>
                            <div className='costa__list__item__text__blocker'></div>
                        </div>
                    </div>
                </div>
                :
                <div>
                   {/* {isLoading ? */}
                    <Carousel 
                        className='costa__list__item__images'
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        <Image width={400} height={300} src={item.images.main} alt={item.title}/>
                        {/* {item.images.others.map((image)=> (
                            <img key={item.title} src={image} alt={item.title}/>
                        ))} */}
                    </Carousel>
                    {/* : <div className='spinnerBar'>  
                            <BarLoader color="#000000" width='80px' height='2px' className='barloader'/>
                        </div>
                   } */}
                    <Link onClick={() => {setState({item:item})}}  
                    href={`${routes.ItemResidential}/${item._id}`}>
                        <div className='costa__list__item__text'>
                            {item.adType.length === 1 ? 
                                <h2 className='costa__list__item__text__price'>{item.adType.map(type => 
                                    type==='Venta' && item.sale.saleShowOnWeb ? 
                                    `${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`:
                                    type==='Alquiler' && item.rent.rentShowOnWeb ?
                                    `${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes` : null)}
                                </h2>
                                :
                                <h2 className='costa__list__item__text__prices'>
                                    {item.sale.saleShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.sale.saleValue)} €`}</p>:null}
                                    {item.rent.rentShowOnWeb ? <p>{`${new Intl.NumberFormat('de-DE').format(item.rent.rentValue)} € mes`}</p>:null}
                                </h2>
                            }                        
                            <h2 className='costa__list__item__text__title'>{item.title}</h2>
                            <h3 className='costa__list__item__text__street'>{item.webSubtitle}</h3>
                            <ul className='costa__list__item__text__characteristics'>
                                {item.buildSurface !== 0 ? 
                                    <li><span><Image width={11} height={16} src={sup} alt='superficie'/></span>{item.buildSurface}m<sup>2</sup></li>
                                :null}
                                {item.plotSurface !== 0 ?
                                    <li><span><Image width={15} height={12} src={supP} alt='superficie'/></span>{item.plotSurface}m<sup>2</sup></li>
                                :null}
                                {item.quality.outdoorPool !== 0 ?
                                    <li><span><Image width={21} height={12} src={piscinaImg} alt='piscina'/></span>{item.quality.outdoorPool}</li>
                                :null}
                                {item.quality.bathrooms !== 0 ?
                                    <li><span><Image width={15} height={12} src={banera} alt='baños'/></span>{item.quality.bathrooms}</li>
                                :null}
                                {item.quality.bedrooms !== 0 ?
                                    <li><span><Image width={18} height={12} src={habit} alt='habitaciones'/></span>{item.quality.bedrooms}</li>
                                :null}
                                {item.adReference !== 0 ? 
                                    <li><span><Image width={13} height={12} src={refer} alt='referencia'/></span><p>Ref {item.adReference}</p></li>
                                :null}
                            </ul>
                            <div className='costa__list__item__text__clickable'></div>
                        </div>
                    </Link>
                </div>
            }
        </div> : null
    })

    useEffect(() => {
        if (state.length>=1) {
            let reducedState = []
            /* console.log(state) */
            state.map(item => 
                item.showOnWeb === true ? reducedState.push(item) : null
            )
            if (typeof window !== 'undefined')
            window.localStorage.setItem(
                'storedState', JSON.stringify(reducedState)
            )
        }
    },[state])

    useEffect(() => {
            const localPosition = window.localStorage.getItem('storedPosition')
            if (localPosition !== 0) {
                window.scroll( {
                    top:localPosition-650
                })
            }else{
                window.scroll(
                    {top:0}
                )
            }
    },[])

    useEffect(() => {
        window.localStorage.removeItem('storedState2')
    },[])

    // useEffect (() => {
    //     const localState = window.localStorage.getItem('storedState')
    //     let costaItems = []
    //     if (localState) {
    //         const itemList = JSON.parse(localState)
    //         const array = Object.values(itemList.ads);
    //         itemList.ads.map(item => 
    //             costaItems.push(item)
    //         )
    //         const sortArray = (a, b) => {
    //             if (a.sale.saleValue < b.sale.saleValue) {return 1;}
    //             if (a.sale.saleValue > b.sale.saleValue) {return -1;}
    //             return 0
    //         }
    //         let orderedArrayPrice = array.sort(sortArray);
    //         costaItems=orderedArrayPrice;
    //     }
    //      setOrderedItems(costaItems)
    // },[state])

    useEffect(() => {
        let splitedLocation = window.location.href.split('/');
        let elements = []
        setPageNumber(parseInt(splitedLocation[4])-1)
        for(let i = 0; i< pageCount; i++){
            if(URLwithoutPage.length !== 0) {
                const URL = URLwithoutPage.join('&')
                elements.push(
                <li key={i} className={i + 1 === parseInt(splitedLocation[4]) ? 'costa__pagination__list__item currentPage' : 'costa__pagination__list__item'}><a href={`/costa/${i + 1}?${URL}&page=${i+1}`}>{i + 1}</a></li>
                )
            }else{
                elements.push(
                    <li key={i} className={i + 1 === parseInt(splitedLocation[4]) ? 'costa__pagination__list__item currentPage' : 'costa__pagination__list__item'}><a href={`/costa/${i + 1}?page=${i+1}`}>{i + 1}</a></li>
                    )
            }
        }
        setPagElements(elements)
    },[URLwithoutPage, pageCount])

    // useEffect(() => {
    //     //let costaItems = []
    //     let totalAds = 0;
    //     const activeFilters = {};
    //     let splitedLocation = window.location.href.split('/');
    //     activeFilters.page = parseInt(splitedLocation[4])
    //     /* console.log(activeFilters) */
    //     getCosta().then(rusticoItems =>{
    //         console.log(rusticoItems)
    //             totalAds = rusticoItems.totalAds;
    //              /* console.log('En patrimonio:',rusticoItems) */
    //              setState(rusticoItems);
    //              window.localStorage.setItem('storedState', JSON.stringify(rusticoItems))
    //              window.localStorage.setItem('totalAds', totalAds)
    //              setIsLoading(true)
    //              setIsFound(true) 
    //              /* console.log(items.ads)
    //              items.ads.forEach(item => console.log(item.zone, item.title)) */
    //          })
    // },[setState])

    useEffect(() => {
            const localPosition = window.localStorage.getItem('storedPosition2')
            if (localPosition !== 0) {
                window.scroll( {
                    top:localPosition-700
                })
            }else{
                window.scroll(
                    {top:0}
                )
            }
    },[])

    const onPrice = () => {
        setIsLoading(false)
        if (typeof window !== 'undefined') {
            let activeFilters = {};
            activeFilters = { ...activeFilters, orderByDate: false };
            let newquery = query
            newquery.porfecha = "false"
            toggleOrderItems()
            navigateToNewPath(1,newquery)

        }
    }

    const onDate = () => {
        if (typeof window !== 'undefined') {
            setIsLoading(false)
            let activeFilters = {};
            activeFilters = { ...activeFilters, orderByDate: true }
            /* console.log(activeFilters) */
            // console.log(tipo, tipodeinmueble, referencia, zona, garaje, piscina, terraza, page)
            // console.log(typeof tipo)
            let newquery = query
            newquery.porfecha = "true"
            toggleOrderItems()
            navigateToNewPath(1,newquery)
        }
    }

    if (typeof window !== 'undefined'){
        window.onmousemove = function (e){
            var y = e.pageY
            setCoord(y)
        }
        
    }

    const toggleOrderItems = () => {
        setOrderItems (!orderItems)
    }

    const deletePosition = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('storedPosition2')
        }
    }

    function navigateToNewPath (page, query){
        const {tipo, tipodeinmueble, referencia, zona, garaje, piscina, terraza, porfecha, precioventamax, precioventamin, precioalquilermax, precioalquilermin, superficiemin, superficiemax} = query
        // console.log( tipo, tipodeinmueble, referencia, zona, garaje, piscina, terraza, porfecha, precioventamax, precioventamin, precioalquilermax, precioalquilermin, superficiemin, superficiemax)
        let queryFilters ={}
            if(tipo !== undefined)                                  queryFilters = { ...queryFilters, tipo: tipo }
            if(tipodeinmueble !== undefined)                        queryFilters = { ...queryFilters, tipodeinmueble: tipodeinmueble }
            if(referencia !== undefined)                            queryFilters = { ...queryFilters, referencia: referencia }
            if(zona !== undefined)                                  queryFilters = { ...queryFilters, zona: zona }
            if(garaje !== undefined)                                queryFilters = { ...queryFilters, garaje: true }
            if(piscina !== undefined)                               queryFilters = { ...queryFilters, piscina: true }
            if(terraza !== undefined)                               queryFilters = { ...queryFilters, terraza: true }
            if(porfecha === undefined || porfecha === "true")       queryFilters = { ...queryFilters, porfecha: true }
            if(porfecha === "false")                                queryFilters = { ...queryFilters, porfecha: false }
            if(precioventamax !== undefined)                        queryFilters = { ...queryFilters, precioventamax: precioventamax }
            if(precioventamin !== undefined)                        queryFilters = { ...queryFilters, precioventamin: precioventamin }
            if(precioalquilermax !== undefined)                     queryFilters = { ...queryFilters, precioalquilermax: precioalquilermax }
            if(precioalquilermin !== undefined)                     queryFilters = { ...queryFilters, precioalquilermin: precioalquilermin }
            if(superficiemin !== undefined)                         queryFilters = { ...queryFilters, superficiemin: superficiemin }
            if(superficiemax !== undefined)                         queryFilters = { ...queryFilters, superficiemax: superficiemax }
            
            queryFilters = { ...queryFilters, page: page.toString() }
            const newRoute = {
                pathname: `${routes.Costa}/${page}`,
                query: queryFilters,
              };
              // Navega a la nueva ruta 
              router.push(newRoute);
    }

    return (
        <div>
        {orderedItems.length>0 ? 
            <div>
                <Header/>
                <h1 className='costa__title'>Costa</h1>
                <div className='costa__buttons'>
                    <div className='costa__buttons__order'>
                        <p onClick={toggleOrderItems} className='costa__buttons__order__title' style={{cursor: "pointer"}}>Ordenar por <Image src={order} alt='boton ordenar por'/></p>
                        <ul className={orderItems === false ? 'costa__buttons__order__listDisabled': 'costa__buttons__order__list'}>
                            <li onClick={onPrice} style={{cursor: "pointer"}} className='costa__buttons__order__list__first'>Precio más alto</li>
                            <li onClick={onDate} style={{cursor: "pointer"}}>Más reciente</li>
                        </ul>
                    </div>
                </div>
                <div className='costa__list'>
                    {getPostItems}
                </div>
                <div onClick={deletePosition} className='costa__pagination'>
                    <ul className='costa__pagination__list'>
                        {parseInt(page) !== 1 && <li className='costa__pagination__list__item'><a className='costa__pagination__list__item__back' onClick={()=>navigateToNewPath(parseInt(page)-1, query)} style={{cursor:"pointer"}}> <Image width={8} height={10} src={mayor} alt='simbolo mayor' /> </a></li> }
                        {arrPages.map((__pag, i)=>{
                            return <li key={i} className={i + 1 ===  parseInt(page)? 'costa__pagination__list__item currentPage' : 'costa__pagination__list__item'}><p onClick={()=>navigateToNewPath(i+1, query)} style={{cursor:"pointer"}}>{i + 1}</p></li>
                        })}
                        {parseInt(page) !== pagElements?.length && <li className='costa__pagination__list__item'><p className='costa__pagination__list__item__next' onClick={()=>navigateToNewPath(parseInt(page) + 1, query)} style={{cursor:"pointer"}}> <Image width={8} height={10} src={mayor} alt='simbolo menor' /> </p></li>}
                    </ul>
                </div>
                <ContactIndex/>
            </div>
            :
            <div className='costa__empty'>
            {
                // isFound ?
                (
                    <div className='costa__empty'>
                    <Header/>
                <h2 className='costa__empty__text'>Lamentablemente no existen anuncios bajo sus criterios de búsqueda</h2>
                <Link className='costa__empty__button' to={routes.Home}>Volver a la home</Link>            
           
                    </div>
                )
            //    :
            //    <BarLoader color="#000000" width='150px' height='2px'/>

            }
                 </div>
        }
    </div>
    )
}

export async function getServerSideProps(context){
    let queryFilters = {}
    const query = context.query
    // console.log(query)
    const {tipo, tipodeinmueble, referencia, zona, garaje, piscina, terraza, page, porfecha, precioventamax, precioventamin, precioalquilermax, precioalquilermin, superficiemin, superficiemax} = context.query
    // console.log(tipo, tipodeinmueble, referencia, zona, garaje, piscina, terraza, porfecha, page )
    // console.log(typeof porfecha)
    if(tipo !== undefined)                  queryFilters = { ...queryFilters, adType: tipo.split('-') }
    if(tipodeinmueble !== undefined)        queryFilters = { ...queryFilters, adBuildingType: tipodeinmueble.split('-') }
    if(referencia !== undefined)            queryFilters = { ...queryFilters, adReference: referencia }
    if(zona !== undefined)                  queryFilters = { ...queryFilters, zone: zona.split('-') }
    if(garaje !== undefined)                queryFilters = { ...queryFilters, garage: true }
    if(piscina !== undefined)               queryFilters = { ...queryFilters, swimmingPool: true }
    if(terraza !== undefined)               queryFilters = { ...queryFilters, terrace: true }
    if(page !== undefined)                  queryFilters = { ...queryFilters, page: page }
    if(porfecha === "true"){
        queryFilters = { ...queryFilters, orderByDate: true }
    } else{
        queryFilters = { ...queryFilters, orderByDate: false }
    }
    if(precioventamax !== undefined)        queryFilters = { ...queryFilters, maxSalePrice: precioventamax }
    if(precioventamin !== undefined)        queryFilters = { ...queryFilters, minSalePrice: precioventamin }
    if(precioalquilermax !== undefined)     queryFilters = { ...queryFilters, maxRentPrice: precioalquilermax }
    if(precioalquilermin !== undefined)     queryFilters = { ...queryFilters, minRentPrice: precioalquilermin }
    if(superficiemin !== undefined)         queryFilters = { ...queryFilters, minSurface: superficiemin }
    if(superficiemax !== undefined)         queryFilters = { ...queryFilters, maxSurface: superficiemax }
    
    const {ads, totalAds} = await getCosta(queryFilters)
    // console.log('totales',totalAds)
    const orderedItems = ads
    const elements = totalAds
    const pages = Math.ceil(elements / 30)

    // console.log(orderedItems.length)
    return {
        props: {
            orderedItems,
            elements,
            pages, 
            query, 
            queryFilters
        }
    }
}