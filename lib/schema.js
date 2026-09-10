// schema.org JSON-LD builders.
//
// LocalBusiness -> /contact (one entity per office)
// JobPosting    -> /employment (wildland firefighter, seasonal)
//
// Emitted server-side from each route's layout via a <script type="application/ld+json">.

import { offices } from "./officeData";

export const SITE_URL = "https://www.patrickfire.com";

// The job description embeds HTML tags, and JSON-LD ships inside a <script>
// block, so escape "<" to keep a tag like "</script" from ending the block early.
export function jsonLd(schema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

// The apply flow lives on PatRick's own ATS.
const APPLICATION_URL = "https://patrickfire.embera.co/job-application/";

// Hiring window for the current season. Update both each hiring cycle —
// Google drops a JobPosting once validThrough is in the past.
const JOB_POSTED = "2026-01-02";
const JOB_VALID_THROUGH = "2026-12-31T23:59:59-08:00";

const HIRING_ORGANIZATION = {
  "@type": "Organization",
  name: "PatRick Environmental, Inc.",
  alternateName: "PatRick Corp.",
  url: SITE_URL,
  logo: `${SITE_URL}/Img/Patrick_Logo.webp`,
};

function postalAddress(office) {
  return {
    "@type": "PostalAddress",
    streetAddress: office.street,
    addressLocality: office.city,
    addressRegion: office.state,
    postalCode: office.zip,
    addressCountry: "US",
  };
}

// One LocalBusiness per physical office, each with a stable @id so the five
// entities stay distinct to crawlers.
export function localBusinessSchema() {
  return offices.map((office) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/contact#${office.slug}`,
    name: `PatRick Environmental – ${office.name}`,
    parentOrganization: HIRING_ORGANIZATION,
    url: `${SITE_URL}/contact`,
    image: `${SITE_URL}${office.image}`,
    telephone: office.phone,
    address: postalAddress(office),
    areaServed: {
      "@type": "State",
      name: office.state,
    },
  }));
}

const JOB_DESCRIPTION = `
<p>PatRick Environmental is hiring wildland firefighters for the 2026 fire season.
No experience is required — training is provided on site. Crews travel across the
U.S. to protect communities, wildlife, and natural resources from wildfires.</p>
<h3>What to expect</h3>
<ul>
  <li>Travel across the U.S. for 14&ndash;30 days at a time</li>
  <li>Work 10&ndash;16 hour shifts in the field</li>
  <li>Earn significant overtime (20&ndash;50+ hours per week)</li>
  <li>Take on challenging, rewarding work with real impact</li>
</ul>
<h3>What we are looking for</h3>
<ul>
  <li>Physically fit individuals ready for demanding outdoor work</li>
  <li>Ability to hike long distances, lift, dig, and work in hot, smoky conditions</li>
  <li>Must be 18+ to deploy on fires</li>
  <li>Willingness to travel and respond quickly to dispatch calls</li>
  <li>Must live within 2 hours of one of our bases</li>
</ul>
<h3>Why join our team</h3>
<ul>
  <li>Competitive pay with strong overtime opportunities</li>
  <li>Hands-on training and career-building experience</li>
  <li>All gear provided except boots, gloves, and a sleeping bag</li>
  <li>Be part of a respected, experienced firefighting organization</li>
</ul>
<p>A resume and IS-100 and IS-700 certificates are required to complete an
application. This is a call-when-needed position; you must be reachable for
dispatch during fire season. EEO.</p>
`.trim();

export function jobPostingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${SITE_URL}/employment#wildland-firefighter`,
    title: "Wildland Firefighter",
    description: JOB_DESCRIPTION,
    identifier: {
      "@type": "PropertyValue",
      name: "PatRick Environmental, Inc.",
      value: "wildland-firefighter-2026",
    },
    datePosted: JOB_POSTED,
    validThrough: JOB_VALID_THROUGH,
    // Full-time hours while deployed, seasonal in duration.
    employmentType: ["TEMPORARY", "FULL_TIME"],
    occupationalCategory: "33-2011 Firefighters",
    industry: "Wildland Fire Suppression",
    hiringOrganization: HIRING_ORGANIZATION,
    // Crews are based out of all five offices.
    jobLocation: offices.map((office) => ({
      "@type": "Place",
      address: postalAddress(office),
    })),
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: 33,
        maxValue: 40,
        unitText: "HOUR",
      },
    },
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: 0,
    },
    qualifications:
      "Must be 18 or older, physically fit, able to travel for 14–30 day deployments, and live within 2 hours of a PatRick base. IS-100 and IS-700 certificates required to apply.",
    physicalRequirement:
      "Ability to hike long distances, lift, dig, and work 10–16 hour shifts in hot, smoky conditions.",
    responsibilities:
      "Wildland fire suppression, fireline construction, mop-up, and support of initial and extended attack operations nationwide.",
    jobBenefits:
      "Includes $4.93/hour Health & Welfare on the first 40 regular hours. On-site training provided. All gear supplied except boots, gloves, and a sleeping bag.",
    directApply: true,
    url: `${SITE_URL}/employment`,
    applicationContact: {
      "@type": "ContactPoint",
      url: APPLICATION_URL,
    },
  };
}
