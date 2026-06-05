import { ServicePage } from "@/components/service/ServicePage";
import NotFound from "@/pages/not-found";
import { getRoleIndustryService } from "@/config/programmaticSeo";

export default function RoleIndustry({ params }: { params: { role: string; industry: string } }) {
  const service = getRoleIndustryService(params.role, params.industry);
  return service ? <ServicePage service={service} /> : <NotFound />;
}
