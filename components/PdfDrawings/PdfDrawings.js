import React, { useEffect, useState } from "react";
import { Document, Image, Page, PDFDownloadLink, Text } from "@react-pdf/renderer";
/* import { padding } from "@mui/system"; */

function DrawingsPDF({state}){
/*console.log(state)*/
    return (
       <Document >
         <Page size='A4' style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
         <Text style={{padding: "15px"}}>Planos {state.title}</Text>

                {state.images.blueprint.map(image => {
                    /*console.log('ruta:', typeof image)*/
                    return (
                            <Image key={image} src={image} style={{ width:"90%", paddingTop:"5px"}} alt={`Plano de ${state.title}`}></Image>
                    )
                })}
         </Page>
       </Document>
    )
}

export default function DownloadDrawings({state}){

    const [_client, setClient] = useState(false)

    useEffect(()=>{
        setClient(true)
    },[])

    return (
        <PDFDownloadLink document={<DrawingsPDF state={state}/>} fileName={`Planos ${state.title}`}>
                                        <button >Descargar plano</button>
                                    </PDFDownloadLink>
    )

}
