import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DownloadSheet = dynamic(() => import("../PDFBuildingSheet/PDFBuildingSheet.js"), {
    ssr: false
  });

export default function DownLoadBuildingSheet({dataURL, state, currentConsultant}){
    const [ _client, setClient] = useState(false)
    
    useEffect(()=>{
        setClient(true)
    },[])

    return (
        <DownloadSheet state={state} currentConsultant={currentConsultant} />
    )
}