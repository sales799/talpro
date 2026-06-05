import { ServicePage } from "@/components/service/ServicePage";
import NotFound from "@/pages/not-found";
import { getServiceCityService } from "@/config/programmaticSeo";

export default function ServiceCity({ params }: { params: { service: string; city: string } }) {
  const service = getServiceCityService(params.service, params.city);
  return service ? <ServicePage service={service} /> : <NotFound />;
}
