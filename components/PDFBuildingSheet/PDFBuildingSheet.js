import React, {useEffect, useState} from "react";
import { Document, View, Page, Text, Font, PDFDownloadLink, Image } from "@react-pdf/renderer";
import logoGVRE from '../../assets/logogvre.png';
import check from '../../assets/SVG/mobile/comun/check.png';
import mailIcon from '../../assets/SVG/fichaPDF/mail-icon.png';
import mapPinIcon from '../../assets/SVG/fichaPDF/map-pin-icon.png';
import phoneIcon from '../../assets/SVG/fichaPDF/phone-icon.png';
//import JostLigth300 from '../../assets/fonts/jost/Jost-Light.ttf'



//Font.register({ family: 'PoppinsLigth300', src: "./../../assets/fonts/poppins/Poppins-Light.ttf"  });
//Font.register({ family: 'PoppinsMedium500', src: "./../../assets/fonts/poppins/Poppins-Medium.ttf" });
//Font.register({ family: 'PoppinsRegular400', src: "./../../assets/fonts/poppins/Poppins-Regular.ttf" });
//Font.register({ family: 'JostRegular400', src: "./../../assets/fonts/jost/Jost-Regular.ttf" });
//Font.register({ family: 'JostMedium500', src: "./../../assets/fonts/jost/Jost-Medium.ttf" });

