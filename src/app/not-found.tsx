import Link from "next/link";
import { defaultLocale } from "@/config/site";

export default function NotFound() {
  return (
    <html lang={defaultLocale} dir="rtl">
      <body className="min-h-screen bg-[#f7f8fa] text-[#111827] antialiased">
        <div className="container mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="text-3xl font-semibold">Page not found</h1>
          <p className="mt-3 text-[#4b5563]">The page you are looking for does not exist.</p>
          <Link href={`/${defaultLocale}`} className="mt-6 underline">
            Home
          </Link>
        </div>
      </body>
    </html>
  );
}
