import React, {useEffect} from 'react';
import Image from 'next/image';
import Header from '../components/Header/Header';
import logopng from '../assets/logogvre.png';

export default function AvisoLegal(){

    useEffect(() => {
        window.scroll(
            {top:0}
        )
    },[])

    return (
        <div >
        <Header/>
        <div className='aviso'>
            <h1>Aviso Legal</h1>
            <h2>Condiciones de acceso y utilización de la WEB</h2>
            <p>En este apartado se incluye información sobre las condiciones de acceso y utilización de este sitio Web que deben ser conocidas por el usuario. Información necesaria  a los efectos previstos en la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico.</p>
            <ul>
                <li><b>Titular:</b> GVRE</li>
                <li><b>C.I.F.:</b> B86572120</li>
                <li><b>Domicilio social:</b> CALLE DE LA ISLA DE OZA, 16- 28035 MADRID (MADRID)</li>
                <li><b>E-mail:</b> <a style={{textDecoration: "none", color: "#000000"}} href="mailto:info@gvre.es">info@gvre.es</a></li>
                <li><b>Teléfono:</b> 91 736 53 85</li>
                <li><b>Número de inscripción en el Registro Mercantil:</b> Inscrita en el R.M. al Tomo 30405.- Libro 0.- Folio 176.- Sección 8ª.- Hoja M 547253.- CIF. B 86572120.- Dom. Fiscal c/ Isla de Oza, 16.- Madrid 28035.</li>
            </ul>
            <h2>Aceptación de las Condiciones Generales</h2>
            <p>Las Condiciones generales que a continuación se reseñan, regulan la utilización de la Web de GVRE</p>
            <p>La utilización de la Web de GVRE  atribuye la condición de usuario de la misma y conlleva la aceptación plena y sin reservas de ningún tipo, por parte del usuario, de todas las Condiciones Generales que estén publicadas al tiempo de acceder el usuario.</p>
            <p>Por ello se recomienda al usuario que lea atentamente el contenido de las <u>Condiciones Generales</u> cada vez que se disponga a utilizar la página Web.</p>
            <p><b>Titularidad y prestador del servicio</b></p>
            <p>GVRE  en condición de titular de la presente página web y prestador de servicios de la sociedad de la información, de conformidad con la legislación vigente sobre Servicios de la Sociedad de la Información y de Comercio Electrónico (Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico), pone a disposición de los usuarios la siguiente información general:</p>
            <p><b>Ámbito de Aplicación</b></p>
            <p>La LSSI se aplica a los siguientes servicios ofrecidos vía  Internet cuando constituyan una actividad económica o lucrativa para el prestador del servicio</p>
            <ul>
                <li>Comercio electrónico.</li>
                <li>Contratación en línea.</li>
                <li>Información y publicidad.</li>
                <li>Servicios de intermediación.</li>
            </ul>
            <p>Se considera que existe actividad económica cuando el responsable de la página web reciba ingresos directos (por las actividades de comercio electrónico que lleve a cabo) o indirectos (ya sea por publicidad o patrocinio derivados de la actividad que realice por medios electrónicos).</p>
            <p>En principio, la LSSI no se aplica a las actividades realizadas sin ánimo de lucro (como las de los partidos políticos, sindicatos, asociaciones, ONGs, etc.) mientras no constituyan una actividad económica.</p>
            <p>La Ley es de aplicación directa a todas las actividades que se realicen por medios electrónicos y tengan carácter comercial o persigan un fin económico.</p>
            <p>GVRE  es responsable del sitio web, y pone a disposición de los usuarios el presente documento con el que pretende dar cumplimiento a las obligaciones dispuestas en la Ley 34/2002, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), Ley 7/1996, de 15 de enero, de ordenación del comercio minorista, y Ley 3/2014, de 27 de marzo, por la que se modifica el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios así como informar a todos sus clientes, respecto a cuáles son las condiciones de uso del sitio web.</p>
            <p><b>Legislación aplicable</b></p>
            <p>Estas condiciones generales de uso y contratación se rigen por la ley española. De conformidad con el artículo 29 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico, los contratos electrónicos entre empresarios o profesionales, en defecto de pacto entre las partes, se presumirán celebrados en el lugar en que esté establecido el prestador de servicios.</p>
            <p>En caso de controversia que se derive de las presentes condiciones generales y para la resolución de los conflictos, las partes se someten, a su libre elección, y con renuncia a cualquier otro fuero que les pudiera corresponder, a los juzgados y tribunales del domicilio de GVRE  previsto en el presente Aviso Legal, esto es, en la ciudad de Madrid.</p>
            <p><b>Denegación y retirada del acceso a la Web y/o a los servicios</b></p>
            <p>GVRE  se reserva el derecho a denegar o a retirar el acceso a su página Web, en cualquier momento y sin necesidad de preaviso, a aquellos usuarios que incumplan estas Condiciones Generales o las particulares que resulten de aplicación.</p>
            <h2>Obligación de hacer uso correcto de la página web y de los contenidos</h2>
            <p><b>Todos los contenidos que se incluyen en este sitio Web se facilitan a efectos exclusivamente informativos, de modo que en ningún caso pueden servir de base para recursos o reclamaciones ni constituir fuente de derechos. </b>GVRE <b>se reserva el derecho a modificar, sin previo aviso, los contenidos del sitio Web.</b></p>
            <p>El Usuario se compromete a la <b>correcta utilización de la Web </b>y utilidades que se le proporcionen conforme a la ley, el presente documento legal, y las instrucciones y avisos que se le comuniquen.</p>
            <p>El Usuario se obliga al uso exclusivo de la Web, y todos sus contenidos, para fines lícitos y no prohibidos, que no infrinjan la legalidad vigente y/o puedan resultar lesivos de los derechos legítimos de GVRE o de cualquier tercero, y/o que puedan causar cualquier daño o perjuicio de forma directa o indirecta.</p>
            <p>A tal efecto, el usuario se abstendrá de utilizar cualquiera de los contenidos de la página Web con fines o efectos ilícitos, prohibidos en el presente Documento Legal, lesivos de los derechos e intereses de terceros o que, de cualquier forma, puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de la Web.</p>
            <p>En particular, y a título meramente indicativo y no exhaustivo, el usuario se compromete a <b>no transmitir</b>, difundir o poner a disposición de terceros informaciones, datos, contenidos, mensajes, gráficos, dibujos, archivos de sonido y/o imagen, fotografías, grabaciones, software y, en general, <b>cualquier clase de material que:</b></p>
            <ul>
                <li>de cualquier forma sea contrario, menosprecie o atente contra los derechos fundamentales y las libertades públicas reconocidas constitucionalmente, en los Tratados internacionales y en el resto de la legislación;</li>
                <li>induzca, incite o promueva actuaciones delictivas, denigratorias, difamatorias, infamantes, violentas o, en general, contrarias a la ley, a la moral y buenas costumbres generalmente aceptadas o al orden público;</li>
                <li>induzca, incite o promueva actuaciones, actitudes o pensamientos discriminatorios por razón de sexo, raza, religión, creencias, edad o condición;</li>
                <li>incorpore, ponga a disposición o permita acceder a productos, elementos, mensajes y/o servicios delictivos, violentos, ofensivos, nocivos, degradantes o, en general, contrarios a la ley, a la moral y a las buenas costumbres generalmente aceptadas o al orden público;</li>
                <li>sea falso, ambiguo, inexacto, exagerado o extemporáneo, de forma que induzca o pueda inducir a error sobre su objeto o sobre las intenciones o propósitos del comunicante;</li>
                <li>se encuentre protegido por cualesquiera derechos de propiedad intelectual o industrial pertenecientes a terceros, sin que el Usuario haya obtenido previamente de sus titulares la autorización necesaria para llevar a cabo el uso que efectúa o pretende efectuar;</li>
                <li>viole los secretos empresariales de terceros;</li>
                <li>sea contrario al derecho al honor, a la intimidad personal y familiar o a la propia imagen de las personas;</li>
                <li>de cualquier manera menoscabe el crédito de GVRE</li>
                <li>infrinja la normativa sobre secreto de las comunicaciones;</li>
                <li>constituya, en su caso, publicidad ilícita, engañosa o desleal y, en general, que competencia desleal;</li>
                <li>incorpore virus u otros elementos físicos o electrónicos que puedan dañar o impedir el normal funcionamiento de la red, del sistema o de equipos informáticos (hardware y software) de GVRE o de terceros o que puedan dañar los documentos electrónicos y archivos almacenados en dichos equipos informáticos;</li>
                <li>provoque por sus características (tales como formato, extensión, etc.) dificultades en el normal funcionamiento del Servicio;</li>
            </ul>
            <p>El usuario, se compromete a abstenerse de:</p>
            <ul>
                <li>reproducir, copiar, distribuir, poner a disposición o de cualquier otra forma comunicar públicamente, transformar o modificar los Contenidos, a menos que se cuente con la autorización del titular de los correspondientes derechos o ello resulte legalmente permitido;</li>
                <li>suprimir, manipular o de cualquier forma alterar el “copyright” y demás datos identificativos de la reserva de derechos de GVRE</li>
                <li>intentar obtener los Contenidos empleando para ello medios o procedimientos distintos de los que, según los casos, se hayan puesto a su disposición a este efecto o se hayan indicado a este efecto en la página Web donde se encuentren los Contenidos o, en general, de los que se empleen habitualmente en Internet a este efecto siempre que no entrañen un riesgo de daño o inutilización del sitio Web, de los Servicios y/o de los Contenidos.</li>
            </ul>
            <p>El usuario responderá de los daños y perjuicios de toda naturaleza que GVRE  pueda sufrir, directa o indirectamente, como consecuencia del incumplimiento de cualquiera de las obligaciones derivadas de las condiciones generales o de la ley en relación con la utilización de la Web.</p>
            <h2>Propiedad intelectual</h2>
            <p>Todos los contenidos de GVRE son propiedad intelectual de la empresa y están protegidos en función de la legislación sobre Propiedad Intelectual nacional e internacional vigente.</p>
            <p>Queda absolutamente prohibido el uso del contenido de nuestra página Web sin la autorización por escrito por parte GVRE</p>
            <p>Queda prohibido establecer esta página como marco de otras, no obstante sí que se podrá establecer un enlace a nuestra dirección de Internet siempre y cuando no se relacionen con manifestaciones falsas, inexactas, incorrectas, que puedan inducir a error o confusión o que sean contrarias a la ley, la moral o las buenas costumbres.</p>
            <p>El usuario podrá descargarse la página Web en su terminal siempre que sea para uso privado, sin ningún fin comercial, por lo que no podrá explotar, reproducir, distribuir, modificar, comunicar públicamente, ceder, transformar o usar el contenido de la Web con fines públicos o comerciales.</p>
            <p>La infracción de cualquiera de los citados derechos puede constituir una vulneración de las presentes disposiciones, así como un delito castigado de acuerdo con los artículos 270 y siguientes del Código Penal.</p>
            <p>Las marcas, logotipos y cualesquiera otros de propiedad industrial que aparecen en este sitio son propiedad de GVRE  Está prohibida la utilización de estas marcas sin la previa autorización escrita de GVRE , o de las terceras partes propietarias de las marcas.</p>
            <h2>Duración del servicio</h2>
            <p>GVRE no garantiza la disponibilidad y continuidad del funcionamiento del Sitio Web. Cuando ello sea razonablemente posible, GVRE advertirá previamente de las interrupciones en el funcionamiento del sitio Web; GVRE tampoco garantiza la utilidad del Sitio Web para la realización de ninguna actividad en concreto, ni su infalibilidad.</p>
            <p>El acceso a la Web de GVRE tiene una duración indefinida; no obstante, GVRE se reserva el derecho de suspender sin previo aviso el acceso a los usuarios que, a su juicio, incumplan las normas de utilización de su página Web y ejercer las medidas legales oportunas. Además GVRE se reserva el derecho de restringir el acceso a algunas secciones de la Web al público en general, limitándolo únicamente a usuarios o grupo de usuarios concretos a través de la entrega de una password de acceso de la cual serán responsables.</p>
            <h2>Exclusión de responsabilidad</h2>
            <p>GVRE realiza los máximos esfuerzos para evitar cualquier error en los contenidos de la página Web, pero no garantiza ni se responsabiliza de posibles errores en los contenidos de la Web.</p>
            <p>GVRE <b>excluye cualquier responsabilidad por daños y perjuicios </b>de cualquier naturaleza eventualmente derivados de:</p>
            <ul>
                <li>La interrupción del funcionamiento o la falta de disponibilidad de acceso a la página Web.</li>
                <li>La privacidad y seguridad en la utilización de la página Web por parte del Usuario, y/o el acceso no consentido de terceros no autorizados.</li>
                <li>La eventual transmisión de elementos que afecten negativamente a los sistemas informáticos.</li>
                <li>La exactitud, exhaustividad y actualización puntual de los contenidos de su página Web. En consecuencia, GVRE no garantiza la fiabilidad, la disponibilidad ni la continuidad de su sitio Web ni de los contenidos, por lo que la utilización de los mismos por parte del usuario se lleva a cabo por su propia cuenta y riesgo, sin que, en ningún momento, puedan exigirse responsabilidades a GVRE en este sentido.</li>
            </ul>
            <p>GVRE no será responsable en caso de que existan interrupciones del servicio, demoras, errores, mal funcionamiento del mismo y, en general, demás inconvenientes que tengan su origen en causas que escapan del control de GVRE y/o debida a una actuación dolosa o culposa del Usuario y/o tenga por origen causas de fuerza mayor. En cualquier caso, sea cual fuere su causa, GVRE no asumirá responsabilidad alguna ya sea por daños directos o indirectos, daño emergente y/o por lucro cesante. GVRE tendrá derecho, sin que exista indemnización alguna al usuario por estos conceptos, a suspender temporalmente los servicios y contenidos del sitio Web para efectuar operaciones de mantenimiento, mejora o reparación de los mismos.</p>
            <p>GVRE excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan deberse a la falta de veracidad, exactitud, exhaustividad y/o actualidad de los contenidos transmitidos, difundidos, almacenados, puestos a disposición o recibidos, obtenidos o a los que se haya accedido a través de la Web; Ni tampoco por los contenidos prestados por terceras personas o entidades.</p>
            <p>GVRE tratará en la medida de lo posible de actualizar y rectificar aquella información alojada en su Web que no cumpla con las mínimas garantías de veracidad. No obstante quedará exonerada de responsabilidad por su no actualización o rectificación así como por los contenidos e informaciones vertidos en la misma.</p>
            <p>GVRE no se hace responsable por la utilización que el usuario realice de los servicios y productos del sitio Web ni de sus contraseñas, así como de cualquier otro material del sitio Web, infringiendo los derechos de propiedad intelectual o industrial o cualquier otro derecho de terceros</p>
            <p>GVRE se reserva el derecho de eliminación de aquellos contenidos que resulten inveraces, inexactos y contrarios a la ley, la moral, el orden público y las buenas costumbres.</p>
            <h2>Legislación y fuero</h2>
            <p>La prestación del servicio se rige por la legislación española, siendo competentes los Tribunales de Madrid, a los que el Usuario se somete expresamente.</p>

            <Image width={150} height={200} className='logoemails' src={logopng} alt='logo'></Image>
        </div>
    </div>
    )
}