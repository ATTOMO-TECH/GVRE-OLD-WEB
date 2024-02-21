import React from "react";
import footer_instagram from "./../../assets/SVG/mobile/comun/footer_instagram.svg";
import footer_linkedin from "./../../assets/SVG/mobile/comun/footer_linkedin.svg";
import logo_attomo from "./../../assets/SVG/web/comunes/logo-attomo.svg";
import logo from "./../../assets/logo.svg";
import routes from "./../../config/routes.js";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer__left">
          <Image
            width={22}
            height={22}
            className="footer__left__logo"
            src={logo}
            alt="logo"
          />
          <Link href={routes.Aviso} className="footer__left__AL">
            Aviso legal
          </Link>
          <Link href={routes.Politica} className="footer__left__PP">
            Política de privacidad
          </Link>
        </div>
        <div className="footer__center">
          <a target="blank" href="https://attomo.digital/">
            <p>Powered by</p>
            <Image width={50} height={15} src={logo_attomo} alt="Attomo" />
          </a>
        </div>
        <div className="footer__right">
          <Link href={routes.Contact} className="footer__right__text">
            Contacto
          </Link>
          {/* <a target='blank' href='mailto:info@gvre.es'><Image width={} height={} src={footer_email} alt='email'/></a> */}
          <Link
            target="blank"
            href="https://instagram.com/gv_real_estate_?utm_medium=copy_link"
          >
            <Image
              width={16}
              height={15}
              src={footer_instagram}
              alt="instagram"
            />
          </Link>
          <Link
            target="blank"
            href="https://www.linkedin.com/company/gv-real-estate/"
          >
            <Image
              width={16}
              height={15}
              src={footer_linkedin}
              alt="linkedin"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
