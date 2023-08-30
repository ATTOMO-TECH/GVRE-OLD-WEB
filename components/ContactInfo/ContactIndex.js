import React from "react";
import Link from "next/link";
import logo from "./../../assets/logo.svg";
import routes from "./../../config/routes";
import Image from "next/image";

const ContactIndex = ({ webData }) => {
  return (
    <div className="contactIndex">
      <h2 className="contactIndex__title">{webData?.talkWithUs?.titleHome}</h2>
      <div className="contactIndex__location">
        <Image
          className="contactIndex__location__logo"
          width={50}
          height={50}
          src={logo}
          alt="logo"
        />
        <div className="contactIndex__location__left">
          {webData?.talkWithUs?.directions.map((direction) => (
            <p key={direction}>{direction}</p>
          ))}
        </div>
        <div className="contactIndex__location__right">
          {webData?.talkWithUs?.phones.map((phone) => (
            <p key={phone}>{phone}</p>
          ))}
          <a target="blank" href={`mailto:${webData?.talkWithUs?.email}`}>
            {webData?.talkWithUs?.email}
          </a>
        </div>
      </div>
      <Link href={routes.Contact} className="contactIndex__button">
        {webData?.talkWithUs?.contactButton}
      </Link>
    </div>
  );
};

export default ContactIndex;
