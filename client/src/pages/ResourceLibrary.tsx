import { ServicePage } from "@/components/service/ServicePage";
import { getResourceLibraryService } from "@/config/programmaticSeo";

export default function ResourceLibrary() {
  return <ServicePage service={getResourceLibraryService()} />;
}
