import Image from "next/image";

export default function DisplayVideo({videoUrl, portraitImage}){

    return (
        <div 
            style={{backgroundImage:`${(portraitImage)}`}}
            className="video__container">
            <div className="video__container__imageLeft">
                <Image width={743} height={566} src={portraitImage} alt="" />
            </div>
            <video playsInline controls poster={portraitImage}
                className="video__container__video"
            >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                <source src={videoUrl} type="video/ogg" />
                <Image width={892} height={566} src={portraitImage} alt="Video no soportado" />
                Su navegador no soporta contenido multimedia
            </video>
            <div className="video__container__imageRigth">
                <Image width={743} height={566} src={portraitImage} alt="" />
            </div>
        </div>
    )
}