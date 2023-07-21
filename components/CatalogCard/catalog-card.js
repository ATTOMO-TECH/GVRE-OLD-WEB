import Image from "next/image";
import useWindowSize from "../../hooks/useWindowsSize";

export default function CatalogCard({ index, setCatalogNumber, cardData }) {
  const size = useWindowSize();

  const onChangeCatalog = () => {
    setCatalogNumber(index);
    window.scroll({ top: 0 });
  };

  return (
    <div
      onClick={onChangeCatalog}
      className="catalogo__main__container__catalogs__item"
    >
      <Image
        className="catalogo__main__container__catalogs__item__image"
        width={size < 770 ? 300 : 505}
        height={size < 770 ? 300 : 505}
        src={cardData.portraidImage}
        alt=""
      />
      {cardData.title === "" ? null : <h2>Catálogo {cardData.year}</h2>}
    </div>
  );
}
