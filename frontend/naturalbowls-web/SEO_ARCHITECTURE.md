# Arquitectura SEO Refactorizada - Guía de Uso

## 📁 Estructura de Carpetas

```
frontend/
├── lib/
│   └── seo/                          # Lógica de SEO centralizada
│       ├── constants.ts              # Configuración y constantes
│       ├── metadata.ts               # Generadores de metadata
│       ├── viewport.ts               # Configuración de viewport
│       └── index.ts                  # Barrel export
│
├── components/
│   └── seo/                          # Componentes SEO reutilizables
│       ├── StructuredData.tsx        # Schemas JSON-LD
│       ├── HeadScripts.tsx           # Meta tags y scripts del head
│       └── index.ts                  # Barrel export
│
└── app/
    ├── layout.tsx                    # Layout limpio y sin lógica SEO
    ├── page.tsx                      # Página principal
    ├── bowls/page.tsx               # Página de bowls
    ├── producto/[id]/page.tsx        # Página de producto dinámica
    └── ...otros                      # Otras páginas

```

---

## 🎯 Cómo Usar

### 1️⃣ Layout Root (app/layout.tsx)

```typescript
import { generateRootMetadata, generateViewportConfig } from "@/lib/seo";
import { LocalBusinessSchema, HeadScripts } from "@/components/seo";
import "./globals.css";

export const metadata = generateRootMetadata();
export const viewport = generateViewportConfig();

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <HeadScripts />
        <LocalBusinessSchema />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2️⃣ Páginas Normales (app/bowls/page.tsx)

```typescript
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Nuestro Catálogo de Bowls",
  description: "Explora nuestra amplia variedad de bowls saludables y deliciosos.",
  keywords: ["catálogo bowls", "menú completo"],
});

export default function BowlsPage() {
  return <div>{/* Contenido... */}</div>;
}
```

### 3️⃣ Páginas de Productos Dinámicos (app/producto/[id]/page.tsx)

```typescript
import { generateProductMetadata, SITE_CONFIG } from "@/lib/seo";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo";

// Simular obtener producto
async function getProduct(id: string) {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  // return response.json();
  return {
    id,
    title: "Poke Bowl Hawaii",
    description: "Delicioso poke bowl con salmón fresco",
    image: "/images/poke-hawaii.jpg",
    price: 12.99,
    rating: 4.8,
    reviews: 145,
  };
}

export async function generateMetadata({ params }) {
  const product = await getProduct((await params).id);
  return generateProductMetadata(product);
}

export default async function ProductPage({ params }) {
  const product = await getProduct((await params).id);

  return (
    <>
      <ProductSchema
        id={product.id}
        name={product.title}
        description={product.description}
        image={product.image}
        price={product.price}
        rating={product.rating}
        reviewCount={product.reviews}
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE_CONFIG.url },
          { name: "Productos", url: `${SITE_CONFIG.url}/bowls` },
          { name: product.title, url: `${SITE_CONFIG.url}/producto/${product.id}` },
        ]}
      />

      {/* Contenido del producto... */}
    </>
  );
}
```

### 4️⃣ Páginas con FAQs (app/faq/page.tsx)

```typescript
import { generatePageMetadata } from "@/lib/seo";
import { FAQSchema } from "@/components/seo";

export const metadata = generatePageMetadata({
  title: "Preguntas Frecuentes",
  description: "Responden a tus dudas sobre Natural Bowls",
});

const faqs = [
  {
    question: "¿Cuáles son los horarios de delivery?",
    answer: "Entregamos de lunes a domingo de 11am a 10pm.",
  },
  {
    question: "¿Puedo personalizar mi bowl?",
    answer: "Sí, puedes personalizar cada ingrediente según tus preferencias.",
  },
];

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={faqs} />
      {/* Contenido... */}
    </>
  );
}
```

---

## 🔧 Cómo Agregar Variables de Entorno

Actualiza `.env.local`:

```bash
# Base URL para URLs canónicas
NEXT_PUBLIC_BASE_URL=https://naturalbowls.com

# Google Search Console verification
NEXT_PUBLIC_GOOGLE_VERIFICATION=abc123xyz...
```

---

## 📝 Archivos Configurables

### lib/seo/constants.ts

Actualiza con información real:

```typescript
export const BUSINESS_INFO = {
  streetAddress: "Calle Real 123",
  addressLocality: "Ciudad Real",
  addressRegion: "Estado",
  postalCode: "12345",
  addressCountry: "MX", // Cambia según tu país
} as const;
```

---

## ✨ Ventajas de Esta Arquitectura

✅ **Separación de responsabilidades** - SEO separado del layout
✅ **Reutilizable** - Funciones y componentes reutilizables
✅ **Mantenible** - Cambios centralizados en un solo lugar
✅ **Escalable** - Fácil agregar nuevas páginas
✅ **Type-safe** - TypeScript al máximo
✅ **Performante** - Sin lógica innecesaria en layout
✅ **Professional** - Sigue mejores prácticas industria

---

## 🔍 Checklist de Implementación

- [ ] Actualizar `SITE_CONFIG` en `lib/seo/constants.ts`
- [ ] Actualizar `BUSINESS_INFO` con datos reales
- [ ] Crear imágenes OG (1200x630 y 800x800px)
- [ ] Crear favicons en múltiples tamaños
- [ ] Configurar variables de entorno
- [ ] Validar metadata en [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Registrarse en Google Search Console
- [ ] Verificar robots.txt y sitemap.xml
- [ ] Implementar structured data en todas las páginas principales

---

## 📊 Próximas Mejoras

1. **Dinamic Sitemap** - Generar sitemap de productos dinámicamente
2. **Breadcrumb Navigation** - Agregar breadcrumbs en Header
3. **Analytics** - Integrar Google Analytics
4. **Schema Automation** - Plugin para generar schemas automáticamente
5. **Image Optimization** - Implementar next/image en todos lados
6. **Internationalization** - Agregar soporte multi-idioma

---

## 📚 Referencias

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Best Practices SEO Technical](https://www.searchenginejournal.com/)
