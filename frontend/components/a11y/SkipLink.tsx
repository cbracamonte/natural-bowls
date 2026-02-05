import Link from "next/link";

export default function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-[#5D4E37] focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
    >
      Saltar al contenido principal
    </Link>
  );
}
