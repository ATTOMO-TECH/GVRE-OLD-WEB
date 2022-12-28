import Image from "next/image"

export default function CatalogCard({index, setCatalogNumber, cardData}){

    const onChangeCatalog = ()=>{
            setCatalogNumber(index)
            window.scroll({top:0})
    }
    
    return (
        <div onClick={onChangeCatalog} className='catalogo__main__container__catalogs__item'>
            <Image width={505} height={505}  src={cardData.image} alt="" />
            {cardData.title === "" ? null : <h2>{cardData.title}</h2>}
        </div>
    )
}

