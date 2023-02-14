import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import ContactInfo from '../components/ContactInfo/ContactIndex';
import desarrollos from '../assets/context/arquit.png';
import arquitectura from '../assets/context/cabecera.jpg';
import clientes from '../assets/context/users.svg';
import settings from '../assets/context/settings.svg';
import text from '../assets/context/file-text.svg';
import search from '../assets/context/search.svg';
import Image from 'next/image';

export default function Services(){


    return (
        <div className='contextual'>
        <Header/>
        <div className='contextual__comercializacion'>
            <h2>Comercialización</h2>
            <p>El sector residencial de lujo, GV Residencial, y el sector terciario, GV Patrimonio, son nuestras dos ramas principales en las que nos especializamos. </p>
            <p>La filosofía de la empresa ha sido, y será siempre, que el cliente es nuestro mejor socio. Nuestro foco de atención es ofrecer una buena relación personal, contando con la mayor profesionalidad y diferenciándonos en el sector a través de la oferta de servicios más técnicos.</p>
            <div className='contextual__comercializacion__list'>
                <div className='contextual__comercializacion__list__item'>
                    <p className='contextual__comercializacion__list__item__number'>1</p>
                    <p className='contextual__comercializacion__list__item__text'>Acompañamos a nuestros clientes con un servicio de intermediación y asesoramiento en el alquiler o compra/venta de sus inmuebles. Asesoramos en todas las partes de la negociación.</p>
                </div>
                <div className='contextual__comercializacion__list__item'>
                    <p className='contextual__comercializacion__list__item__number'>2</p>
                    <p className='contextual__comercializacion__list__item__text'>Aseguramos la máxima transparencia y rigor en nuestras operaciones gracias a nuestra experiencia en la gestión de activos de lujo.</p>
                </div>
                <div className='contextual__comercializacion__list__item'>
                    <p className='contextual__comercializacion__list__item__number'>3</p>
                    <p className='contextual__comercializacion__list__item__text'>Nos encargamos asimismo de la localización de oportunidads de inversión inmobiliaria.</p>
                </div>
            </div>
        </div>
        <div id='inversion' className='contextual__inversion'>
            <h2>Inversión</h2>
            <p>Con nuestra experiencia en activos inmobiliarios de primer nivel, analizamos las diferentes oportunidades del mercado asesorando a los inversores en la adquisición o venta de diferentes activos inmobiliarios.</p>
            <div className='contextual__inversion__list'>
                <div className='contextual__inversion__list__item'>
                    <p>Edificios en rentabilidad.</p>
                    <p>(mono-tenant y multi-tenant).</p>
                </div>
                <div className='contextual__inversion__list__item'>
                    <p>Edificios sin inquilino.</p>
                </div>
                <div className='contextual__inversion__list__item'>
                    <p>Locales comerciales.</p>
                </div>
                <div className='contextual__inversion__list__item'>
                    <p>Oficinas para empresas.</p>
                </div>
                <div className='contextual__inversion__list__item'>
                    <p>Suelos para su desarrollo.</p>
                </div>
                <div className='contextual__inversion__list__item'>
                    <p>Private Equity Real Estate.</p>
                </div>
            </div>
        </div>
        <div id='gestion' className='contextual__gestion'>
            <h2>Gestión patrimonial</h2>
            <div className='contextual__gestion__list'>
                <div className='contextual__gestion__list__item'>
                    <p>Acompañamos a nuestros clientes con un servicio de intermediación y asesoramiento en el alquiler o compra/venta de sus inmuebles. Asesoramos en todas las partes de la negociación.</p>
                    <Image width={83} height={83} src={clientes} alt='icono clientes'/>
                </div>
                <div className='contextual__gestion__list__item'>
                    <p>Aseguramos la máxima transparencia y rigor en nuestras operaciones gracias a nuestra experiencia en la gestión de activos de lujo.</p>
                    <Image width={83} height={83} src={search} alt='icono lupa'/>
                </div>
                <div className='contextual__gestion__list__item'>
                    <p>Acompañamos a nuestros clientes con un servicio de intermediación y asesoramiento en el alquiler o compra/venta de sus inmuebles. Asesoramos en todas las partes de la negociación.</p>
                    <Image width={83} height={83} src={settings} alt='icono engranaje'/>
                </div>
                <div className='contextual__gestion__list__item'>
                    <p>Aseguramos la máxima transparencia y rigor en nuestras operaciones gracias a nuestra experiencia en la gestión de activos de lujo.</p>
                    <Image width={83} height={83} src={text} alt='icono texto'/>
                </div>
            </div>
        </div>
        <div id='desarrollos' className='contextual__nuevos'>
            <h2>Nuevos desarrollos</h2>
            <p>Como arquitectos aprovechamos nuestro conocimiento del sector para brindar asesoramiento para aprovechar oportunidades que puedan surgir en el mercado, y que permiten llevar a cabo tanto nuevos desarollos como rehabilitación de edificios existentes. </p>
            <p>Es importante realizar una labor de valoración previa al inicio de intervenciones de este tipo. Para ello, asesoramos en el análisis de cada detalle desde es coste de la materia prima hasta el producto final, pasando por los gastos de construcción.</p>
            <Image width={624} height={578} src={desarrollos} alt='imagen desarrollos'/>
        </div>
        <div id='arquitectura' className='contextual__arquitectura'>
            <div>
                <h2>Arquitectura e interiorismo</h2>
                <p>El servicio de interiorismo que ofrecemos le asegura que su proyecto obtenga los mejores resultados. En GV priorizamos la optimización del espacio, el confort y la garatntía de satisfacción de nuestros clientes. </p>
                <p>Nuestro asesoramiento está enfocado a potencial el desarrollo de su negocio. Nuestro equipo le ofrecerá propuestas de calidad y un continuo control de costes de implantación.</p>
                <p>La fiabilidad de nuestros servicios está avalada por numerosas compañías nacionales que han confiado en nuestra experiencia y profesionalidad.</p>
            </div>
            <Image width={890} height={655} src={arquitectura} alt='imagen interior'/>
        </div>
        <ContactInfo/>
    </div>
    )
}