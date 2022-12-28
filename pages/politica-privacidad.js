import React, {useEffect} from 'react'
import Image from 'next/image';
import Header from '../components/Header/Header'
import logopng from '../assets/logogvre.png';


export default function Policy(){

    useEffect(() => {
        window.scroll(
            {top:0}
        )
    },[])

    return (
        <div>
        <Header/>
        <div className='politicaPrivacidad'>
            <h1>POLÍTICA DE PRIVACIDAD</h1>
            <p>Mediante el presente aviso legal y política de privacidad, GRANDES VIVIENDAS con domicilio social en CALLE DE LA ISLA DE OZA, 16- 28035 MADRID (MADRID), informa a los usuarios del sitio web http://www.grandesviviendas.com/ de su Política de Privacidad, y describe qué datos recoge, cómo los utiliza,  las opciones de los usuarios en relación a estos datos, sus derechos (conocidos como derechos ARCO, Acceso, Rectificación, Cancelación y Oposición y los nuevos introducidos por el RGPD, derecho al olvido, derecho a la portabilidad de los datos personales y el derecho a la limitación en el tratamiento),  la seguridad de sus datos, y la modificación de la  política de confidencialidad.</p>
            <p>La utilización del sitio web de GRANDES VIVIENDAS y de cualquiera de los servicios que se incorporan en él, supone la plena aceptación de las condiciones que se presentan a continuación Política de Privacidad.</p>
            <p>      1. <b>Recogida de datos y consentimiento</b></p>
            <p>En cumplimiento de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), y por el Reglamento (UE) 2016/679 General de Protección de Datos, se informa de que los datos personales que se solicitan en nuestros formularios o, que nos puedan ser facilitados por medio de nuestras direcciones de correo electrónico, se incluirán en nuestros ficheros de datos personales, cuya responsable y titular es GRANDES VIVIENDAS</p>
            <p>Todos los datos recogidos serán tratados con la confidencialidad debida siguiendo la normativa vigente en materia de protección de datos personales, al amparo de la actual LOPDGDD, RLOPD y, el RGPD.</p>
            <p>Este sitio web se rige por la normativa exclusivamente aplicable al Estado español, a la que quedan sometidas las personas, tanto nacionales como extranjeras, que utilicen esta página web.</p>
            <p>      2. <b>Finalidades del tratamiento</b></p>
            <p>Cuando un usuario se conecta desde la presente web, rellena el formulario de contacto, realiza una consulta telefónica al número: 917365385 y/o envía una notificación al siguiente e-mail: info@grandesviviendas.com está facilitando información de carácter personal de la que es responsable GRANDES VIVIENDAS que será utilizada para:</p>
            <ul>
                <li>La gestión de las comunicaciones con el usuario</li>
                <li>Poderle crear un presupuesto ajustado a sus necesidades, así como realizar estudios estadísticos.</li>
                <li>En caso de convertirse en cliente poder utilizar su información para ejercitar de manera eficiente la labor del servicio que ha contratado. Las finalidades del tratamiento de los datos de los clientes son la gestión comercial, administrativa, contable, y fiscal de los mismos, y la prestación de servicios que nos ha sido encomendada.</li>
                <li>Tramitar encargos, solicitudes o cualquier tipo de petición que sea realizada por el usuario a través de cualquiera de las formas de contacto que se ponen a su disposición.</li>
                <li>Comerciales: Cuando la persona interesada envía los datos personales y la dirección electrónica a GRANDES VIVIENDAS está autorizando expresamente su utilización a efectos de comunicaciones periódicas, incluidas de forma implícita las que se realicen por correo electrónico. El alta o registro en determinados servicios lleva consigo la obtención de consentimiento expreso para la remisión de comunicaciones comerciales o promocionales de GRANDES VIVIENDAS. Asimismo, GRANDES VIVIENDAS, pondrá a los usuarios de mecanismos para que, de manera sencilla y gratuita, puedan desistir del consentimiento otorgado para la finalidad del envío de comunicaciones electrónicas, cumpliendo íntegramente con la normativa europea y nacional sobre la materia referida.</li>
            </ul>
            <p>Esa información puede incluir datos de carácter personal como pueden ser tu dirección IP, nombre, dirección física, dirección de correo electrónico, número de teléfono, y otra información. Al facilitar esta información, el usuario da su consentimiento para que su información sea recopilada, utilizada, gestionada y almacenada por http://www.grandesviviendas.com/.</p>
            <p>Los datos que se faciliten habrán de estar adecuados, y ser concretos y  necesarios para la finalidad citada, y no serán utilizados con otra distinta de aquella para la que se comunica en la presente política de privacidad.</p>
            <p>En ningún caso el usuario está obligado a facilitar datos a GRANDES VIVIENDAS, sin embargo ha de advertirse que de no hacerlo esto supondrá la incapacidad de proveer los servicios  de GRANDES VIVIENDAS de la manera prevista normalmente.</p>
            <p>GRANDES VIVIENDAS no se responsabiliza del tratamiento de los datos personales de las páginas web a las que el usuario pueda acceder por medio de los distintos enlaces que contiene nuestra página web.</p>
            <p>      3. <b>Derecho (ARCO) de acceso, rectificación, cancelación y oposición; derecho al olvido, derecho a la portabilidad de los datos personales y el derecho a la limitación en el tratamiento de los datos personales del usuario.</b></p>
            <p>El usuario tiene derecho a acceder a sus datos personales recogidos en los ficheros de GRANDES VIVIENDAS, rectificarlos en caso de que no sean correctos, cancelarlos u oponerse a su tratamiento, en los términos establecidos por la Ley, dirigiéndose a GRANDES VIVIENDAS a través del correo electrónico info@grandesviviendas.com o bien, mediante escrito dirigido a GRANDES VIVIENDAS, CALLE DE LA ISLA DE OZA, 16- 28035 MADRID (MADRID), acompañando siempre una fotocopia de su D.N.I, o documento acreditativo de la entidad a la que represente.</p>
            <p>Además, con la introducción del RGPD se incorporan el derecho al olvido, derecho a la portabilidad de los datos personales y el derecho a la limitación en el tratamiento.</p>
            <p>El derecho al olvido supone impedir, por orden del afectado, la difusión de información personal a través de internet cuando su publicación no cumple los requisitos de adecuación y pertinencia previstos en la normativa. Esto abarca el derecho a limitar la difusión universal e indiscriminada de datos personales en los buscadores generales cuando la información es obsoleta o ya no tiene relevancia ni interés público, aunque la publicación original sea legítima.</p>
            <p>El derecho a la portabilidad de datos faculta al interesado a obtener una copia de sus datos personales en un formato electrónico estructurado y de uso habitual y transferir sus datos de un sistema de tratamiento electrónico a otro</p>
            <p>El derecho a la limitación en el tratamiento consiste la potestad de los interesados de solicitar y obtener del responsable del tratamiento o fichero, una limitación del tratamiento de sus datos personales cuando se cumpla alguna de las siguientes condiciones:</p>
            <ul>
                <li>El interesado impugne la exactitud de los datos personales, durante un plazo que permita al responsable verificar la exactitud de los mismos.</li>
                <li>El tratamiento sea ilícito y el interesado se oponga a la supresión de los datos personales y solicite en su lugar la limitación de su uso.</li>
                <li>El responsable ya no necesite los datos personales para los fines del tratamiento, pero el interesado los necesite para la formulación, el ejercicio o la defensa de reclamaciones.</li>
                <li>El interesado se haya opuesto al tratamiento</li>
            </ul>
            <p>Es importante que, para mantener los datos personales actualizados, se informe siempre que se produzca alguna modificación; en caso contrario, GRANDES VIVIENDAS no responde de la veracidad de los mismos.</p>
            <p>Si el usuario no cancela sus datos personales de forma expresa de los ficheros de GRANDES VIVIENDAS, se entiende que éste sigue interesado en que permanezcan incorporados mientras sean adecuados para la finalidad con la que se obtuvieron, y mientras GRANDES VIVIENDAS lo considere oportuno.</p>
            <p>      4. <b>Seguridad de los datos personales</b></p>
            <p>GRANDES VIVIENDAS informa que ha adoptado todas las medidas técnicas y organizativas necesarias para salvaguardar la seguridad, tal como exige la normativa vigente que regula el la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales, y el Reglamento (UE) 2016/679 General de Protección de Datos de los registros de actividad que contengan datos de carácter personal.</p>
            <p>      5. <b>Modificación de esta política de confidencialidad</b></p>
            <p>GRANDES VIVIENDAS se reserva el derecho en el futuro de modificar su política de protección de datos de acuerdo con su criterio, o por causa de un cambio legislativo, jurisprudencial, o en la práctica empresarial. Si GRANDES VIVIENDAS introduce alguna modificación, el nuevo texto será publicado en esta misma página, donde el usuario podrá tener conocimiento de la política de protección de datos. En cualquier caso, la relación con el usuario se regirá por las normas previstas en el momento preciso en que se accede al sitio web y, por consiguiente, es obligatorio leerlas cada vez que nos facilite sus datos por medio de nuestra web.</p>
            <p>La utilización de la Web atribuye a quien haga uso de ella la condición de Usuario, y acepta las presentes Condiciones de las que ha tenido oportunidad de tomar conocimiento.</p>
            <p>      6. <b>Cesiones de datos a terceros.</b></p>
            <p>No se realizarán cesiones de los datos facilitados a terceros, salvo obligación legal. En Conclusión, el único Responsable del Tratamiento de datos será GRANDES VIVIENDAS.</p>
            <p>      7. <b>Comunicaciones comerciales por correo electrónico</b></p>
            <p>En cumplimiento del artículo 21 de la Ley de Servicios de la Sociedad de la Información y Comercio electrónico (Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico), y el Reglamento (UE) 2016/679 General de Protección de Datos, que prohíbe el envío de comunicaciones comerciales por medio del correo electrónico que previamente no hayan sido autorizadas expresamente por los destinatarios, le informamos de que la aceptación de comunicaciones comerciales implica su autorización expresa para hacerle envíos informativos, comerciales, publicitarios y promocionales, por este medio a la dirección facilitada.</p>
            <p>Nuestro sitio web obtiene los datos personales del usuario mediante la recepción de formularios, consultas telefónicas y/o por medio del correo electrónico, con las siguientes finalidades:</p>
            <ul>
                <li>Suscripción a boletines online, publicaciones físicas, páginas web y comunicaciones comerciales y promocionales relacionadas con los servicios de GRANDES VIVIENDAS</li>
                <li>Gestión de GRANDES VIVIENDAS para la información o inscripción como empresa colaboradora y para la gestión e inscripción como usuario de otros productos de GRANDES VIVIENDAS</li>
                <li>Comerciales: Cuando la persona interesada envía los datos personales y acepta el envío de comunicaciones está autorizando expresamente su utilización a efectos de comunicaciones periódicas, incluidas de forma implícita las que se realicen por correo electrónico o por correo ordinario.</li>
            </ul>
            <p>Asimismo, GRANDES VIVIENDAS pondrá a los usuarios de mecanismos para que, de manera sencilla y gratuita, puedan desistir del consentimiento otorgado para la finalidad del envío de comunicaciones electrónicas, cumpliendo íntegramente con la normativa europea y nacional sobre la materia referida.</p>
            <p>No obstante, si no desea recibir nuestras comunicaciones comerciales puede solicitarlo dirigiéndose a:</p>
            <p>GRANDES VIVIENDAS a través del correo electrónico info@grandesviviendas.com o bien, mediante escrito dirigido a GRANDES VIVIENDAS, CALLE DE LA ISLA DE OZA, 16- 28035 MADRID (MADRID), acompañando siempre una fotocopia de su D.N.I, o documento acreditativo de la entidad a la que represente.</p>
            <p>El usuario al rellenar el formulario con los datos personales que se solicitan y acepta expresamente el envío de comunicaciones comerciales, con el uso de los distintos productos o servicios que se ofrecen en esta página web, o al mandar un mensaje electrónico con datos personales, autoriza y da su consentimiento de forma expresa a GRANDES VIVIENDAS, a tratar e incorporar a  esos datos en nuestros registros de actividad. (www.agpd.es) del que es responsable la citada empresa, con la finalidad de  facilitar una mayor información de la empresa, informar sobre productos, informar sobre servicios ofrecidos.</p>
            <p>      8. <b>Conservación de datos</b></p>
            <p>En virtud de la normativa de conservación de datos, se mantendrán durante la prestación del servicio y un año tras la contratación del mismo, como norma general.</p>

            <Image width={150} height={200} className='logoemails' src={logopng} alt='logo'></Image>
        </div>
    </div>
    )
}