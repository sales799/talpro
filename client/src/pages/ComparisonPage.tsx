import { ServicePage } from "@/components/service/ServicePage";
import NotFound from "@/pages/not-found";
import { getComparisonService } from "@/config/programmaticSeo";

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const service = getComparisonService(params.slug);
  return service ? <ServicePage service={service} /> : <NotFound />;
}
