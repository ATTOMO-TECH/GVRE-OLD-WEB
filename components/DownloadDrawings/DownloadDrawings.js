import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DownloadDrawings = dynamic(() => import("../PdfDrawings/PdfDrawings"), {
    ssr: false
  });

export default function DownLoadBuildingDrawings({state}){

    const [ _client, setClient] = useState(false)

    useEffect(()=>{
        setClient(true)
    },[])
    return (
        <DownloadDrawings state={state} />
    )
}