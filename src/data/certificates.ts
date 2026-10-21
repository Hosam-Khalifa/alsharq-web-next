export interface Certificate {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  orientation: "portrait" | "landscape";
  image: string;
  width: number;
  height: number;
  order: number;
}

const ASSET_BASE = "/images/Certificates";

export const certificates: Certificate[] = [
  {
    id: "cert-01",
    slug: "certificate-01",
    title: { ar: "شهادة 01", en: "Certificate 01" },
    orientation: "portrait",
    image: `${ASSET_BASE}/Certificates-1.jpg`,
    width: 2480,
    height: 3508,
    order: 1,
  },
  {
    id: "cert-02",
    slug: "certificate-02",
    title: { ar: "شهادة 02", en: "Certificate 02" },
    orientation: "portrait",
    image: `${ASSET_BASE}/Certificates-2.jpg`,
    width: 2480,
    height: 3508,
    order: 2,
  },
  {
    id: "cert-03",
    slug: "certificate-03",
    title: { ar: "شهادة 03", en: "Certificate 03" },
    orientation: "portrait",
    image: `${ASSET_BASE}/Certificates-3.jpg`,
    width: 2480,
    height: 3508,
    order: 3,
  },
  {
    id: "cert-04",
    slug: "certificate-04",
    title: { ar: "شهادة 04", en: "Certificate 04" },
    orientation: "portrait",
    image: `${ASSET_BASE}/Certificates-4.jpg`,
    width: 2480,
    height: 3508,
    order: 4,
  },
  {
    id: "cert-05",
    slug: "certificate-05",
    title: { ar: "شهادة 05", en: "Certificate 05" },
    orientation: "portrait",
    image: `${ASSET_BASE}/Certificates-5.jpg`,
    width: 2480,
    height: 3508,
    order: 5,
  },
  {
    id: "cert-06",
    slug: "certificate-06",
    title: { ar: "شهادة 06", en: "Certificate 06" },
    orientation: "portrait",
    image: `${ASSET_BASE}/Certificates-6.jpg`,
    width: 2480,
    height: 3508,
    order: 6,
  },
  {
    id: "cert-07",
    slug: "certificate-07",
    title: { ar: "شهادة 07", en: "Certificate 07" },
    orientation: "portrait",
    image: `${ASSET_BASE}/Certificates-7.jpg`,
    width: 2480,
    height: 3508,
    order: 7,
  },
  {
    id: "cert-08",
    slug: "certificate-08",
    title: { ar: "شهادة 08", en: "Certificate 08" },
    orientation: "landscape",
    image: `${ASSET_BASE}/Certificates-8.jpg`,
    width: 3412,
    height: 2369,
    order: 8,
  },
  {
    id: "cert-09",
    slug: "certificate-09",
    title: { ar: "شهادة 09", en: "Certificate 09" },
    orientation: "landscape",
    image: `${ASSET_BASE}/Certificates-9.jpg`,
    width: 3412,
    height: 2369,
    order: 9,
  },
  {
    id: "cert-10",
    slug: "certificate-10",
    title: { ar: "شهادة 10", en: "Certificate 10" },
    orientation: "landscape",
    image: `${ASSET_BASE}/Certificates-10.jpg`,
    width: 3412,
    height: 2369,
    order: 10,
  },
  {
    id: "cert-11",
    slug: "certificate-11",
    title: { ar: "شهادة 11", en: "Certificate 11" },
    orientation: "landscape",
    image: `${ASSET_BASE}/Certificates-11.jpg`,
    width: 3412,
    height: 2369,
    order: 11,
  },
  {
    id: "cert-12",
    slug: "certificate-12",
    title: { ar: "شهادة 12", en: "Certificate 12" },
    orientation: "landscape",
    image: `${ASSET_BASE}/Certificates-12.jpg`,
    width: 3412,
    height: 2369,
    order: 12,
  },
];

export function getCertificateBySlug(slug: string) {
  return certificates.find((certificate) => certificate.slug === slug);
}
