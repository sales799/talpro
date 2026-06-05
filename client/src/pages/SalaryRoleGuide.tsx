import { ServicePage } from "@/components/service/ServicePage";
import NotFound from "@/pages/not-found";
import { getSalaryRoleService } from "@/config/programmaticSeo";

export default function SalaryRoleGuide({ params }: { params: { role: string } }) {
  const service = getSalaryRoleService(params.role);
  return service ? <ServicePage service={service} /> : <NotFound />;
}
