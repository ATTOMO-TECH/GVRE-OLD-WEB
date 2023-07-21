import dynamic from "next/dynamic";
import { Dialog } from "primereact/dialog";
// importación dinámica para que el componente se renderice del lado navegador y no del lado servidor
// por defecto usando Next se compila todo del lado servidor y la librería pdf/render | react-pdf no son compatibles del lado servidor
const CatalogPDF = dynamic(() => import("../catalog-pdf/catalog-pdf"), {
  ssr: false,
});

export default function FullScreenPDF({
  catalogs,
  catalogNumber,
  displayFullScren,
  setDisplayFullScren,
}) {
  return (
    <Dialog
      id="catalogModal"
      visible={displayFullScren}
      showHeader={true}
      dismissableMask="true"
      maximized={true}
      onHide={() => setDisplayFullScren(false)}
      blockScroll={true}
    >
      <CatalogPDF
        catalogs={catalogs}
        catalogNumber={catalogNumber}
        setDisplayFullScren={setDisplayFullScren}
      />
    </Dialog>
  );
}
