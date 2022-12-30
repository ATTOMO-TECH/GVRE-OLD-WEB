import React from "react";
import { QRCodeCanvas } from "qrcode.react/lib";


export default function QRGenerator({urlString}){

    return (
        <div>
            <QRCodeCanvas
                id={"qrCode"}
                value={urlString}
                //size={100}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                //getRef={(c) => (this.svg = c)}
                style={{visibility:"hidden", position:"absolute"}}
            />
        </div>
    )
}
