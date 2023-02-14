import { useState } from 'react';
import Image from 'next/image';
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { catalogs } from '../../constants/globalconstants';
import useWindowSize from '../../hooks/useWindowsSize';
import {  pdfjs   } from "react-pdf";
import { BsFullscreen } from "react-icons/bs";
import { AiOutlinePlus,  AiOutlineMinus} from "react-icons/ai";
import { BarLoader, BeatLoader } from 'react-spinners';
import { PricesSliders } from '../../styles/sliders-style';
import leftArrow from './../../assets/SVG/mobile/comun/left-arrow.svg';
import leftArrowDark from './../../assets/SVG/mobile/comun/left-arrowDark.svg';
import rigthArrow from './../../assets/SVG/mobile/comun/right-arrow.svg';
import rigthArrowDark from './../../assets/SVG/mobile/comun/right-arrowDark.svg';

// LIBRERIAS NECESARIAS
//     "@react-pdf/font": "2.2.0",
//     "@react-pdf/pdfkit": "^3.0.0",
//     "@react-pdf/renderer": "2.1.0",
//     "@types/react-pdf": "^5.0.5",
//     "react-pdf": "5.3.0",
//     "file-loader": "^6.2.0", 

export default function CatalogPDF({ catalogNumber, displayFullScren, setDisplayFullScren}){

    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


    const [numPages, setNumpages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [zoomNumber, setZoomNumber] = useState(1)
    const [scale, setScale] = useState(1)
    const size = useWindowSize();

    function onDocumentLoadSuccess({numPages}){
        setNumpages(numPages)
        setPageNumber(1)
    }

    function changePage(offSet){
        setPageNumber(prevPageNumber => prevPageNumber + offSet)
    }

    function changePageBack(){
        if(catalogNumber===0){
            changePage(-1)
        }else{
            if(size<1000){
                changePage(-1)
            }else{
                if(pageNumber%2 === 1) changePage(-1)
                else changePage(-2)
            }
        }
    }

    function changePageNext(){
        if(catalogNumber===0){
            changePage(+1)
        }else{
            if(size<1000){
                changePage(+1)
            }else{
                if(pageNumber%2 === 1) changePage(+1)
                else changePage(+2)
            }
        }
    }

    const handlePageInput = (e, data1) => {
        setPageNumber(data1);
    }

    function changeZoom(offSet){
        if(zoomNumber >= 1 && zoomNumber <= 1.3) setZoomNumber(zoomNumber + offSet)
    }

    function decreaseZoom(){
        if(zoomNumber > 1) {
            changeZoom(-0.1)
            setScale(prevScale => prevScale - 0.1)
        }
    }

    function increaseZoom(){
        if(size < 1000){
            if(zoomNumber < 1.2) {
                changeZoom(0.1)
                setScale(prevScale => prevScale + 0.1)
            }
        }else{
            if(Math.round(zoomNumber) < 1.3) {
                changeZoom(0.1)
                setScale(prevScale => prevScale + 0.1)
            }
        }
    }

    const handleZoomInput = (e, data1) => {
        setZoomNumber(data1);
    }
    return (
        <div className="container__pdf">
        <div className="container__pdf__data">
            {
                pageNumber > 1 ? <Image
                                    width={79} height={79} 
                                    style={size < 400 ? {height: "3rem"} : {}}
                                    onClick={changePageBack} 
                                    src={displayFullScren === false ? leftArrow : leftArrowDark} alt=""
                                    /> : 
                                    <Image
                                    width={79} height={79} 
                                    style={size < 400 ? {height: "3rem"} : {}}
                                    className='opacity'
                                    src={displayFullScren === false ? leftArrow : leftArrowDark} alt=""
                                    />
            }
                <div id="documentPDF" className="container__pdf__data__viewer">
                    <Document loading={<BeatLoader color="#fff" />} style={displayFullScren === true ? {width: "90%"}: {}} file={catalogs[catalogNumber]?.catalog} onLoadSuccess={onDocumentLoadSuccess}>
                        <div className={`scroll${zoomNumber}`}>
                            {catalogNumber === 0 && pageNumber >= 3 ? (
                                <Page 
                                height={displayFullScren === false ? 625 : 625} 
                                width={displayFullScren === false ? (size > 400 && size < 819 ? 250 : size > 820 && size < 1200 ? 380 :  size < 400 ? 250 : 925) : size < 400 ? 250 : 925 }
                                pageNumber={pageNumber}
                                scale={scale}
                                loading={<BarLoader color="#fff" />} />
                            ): (
                                <Page 
                                height={displayFullScren === false ? 625 : 625} 
                                width={displayFullScren === false ? (size > 400 && size < 819 ? 250 : size > 820 && size < 1200 ? 325 :  size < 400 ? 250 : 525) : size < 400 ? 250 : 525 }
                                pageNumber={pageNumber}
                                scale={scale}
                                loading={<BarLoader color="#fff" />} />
                            ) }
                        </div>
                        <div className={`scroll${zoomNumber}`}>
                            {catalogNumber === 0 ? null
                             : (
                                size >= 1000 && pageNumber !== 1 && pageNumber < numPages ? <Page 
                                                                            height={displayFullScren === false ? 625 : 625} 
                                                                            width={displayFullScren === false ? (size > 400 && size < 819 ? 250 : size > 820 && size < 1200 ? 325 :  size < 400 ? 250 : 525) : size < 400 ? 250 : 525 }
                                                                            pageNumber={pageNumber+1}
                                                                            scale={scale}
                                                                            loading={<BarLoader color="#fff" />} /> 
                                                                        : null
                            )}
                        </div>
                    </Document>
                    
                </div>
            {
                pageNumber < numPages ? <Image
                                            width={79} height={79} 
                                            style={size < 400 ? {height: "3rem"} : {}}
                                            onClick={changePageNext} 
                                            src={displayFullScren === false ? rigthArrow : rigthArrowDark} 
                                            alt="" /> :
                                            <Image
                                            width={79} height={79} 
                                            style={size < 400 ? {height: "3rem"} : {}}
                                            className='opacity'
                                            src={displayFullScren === false ? rigthArrow : rigthArrowDark} alt=""
                                            />
            }
        </div>
        <div 
        style={displayFullScren === true ? {width: "90%"}: {}}
        className='container__pdf__options'>
            <p className='container__pdf__options__pages'> {pageNumber} / {numPages} </p>
            <PricesSliders
                style={{color: "#717171"}}
                className={'container__pdf__options__sliders'}
                onChange={handlePageInput}
                disableSwap
                value={pageNumber}
                min={1}
                max={numPages}
                step={1}
            />
            <AiOutlineMinus onClick={decreaseZoom} style={size > 400 ? {fontSize: "40px", cursor:"pointer"} : {fontSize: "60px", cursor:"pointer"}}/>
            <PricesSliders
                id='zoomSlider'
                style={{width:"130px",color: "#717171"}}
                className={'container__pdf__options__sliders'}
                onChange={handleZoomInput}
                disableSwap
                value={scale}
                min={1}
                max={size < 1000 ? 1.2 : 1.3}
                step={0.1}
            />
            <AiOutlinePlus onClick={increaseZoom} style={size > 400 ? {fontSize: "40px", cursor:"pointer"} : {fontSize: "60px", cursor:"pointer"}}/>
            {displayFullScren === false ?  <BsFullscreen onClick={()=>setDisplayFullScren(true)} style={size > 400 ? {fontSize: "35px", margin:"3px 0px", cursor:"pointer"} : {fontSize: "50px", margin:"3px 0px", cursor:"pointer"}}/> : null}
        </div>
    </div>
    )
}


