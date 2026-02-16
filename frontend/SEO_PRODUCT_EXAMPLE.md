// Ejemplo de metadata dinámico para páginas de productos [id]
// Ubicación futura: frontend/app/producto/[id]/page.tsx

import type { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

// Simulación: Reemplazar con datos reales de tu base de datos
async function getProduct(id: string) {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  // return response.json();

  return {
    id,
    title: "Poke Bowl Hawaii - Salmón y Aguacate",
    description: "Delicioso poke bowl con salmón fresco, aguacate, algas y salsa especial. Rico en proteínas y grasas saludables.",
    price: 12.99,
    image: "https://naturalbowls.com/images/poke-hawaii.jpg",
    calories: 450,
    servingSize: 1,
    ingredients: ["Salmón", "Arroz integral", "Aguacate", "Algas", "Cebolla"],
    rating: 4.8,
    reviews: 145,
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct((await params).id);

  // Obtener metadata del parent layout
  const previousImages = (await parent).openGraph?.images || [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://naturalbowls.com";

  return {
    title: product.title,
    description: product.description,

    // Para el producto específico
    keywords: [
      product.title,
      "bowl saludable",
      "comida orgánica",
      `${product.calories} calorías`,
      ...product.ingredients,
    ],

    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
        ...previousImages,
      ],
      type: "product",
      url: `${baseUrl}/producto/${product.id}`,
    },

    // Breadcrumb Schema será agregado en el componente
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).id);

  return (
    <div className="container mx-auto py-12">
      {/* Breadcrumb Navigation para SEO */}
      <nav className="mb-8" aria-label="breadcrumb">
        <ol className="flex gap-2 text-sm text-gray-600">
          <li><a href="/" className="hover:text-green-600">Home</a></li>
          <li>/</li>
          <li><a href="/bowls" className="hover:text-green-600">Bowls</a></li>
          <li>/</li>
          <li className="text-gray-900">{product.title}</li>
        </ol>
      </nav>

      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.title,
            image: product.image,
            description: product.description,
            review: {
              "@type": "Review",
              ratingValue: product.rating,
              bestRating: "5",
              worstRating: "1",
              reviewCount: product.reviews,
            },
            offers: {
              "@type": "Offer",
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/producto/${product.id}`,
              priceCurrency: "USD",
              price: product.price.toString(),
              availability: "https://schema.org/InStock",
            },
            nutrition: {
              "@type": "NutritionInformation",
              calories: `${product.calories} calories`,
              servingSize: product.servingSize,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating.toString(),
              ratingCount: product.reviews.toString(),
            },
          }),
        }}
      />

      {/* Contenido del producto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.title} className="w-full rounded-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="text-2xl font-bold text-green-600 mb-4">${product.price}</div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-gray-500">({product.reviews} reseñas)</span>
          </div>
          {/* CTA Button */}
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
