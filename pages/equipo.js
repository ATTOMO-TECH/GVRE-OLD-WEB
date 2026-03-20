import { useEffect, useState } from "react";
import Image from "next/image";
import { getConsultants } from "../api-requests/requests";
import ContactIndex from "../components/ContactInfo/ContactIndex";
import Header from "../components/Header/Header";
import gvreLogo from "./../assets/logogvre.png";

export default function Team() {
  const [consultants, setConsultants] = useState(null);

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  });

  const fetchConsultantData = async () => {
    const consultants = await getConsultants();
    setConsultants(consultants);
  };

  useEffect(() => {
    fetchConsultantData();
  }, []);

  return (
    <div className="equipo">
      <Header />
      <h1 className="equipo__title">Equipo</h1>
      <p className="equipo__text">
        En GV Real Estate nos esforzamos al máximo por cumplir sus expectativas
        y brindarle un servicio exclusivo y personalizado.{" "}
      </p>
      <p className="equipo__text">
        Nuestra empresa cuenta con los mejores profesionales del sector para
        asesorarle siempre que lo necesite.
      </p>
      <div className="equipo__owners">
        {consultants?.map((consultant) =>
          consultant.showOnWeb === "Yes" ? (
            <div key={consultant.fullName} className="equipo__owners__owner">
              <Image
                width={250}
                height={170}
                src={consultant.avatar ? consultant.avatar : gvreLogo}
                alt={consultant.fullName}
              />
              <h3>{consultant.fullName}</h3>
              <a href={`mailto:${consultant.consultantEmail}`}>
                <h4>{consultant.consultantEmail}</h4>
              </a>
            </div>
          ) : null,
        )}
      </div>
      <ContactIndex />
    </div>
  );
}

// export async function getStaticProps() {
//   const consultants = await getConsultants();
//   return {
//     props: {
//       consultants,
//     },
//   };
// }
