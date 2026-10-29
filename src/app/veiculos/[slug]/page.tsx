import { INITIAL_VEHICLES } from "@/lib/vehicles";
import { VehicleDetailClient } from "./VehicleDetailClient";

export async function generateStaticParams() {
  return INITIAL_VEHICLES.map((v) => ({
    slug: v.slug,
  }));
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VehicleDetailClient slug={slug} />;
}
