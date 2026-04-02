import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById, getProductsByCategory } from "@/data/products";
import { generateProductMetadata } from "@/lib/seo";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/StructuredData";
import { SITE_CONFIG } from "@/lib/seo";
import ProductDetailClient from "./ProductDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return generateProductMetadata({
    id: product.id,
    title: product.name,
    description: product.description,
    image: product.image || "/og-image.jpg",
    price: product.price,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const categoryNames: Record<string, string> = {
    poke: "Poke Bowls",
    "smoothie-bowl": "Smoothie Bowls",
    bebidas: "Bebidas",
    cafe: "Cafe",
    wraps: "Wraps",
    sandwiches: "Sandwiches",
    ensaladas: "Ensaladas",
    desayunos: "Desayunos",
  };

  return (
    <>
      <ProductSchema
        id={product.id}
        name={product.name}
        description={product.description}
        image={
          product.image?.startsWith("http")
            ? product.image
            : `${SITE_CONFIG.url}${product.image || "/og-image.jpg"}`
        }
        price={product.price}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_CONFIG.url },
          { name: "Menu", url: `${SITE_CONFIG.url}/menu` },
          {
            name: categoryNames[product.categoryId] || product.categoryId,
            url: `${SITE_CONFIG.url}/menu?category=${product.categoryId}`,
          },
          {
            name: product.name,
            url: `${SITE_CONFIG.url}/producto/${product.id}`,
          },
        ]}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