export function BuildingSheetPDF({ qrCode, state, consultant}){
    //console.log("dataURL",dataURL )
    //console.log("state", state)
    //console.log("consultant", consultant)
    // Font.register({
    //     family: 'Jost',
    //     fonts: [
    //       { src: JostLigth300, fontWeight: 300 }
          
    //     ]
    //   })
    
    //console.log("dataURL", typeof dataURL)
    console.log("state", typeof state)
    console.log("consultant", typeof consultant)
    const [qualities, setQualities] = useState([])

    // const loadFonts = useCallback(async () => {
    //     await Promise.all([
    //       Font.load({ fontFamily: 'Jost', fontWeight: 300 })
         
    //     ])
    //   }, [])
    
    //   useEffect(() => {
    //     loadFonts()
    //   }, [loadFonts])
    
    
    let dataURL = ""
    if (typeof window !== 'undefined') {
        const data = document.getElementById("qrCode");
        console.log(data)
        if(data !== null){
            dataURL = data.toDataURL()
       }
    }
    
    function getQualities(qualities, department){
      const printQualities =[];
      if(qualities.accessControl) printQualities.push("Control de accesos")
      if(qualities.airConditioning) printQualities.push("Aire acondicionado")
      if(qualities.centralHeating) printQualities.push("Calefacción central")
      if(qualities.centralVacuum) printQualities.push("Aspiración centralizada")
      if(qualities.dumbwaiter) printQualities.push("Montaplatos")
      if(qualities.falseCeiling) printQualities.push("Falso techo")
      if(qualities.freeHeight) printQualities.push("Altura libre 2.5m")
      if(qualities.fullHoursSecurity) printQualities.push("Seguridad 24h")
      if(qualities.garage) printQualities.push("Garaje")
      if(qualities.gunRack) printQualities.push("Armero")
      if(qualities.homeAutomation) printQualities.push("Domótica")
      if(qualities.indoorAlarm) printQualities.push("Alarma interior")
      if(qualities.lift) printQualities.push("Ascensor")
      if(qualities.liftTruck) printQualities.push("Montacargas")
      if(qualities.outdoorAlarm) printQualities.push("Alarma perimetral")
      if(qualities.padelCourt) printQualities.push("Pista de pádel")
      if(qualities.qualityBathrooms) printQualities.push("Baños")
      if(qualities.smokeOutlet) printQualities.push("Salida de humos")
      if(qualities.storage) printQualities.push("Trastero")
      if(qualities.strongBox) printQualities.push("Caja fuerte")
      if(qualities.subFloorHeating) printQualities.push("Suelo radiante")
      if(qualities.swimmingPool) printQualities.push("Piscina")
      if(qualities.tennisCourt) printQualities.push("Pista de tenis")
      if(qualities.terrace) printQualities.push("Terraza")
      if(qualities.well) printQualities.push("Pozo")
      if(qualities.raisedFloor) printQualities.push("Suelo técnico")
      if(qualities.furnished) printQualities.push("Amueblada")
      if(qualities.implanted) printQualities.push("Implantada")
      if(qualities.separateEntrance) printQualities.push("Entrada independiente")
      if(qualities.exclusiveOfficeBuilding) printQualities.push("Edificio exclusivo de oficinas")
      if(qualities.classicBuilding) printQualities.push("Edificio clásico")
      if(qualities.coworking) printQualities.push("Coworking")
      if(department === "Patrimonio"){
        if(printQualities.length >= 6){
          printQualities.length = 6;
          setQualities(printQualities)
        } else {
          setQualities(printQualities)
        }
      }else{
          if(printQualities.length >= 9){
            printQualities.length = 9;
            setQualities(printQualities)
          } else {
            setQualities(printQualities)
        }
      } 
    }
    useEffect(()=>{
      getQualities(state?.quality?.others, state.department)
    },[state])  
    const separateDecimal = (number)=>{
      const string = number.toString();
      let numberLength = string.length;
      const spaces = numberLength/3;
      const arraySpaces = [];
      for(let i=0;i<=spaces;i++){
        if(numberLength>=3){
          let part = string.substring(numberLength-3,numberLength);
          arraySpaces.push(part);
          numberLength -= 3;
        }else{
          let newString = string.substring(0,numberLength);
          arraySpaces.push(newString);
        }
      }
      const reverse = arraySpaces.reverse();
      return reverse.join(" ");
    }

    return (
        <Document >
        <Page size='A4' style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
           <Image 
             style={{padding: "1px 0px", width:"50px"}} 
             src={logoGVRE}
             alt={""}
           />
           <Image
             style={{width: "100%", height:"400px"}} 
             src={state.images.main}
             alt={""}
           />
           <Text 
             style={{fontSize: "11px", textAlign: "center", padding: "2px 0px"}}

           > {state?.title}</Text>
           <Text 
             style={{ fontSize: "11px", textAlign: "center", padding: "1px 0px"}}

           > {state?.webSubtitle.toUpperCase()}</Text>
           <View 
           style={{width: "90%" ,display: "flex", flexDirection: "row", gap: "50px", alignItems: "center", justifyContent: "space-evenly"}}>
                 {state.adType.length === 2 ?
                   <Text 
                   style={{ fontSize: "18px", padding: "2px 6px"}}

                 > {state?.sale?.saleValue ? `${separateDecimal(state?.sale?.saleValue)} €`: null}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {state?.rent?.rentValue ? `${separateDecimal(state?.rent?.rentValue)} €/mes` : null }</Text> 
                   : 
                   <Text 
                   style={{ fontSize: "18px", padding: "2px 6px"}}

                 > {state?.sale?.saleValue ? `${separateDecimal(state?.sale?.saleValue)} €`: null} {state?.rent?.rentValue ? `${separateDecimal(state?.rent?.rentValue)} €/mes` : null }</Text> 
                 }
           </View>
           <Text 
               style={{ fontSize: "11px", color:"#A2A1A6", textAlign: "center", padding: "1px 6px", marginBottom: "4px"}}

           > Ref:{state?.adReference}</Text>
           <View
               style={{width: "90%", borderBottom: "solid", borderColor: "#000000", borderWidth: "1px", position:"relative"}}
           />
           {
             (state.department === "Patrimonio" && state.adType.length === 1 && state.adType[0] === "Venta" && state.ibi.ibiShowOnWeb && state.ibi.ibiValue !== 0) ||
             (state.department === "Patrimonio" && state.adType.length === 1 && state.adType[0] === "Venta" && state.communityExpenses.expensesShowOnWeb && state.communityExpenses.expensesValue !== 0) ||
             (state.department === "Patrimonio" && state.adType.length === 1 && state.adType[0] === "Venta" && state.communityExpenses.expensesShowOnWeb && state.communityExpenses.expensesValue !== 0) ||
             (state.department === "Patrimonio" && state.adType.includes("Alquiler") && state.monthlyRent !== 0) || 
             (state.department === "Patrimonio" && state.adType.includes("Alquiler") && state.expensesIncluded !== 0) ||
             (state.department === "Patrimonio" && state.adType.includes("Alquiler") && state.expenses !== 0) ? 
             <View
             style={{ width:"90%", display: "flex", gap: "20px", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "5px", borderBottom: "solid", borderBottomColor: "#000000", borderBottomWidth: "2px"}}
           >
                 {
                   state.department === "Patrimonio" && state.adType.length === 1 && state.adType[0] === "Venta" && state.ibi.ibiShowOnWeb && state.ibi.ibiValue !== 0 ? 
                   <View style={{ width:"30%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                   <View style={{  display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                     <Text style={{ fontSize: "20px", color: "#B4B4B4", textAlign: "center"}}>{`${new Intl.NumberFormat('de-DE').format(state.ibi.ibiValue)}`} </Text>
                   </View>
                   <Text style={{ fontSize: "10px", textAlign: "center"}}>IBI €/año</Text>
                 </View> : null
                 }
                 {
                   state.department === "Patrimonio" && state.adType.length === 1 && state.adType[0] === "Venta" && state.communityExpenses.expensesShowOnWeb && state.communityExpenses.expensesValue !== 0 ? 
                   <View style={{ width:"30%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                   <View style={{  display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                     <Text style={{ fontSize: "20px", color: "#B4B4B4", textAlign: "center"}}>{`${new Intl.NumberFormat('de-DE').format(state.communityExpenses.expensesValue)}`} </Text>
                   </View>
                   <Text style={{ fontSize: "10px", textAlign: "center"}}>Gastos de comunidad €/mes</Text>
                 </View> : null
                 }
                 {
                   state.department === "Patrimonio" && state.adType.length === 1 && state.adType[0] === "Venta" && state.trashFee.trashFeeShowOnWeb && typeof state.trashFee?.trashFeeValue === Number && state.trashFee.trashFeeValue !== 0 ? 
                   <View style={{ width:"30%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                   <View style={{  display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                     <Text style={{ fontSize: "20px", color: "#B4B4B4", textAlign: "center"}}>{`${new Intl.NumberFormat('de-DE').format(state.trashFee.trashFeeValue)}`} </Text>
                   </View>
                   <Text style={{ fontSize: "10px", textAlign: "center"}}>TRU €/año</Text>
                 </View> : null
                 }
                 {
                   state.department === "Patrimonio" && state.adType.includes("Alquiler") && state.monthlyRent !== 0 ? 
                   <View style={{ width:"30%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                   <View style={{  display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                     <Text style={{ fontSize: "20px", color: "#B4B4B4", textAlign: "center"}}>{`${new Intl.NumberFormat('de-DE').format(state.monthlyRent)}`} </Text>
                     <Text style={{  fontSize: "9px", color: "#B4B4B4", textAlign: "center"}}>€/m2/mes</Text>
                   </View>
                   <Text style={{ fontSize: "10px", textAlign: "center"}}>Renta</Text>
                 </View> : null
                 }
                 {
                   state.department === "Patrimonio" && state.adType.includes("Alquiler") && state.expensesIncluded !== 0 ? 
                   <View style={{ width:"30%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                   <View style={{  display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                     <Text style={{ fontSize: "20px", color: "#B4B4B4", textAlign: "center"}}>{`${new Intl.NumberFormat('de-DE').format(Math.round(state.expensesIncluded))}`}  </Text>
                     <Text style={{ fontSize: "9px", color: "#B4B4B4", textAlign: "center"}}>€/mes</Text>
                   </View>
                   <Text style={{  fontSize: "10px", textAlign: "center"}}>Renta con gastos incluidos</Text>
                 </View> : null
                 }
                 {
                   state.department === "Patrimonio" && state.adType.includes("Alquiler") && state.expenses !== null && state.expenses !== 0 ? 
                   <View style={{ width:"30%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                   <View style={{  display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                     <Text style={{ fontSize: "20px", color:"#B4B4B4", textAlign: "center"}}>{`${new Intl.NumberFormat('de-DE').format(state.expenses)}`}  </Text>
                     <Text style={{ fontSize: "9px", color: "#B4B4B4", textAlign: "center"}}>€/m2/mes</Text>
                   </View>
                   <Text style={{ fontSize: "10px", textAlign: "center"}}>Gastos</Text>
                 </View> : null
                 }
           </View> : null
           }
           <View
             style={{ width:"95%", display: "flex", gap: "20px", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: "10px"}}
           >
             {state.department !== "Patrimonio" && state?.plotSurface !== 0 ?
               <View style={{ width:"17%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                 <Text style={{ fontSize: "12px", color:"#B4B4B4", textAlign: "center" }}>{ state.plotSurface}</Text>
                 <Text style={{ fontSize: "9px", textAlign: "center"}}>m 2 de parcela</Text>
             </View> : null
             }
             {state.department === "Patrimonio" && state?.floor !== "" ?
               <View style={{ width:"17%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                 <Text style={{ fontSize: "12px", color:"#B4B4B4", textAlign: "center" }}>{ state.floor}</Text>
                 <Text style={{ fontSize: "9px", textAlign: "center"}}>Planta</Text>
             </View> : null
             }
             {state?.buildSurface !== 0 ?
               <View style={{ width:"17%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                 <Text style={{ fontSize: "12px", color:"#B4B4B4", textAlign: "center" }}>{ state.buildSurface}</Text>
                 <Text style={{ fontSize: "9px", textAlign: "center"}}>m 2 construidos</Text>
             </View> : null
             }
             {state.department !== "Patrimonio" && state?.quality?.bedrooms !== 0 ?
               <View style={{ width:"17%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px", textAlign: "center"}}>
                 <Text style={{ fontSize: "12px", color:"#B4B4B4", textAlign: "center", alignSelf:"center", alignItems:"center" }}>{ state.quality.bedrooms}</Text>
                 <Text style={{ fontSize: "9px", textAlign: "center"}}>Habitaciones</Text>
             </View> : null
             }
             {state.department !== "Patrimonio" && state?.quality?.bathrooms !== 0 ?
               <View style={{ width:"17%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                 <Text style={{ fontSize: "12px", color:"#B4B4B4", textAlign: "center" }}>{ state.quality.bathrooms}</Text>
                 <Text style={{ fontSize: "9px", textAlign: "center"}}>Baños</Text>
             </View> : null
             }
             {state?.quality?.parking !== 0 ?
               <View style={{ width:"17%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                 <Text style={{ fontSize: "12px", color:"#B4B4B4", textAlign: "center" }}>{ state.quality.parking}</Text>
                 <Text style={{ fontSize: "9px", textAlign: "center"}}>Garaje</Text>
             </View> : null
             }
             {state.quality.jobPositions !== 0 ? 
               <View style={{ width:"17%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                 <Text style={{ fontSize: "12px", color:"#B4B4B4", textAlign: "center"}}>{state.quality.jobPositions}</Text>
                 <Text style={{ fontSize: "9px", textAlign: "center"}}>Puestos de trabajo</Text>
               </View> : null
             }
             {state.department === "Patrimonio" && state?.disponibility !== "" ?
               <View style={{ width:"17%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center", gap: "20px"}}>
                 <Text style={{ fontSize: "12px", color:"#B4B4B4", textAlign: "center" }}>{ state.disponibility}</Text>
                 <Text style={{ fontSize: "9px", textAlign: "center"}}>Disponibilidad</Text>
             </View> : null
             }
               
           </View>
           {
             qualities?.length <= 6 ? 
             <View
               style={{width: "100vw", height: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",  flexWrap: "wrap", backgroundColor:"#ffffff", paddingLeft: "15%", marginTop: "15px"}}
             >
             </View> : null
           }
            {qualities?.length > 0 ? 
            <View
               style={{width: "100vw", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",  flexWrap: "wrap", backgroundColor:"#f0f0f0",paddingLeft: "15%", paddingTop: "5px", paddingBottom: "5px", marginTop: "10px", marginBottom: "10px"}}
             >
               {qualities?.map((quality, i) => (
                <View key={i}
                    style={{display: "flex", flexDirection: "row", width: "33%", marginTop: "6px", marginBottom:"6px", height: "15px"}}
                >
                    <Image style={{width: "15px", height: "15px"}} src={state.images.main} alt='check'/> 
                    <Text  style={{ fontSize: "10px" }}> {quality} </Text>
                </View>
               ))}
               </View> : null
            }
               <View
                 style={{width: "100vw", display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems: "center", paddingTop: "15px", paddingBottom: "8px", marginTop: "20px", marginBottom: "20px", position:"absolute", bottom:"-13"}}
               >
                     <View style={{width:"30vw", display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"-20px"}}>
                       <Image 
                         style={{width:"90px", height:"auto"}}
                         src={consultant !== undefined ? consultant.avatar : logoGVRE}
                            alt={""}
                         />
                       <Text style={{ fontSize: "10px", width: "30vw", marginTop: "8px", marginBottom:"8px", textAlign:"center"}}>{consultant !== undefined ? consultant.fullName : "GV Retail"}</Text>
                     </View>
                     <View style={{width:"30vw", display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"-20px"}}>
                       <View style={{ display:"flex", flexDirection:"row", justifyContent:"start", alignItems:"center", gap:"2px"}}>
                         <Image 
                           style={{width:"10px", height:"10px"}}
                           src={mapPinIcon} alt="map icon" />
                         <Text 
                           style={{ fontSize: "10px", textAlign:"center", marginLeft:"8px"}}
                           >{consultant !== undefined ? consultant.office1 : "Lagasca 36"} {consultant !== undefined && consultant.office2 !== "" ? `| ${consultant.office2}` : null}</Text>
                       </View>
                       <View style={{ display:"flex", flexDirection:"row", justifyContent:"start", alignItems:"center"}}>
                         <Image 
                           style={{width:"10px", height:"10px"}}
                           src={phoneIcon} alt="phone icon" />
                         <Text 
                           style={{ fontSize: "10px", textAlign:"center", marginLeft:"8px"}}
                           >{consultant !== undefined ? consultant.consultantMobileNumber : "917 365 385"} {consultant !== undefined && consultant.consultantPhoneNumber !== "" ? `| ${consultant.consultantPhoneNumber}` : null}</Text>
                       </View>
                       <View style={{ display:"flex", flexDirection:"row", justifyContent:"start", alignItems:"center"}}>
                         <Image 
                           style={{width:"10px", height:"10px"}}
                           src={mailIcon} alt="mail icon" />
                         <Text 
                           style={{ fontSize: "10px", textAlign:"center", marginLeft:"8px"}}
                           >{consultant !== undefined ? consultant.consultantEmail : "retail@gvre.es"}</Text>
                       </View>
                     </View>
                     <View style={{width:"30vw", display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"-20px"}}>
                       <Image 
                         allowDangerousPaths
                         style={{width:"60px", height:"auto"}}
                         src={dataURL}
                         alt={""}
                         />
                     </View>
               </View>
                     <Text 
                           style={{ fontSize: "7px", textAlign:"center", position:"absolute", bottom:"0"}}
                           >*Datos orientativos facilitados por la propiedad. Información sin carácter contractual.</Text>
        </Page>
      </Document>
    )
}

export default function DownloadSheet({dataURL, state, currentConsultant}){

    const [ _client, setClient] = useState(false)

    useEffect(()=>{
        setClient(true)
    },[])
//dataURL={dataURL !== null ? dataURL : ""}
    return(
        <PDFDownloadLink document={<BuildingSheetPDF  state={state} consultant={currentConsultant}/>} fileName={`Ficha ${state.title}`}>
                                  <button style={{cursor:"pointer"}} >Descargar ficha PDF</button>
                              </PDFDownloadLink>
    )
}