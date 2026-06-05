import { ServicePage } from "@/components/service/ServicePage";
import NotFound from "@/pages/not-found";
import { getRoleCityService } from "@/config/programmaticSeo";

export default function HireRoleCity({ params }: { params: { role: string; city: string } }) {
  const service = getRoleCityService(params.role, params.city);
  return service ? <ServicePage service={service} /> : <NotFound />;
}
