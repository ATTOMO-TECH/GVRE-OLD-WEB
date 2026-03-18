import cookies from "js-cookie";
import route from "../../config/routes";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function Cookies() {
  const [openModal, setOpenModal] = useState(false);
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  const acceptCookies = () => {
    cookies.set("acceptedCookiesGVRE", "true");
    setAcceptedCookies(true);
    setOpenModal(false);
  }
  const coockieText = `
          <p>
          En GVRE utilizamos cookies propias y de terceros para mejorar tu experiencia en el site. Para más información consulta nuestra
          <a href="${route.Politica}" class='anchorCoockieSection' target="_blank">Política de Privacidad</a>.
          </p>
        `;
  useEffect(() => {
    const checkCookies = () => {
      const hasAcceptedCookies = cookies.get("acceptedCookiesGVRE") === "true";
      setAcceptedCookies(hasAcceptedCookies);
      if (!hasAcceptedCookies) {
        setTimeout(() => {
          Swal.fire({
            html: coockieText,
            showCancelButton: true,
            confirmButtonText: "Aceptar cookies",
            cancelButtonText: "Cancelar",
            buttonsStyling: false,
            customClass: {
              title: "cookie-title",
              content: "cookie-content",
              confirmButton: "cookie-confirm-button",
              cancelButton: "cookie-cancel-button",
            },

            allowOutsideClick: false,
            position: "bottom-end",
          }).then((result) => {
            if (result.isConfirmed) {
              acceptCookies();
            } else {
              setOpenModal(false);
            }
          });
        }, 1000);
      }
    };

    checkCookies();
  }, []);
}
