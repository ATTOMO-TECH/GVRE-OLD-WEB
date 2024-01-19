import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import emailjs from "emailjs-com";
import * as yup from "yup";
import Image from "next/image";
import route from "../config/routes";
import Header from "../components/Header/Header";
import send from "../assets/SVG/mobile/comun/flechaEnviar.svg";
import { getWebData } from "../api-requests/requests";
import setBackgroundImageToContainer from "../globalFunctions/functions";

export default function Contact() {
  const [viewForm, setViewForm] = useState(true);
  const form = useRef();
  const [webData, setWebData] = useState({});

  async function fetchGetWebData() {
    const webData = await getWebData();
    setWebData(webData[0]);
    setBackgroundImageToContainer(
      webData[0].talkWithUs.contactImage,
      ".contact__image"
    );
  }
  useEffect(() => {
    fetchGetWebData();
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, []);

  const toggleForm = () => {
    setViewForm(!viewForm);
  };

  const initialValues = {
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    mensaje: "",
  };
  const validationSchema = yup.object({
    nombre: yup.string("").required("Este campo es obligatorio"),
    apellidos: yup.string("").required("Este campo es obligatorio"),
    email: yup
      .string("")
      .required("Este campo es obligatorio")
      .email("El email no es válido"),
    telefono: yup.string("").required("Este campo es obligatorio"),
    mensaje: yup.string(""),
  });
  const sendEmail = (e) => {
    emailjs
      .sendForm("gmail", "template_jgumv3w", form.current, "d0RpjhV6JfLsc5KLH")
      .then(
        (result) => {
          setViewForm(!viewForm);
          return result;
        },
        (error) => {
          alert(
            "El email no se ha podido enviar correctamente, intentelo de nuevo más tarde, disculpe las molestias."
          );
          return error;
        }
      );
  };
  return (
    <div className="contact">
      <Header />
      <div className="contact__image"></div>
      <div className="contact__display">
        <div className="contact__text">
          <div className="contact__text__principal">
            <h1>{webData?.talkWithUs?.titleContact}</h1>
            <p>
              En GV Real Estate nos esforzamos al máximo por cumplir sus
              expectativas y brindarle un servicio exclusivo y personalizado.{" "}
            </p>
          </div>
          <div className="contact__position">
            <div className="contact__text__ofice">
              <h2>Oficinas</h2>
              {webData?.talkWithUs?.directions.map((direction) => (
                <p key={direction}>{direction}</p>
              ))}
            </div>
            <div className="contact__text__phone">
              <h2>Contacto</h2>
              {webData?.talkWithUs?.phones.map((phone) => (
                <p key={phone}>{phone}</p>
              ))}

              <a target="blank" href={`mailto:${webData?.talkWithUs?.email}`}>
                {webData?.talkWithUs?.email}
              </a>
            </div>
          </div>
        </div>
        <div className="contact__form">
          <h1 className="contact__form__title">Petición online</h1>
          {viewForm === true ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={sendEmail}
            >
              {({ errors, isSubmitting, touched }) => (
                <Form ref={form} className="contact__form__inputs">
                  <div className="contact__form__wrapper">
                    <div className="contact__form__wrapper__name">
                      <div className="contact__form__wrapper__name__position">
                        <label className="contact__form__label">NOMBRE</label>
                        <Field placeholder="Escriba aquí" name="nombre" />
                        {errors.nombre && touched.nombre ? (
                          <div>{errors.nombre}</div>
                        ) : null}
                      </div>
                      <div className="contact__form__wrapper__name__position">
                        <label className="contact__form__label">
                          APELLIDOS
                        </label>
                        <Field placeholder="Escriba aquí" name="apellidos" />
                        {errors.apellidos && touched.apellidos ? (
                          <div>{errors.apellidos}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="contact__form__wrapper__contact">
                      <div className="contact__form__wrapper__contact__position">
                        <label className="contact__form__label">EMAIL</label>
                        <Field placeholder="ejemplo@gmail.eu" name="email" />
                        {errors.email && touched.email ? (
                          <div>{errors.email}</div>
                        ) : null}
                      </div>
                      <div className="contact__form__wrapper__contact__position">
                        <label className="contact__form__label">TELÉFONO</label>
                        <Field placeholder="Escriba aquí" name="telefono" />
                        {errors.telefono && touched.telefono ? (
                          <div>{errors.telefono}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="contact__form__wrapper__position">
                    <label className="contact__form__label">MENSAJE</label>
                    <Field placeholder="Escriba aquí" name="mensaje" />
                    <p>
                      Al compartir sus datos, está aceptando nuestros{" "}
                      <a
                        className="custom-contact-link"
                        href={`${route.Aviso}`}
                      >
                        términos de uso
                      </a>{" "}
                      y{" "}
                      <a
                        className="custom-contact-link"
                        href={`${route.Politica}`}
                      >
                        privacidad
                      </a>
                      .
                    </p>
                  </div>
                  <button
                    className="contact__form__button"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Enviar{" "}
                    <span>
                      <Image width={35} height={16} src={send} alt="enviar" />
                    </span>
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="contact__form__return">
              <p>
                Gracias por contactar con nosotros, en breve nos pondremos en
                contacto
              </p>
              <button onClick={toggleForm}>Volver al formulario</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
