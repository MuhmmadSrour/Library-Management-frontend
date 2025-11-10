import CatalogOverview from "@/components/catalog-page/CatalogOverview";
import CatalogSearch from "@/components/catalog-page/CatalogSearch";
import { useLocation } from "react-router-dom";

function CatalogPage() {
  const location = useLocation();

  return (
    <div className=" w-full sm:px-16 p-2  ">
      {location.search === "" ? <CatalogOverview /> : <CatalogSearch />}
    </div>
  );
}

export default CatalogPage;
