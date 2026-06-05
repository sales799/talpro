import { ServicePage } from "@/components/service/ServicePage";
import NotFound from "@/pages/not-found";
import { getRoleService } from "@/config/programmaticSeo";

export default function HireRole({ params }: { params: { role: string } }) {
  const service = getRoleService(params.role);
  return service ? <ServicePage service={service} /> : <NotFound />;
}
