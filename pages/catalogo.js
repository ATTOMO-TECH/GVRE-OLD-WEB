import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import Header from '../components/Header/Header';
import { catalogs } from '../constants/globalconstants';
import CatalogCard from '../components/CatalogCard/catalog-card';
import FullScreenPDF from '../components/CatalogModal/catalof-modal';

const CatalogPDF = dynamic(() => import("../components/catalog-pdf/catalog-pdf"), {
    ssr: false
  });

export default function Catalog(){

    const [displayFullScren, setDisplayFullScren] = useState(false);
    const [number, setNumber] = useState(1)

    useEffect(()=>{
        window.scroll({top:0})
    },[])

    return (
        <div className='catalogo__main__container'>
            <div className='catalogo__main__container__banner'>
                <div style={{height: "97px", backgroundColor: "rgba(255, 255, 255, 0.623)", zIndex: "1000"}}>
                    <Header />
                </div>
                <CatalogPDF catalogs={catalogs} catalogNumber={number} displayFullScren={displayFullScren} setDisplayFullScren={setDisplayFullScren}/>
            </div>
            <div className='catalogo__main__container__text'>
                <h3>Catálogos</h3>
                <p>Consulta nuestros catálogos  y descubre las casas del sector residencial de lujo de GV Real Estate</p>
            </div>
            <div className='catalogo__main__container__catalogs'>
                {catalogs.map((cat,i) => <CatalogCard key={i} index={i} setCatalogNumber={setNumber} cardData={cat}/>)} 

            </div>
            <FullScreenPDF catalogNumber={number} displayFullScren={displayFullScren} setDisplayFullScren={setDisplayFullScren} />
            

        </div>
    )
}