import React, { useState } from 'react';
import menuHam from './../../assets/SVG/mobile/comun/menuHam.svg';
import Home_instagram from './../../assets/SVG/mobile/comun/Home_instagram.svg';
import home_linkedin from './../../assets/SVG/mobile/comun/home_linkedin.svg';
import logo from './../../assets/logo.svg'
import routes from "./../../config/routes";
import cerrarFiltro from './../../assets/SVG/mobile/comun/cerrarCompleta.svg';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const [isActive, setActive] = useState('false');
    const toggleClass = () => {
        setActive(!isActive)
    }
    const situate = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 750,
                behavior: 'smooth'
            })
        }
    }
    const situate2 = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 1650,
                behavior: 'smooth'
            })
        }
    }
    const situate3 = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 2550,
                behavior: 'smooth'
            })
        }
    }
    const situate4 = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 3250,
                behavior: 'smooth'
            })
        }
    }

    return (
        <header>
            <div className='header'>
                <Link href={routes.Home} className='header__logo'><Image width={45} height={45} src={logo} alt='logo' /><p>GV Real Estate</p></Link>
                <div className='header__menu'>
                    <span onClick={toggleClass} className='header__menu__burguer'><Image src={menuHam} alt='menu' /></span>
                    <ul className={isActive ? "notVisibleMenu header__menu__list" : 'header__menu__list'}>
                        <Image onClick={toggleClass} className='header__menu__list__close' src={cerrarFiltro} alt='cerrar' />
                        <li className='header__menu__list__home'><Link onClick={toggleClass} href={routes.Home}>Home</Link></li>
                        <li><Link onClick={toggleClass} href={routes.FilterResidential}>Residencial</Link></li>
                        <li><Link onClick={toggleClass} href={routes.FilterPatrimonial}>Patrimonio</Link></li>
                        <li className='header__menu__list__GV'>
                            <div className='header__menu__list__GV__name'>
                                GV Real Estate
                                <ul className='header__menu__list__GV__name__menu' >
                                    <li><Link onClick={toggleClass} href={routes.Team}>Equipo</Link></li>
                                    <li><Link onClick={toggleClass} href={routes.Contextual}>Comercialización</Link></li>
                                    <li><Link onClick={toggleClass && situate} href={`${routes.Contextual}#inversion`}>Inversión</Link></li>
                                    <li><Link onClick={toggleClass && situate2} href={`${routes.Contextual}#gestion`}>Gestión patrimonial</Link></li>
                                    <li><Link onClick={toggleClass && situate3} href={`${routes.Contextual}#desarrollos`}>Nuevos desarrollos</Link></li>
                                    <li><Link onClick={toggleClass && situate4} href={`${routes.Contextual}#arquitectura`}>Arquitectura e interiorismo</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li><Link href={routes.Catalogo}>Catálogo</Link></li>
                        <li className='header__menu__list__contact'><Link onClick={toggleClass} href={routes.Contact}>Contacto</Link></li>
                        <li className='header__menu__list__social'>
                            <div>
                                <Image onClick={toggleClass} src={Home_instagram} alt='instagram' />
                                <Image onClick={toggleClass} src={home_linkedin} alt='linkedin' />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header
