import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import PilotCta from "@/components/page/PilotCta";
import LastUpdated from "@/components/page/LastUpdated";
import JsonLd from "@/components/seo/JsonLd";
import { RESOURCES, RESOURCES_HUB, RESOURCES_PUBLISHED, findResource, resourceHref } from "@/data/resources";
import { articleSchema } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/recursos/[slug]">) {
  const resource = findResource((await params).slug);
  if (!resource) return {};
  return pageMetadata({ path: resourceHref(resource), title: resource.title, description: resource.description });
}

// One template for the five guides of the content hub.
export default async function ResourcePage({ params }: PageProps<"/recursos/[slug]">) {
  const resource = findResource((await params).slug);
  if (!resource) notFound();
  const path = resourceHref(resource);

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: resource.h1,
          path,
          description: resource.description,
          datePublished: RESOURCES_PUBLISHED,
        })}
      />
      <PageHero
        crumbs={[
          { name: "Recursos", path: RESOURCES_HUB },
          { name: resource.label, path },
        ]}
        label="Recursos y guías CX"
        title={resource.h1}
        intro={<p>{resource.body}</p>}
      />

      <Section title="Otras guías" tone="alt">
        <ul className="grid gap-3 max-w-3xl">
          {RESOURCES.filter((r) => r.slug !== resource.slug).map((r) => (
            <li key={r.slug}>
              <Link href={resourceHref(r)} className="text-[16px] font-semibold text-primary hover:text-primary-hover">
                {r.h1}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <LastUpdated date={RESOURCES_PUBLISHED} />
        </div>
      </Section>

      <PilotCta />
    </>
  );
}
