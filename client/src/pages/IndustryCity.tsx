import { ServicePage } from "@/components/service/ServicePage";
import NotFound from "@/pages/not-found";
import { getIndustryCityService } from "@/config/programmaticSeo";

export default function IndustryCity({ params }: { params: { industry: string; city: string } }) {
  const service = getIndustryCityService(params.industry, params.city);
  return service ? <ServicePage service={service} /> : <NotFound />;
}
