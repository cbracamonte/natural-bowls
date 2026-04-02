import { generatePageMetadata } from "@/lib/seo";
import HeroPokebowl from "@/components/home/HeroPokebowl";
import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import HeroSmoothiebowl from "@/components/home/HeroSmoothiebowl";
import Instagram from "@/components/home/Instagram";
import Location from "@/components/home/Location";
import Newsletter from "@/components/home/Newsletter";
import Sponsors from "@/components/home/Sponsors";

export const metadata = generatePageMetadata({
  title: "Restaurante Saludable en Trujillo - Bowls, Wraps, Postres Fit y Mas",
  description:
    "Natural Bowls: restaurante de comida saludable en Trujillo para todo publico. Poke bowls, smoothie bowls, wraps, ensaladas, waffles fit, postres saludables, desayunos proteicos y cafe gourmet. Comida vegetariana, proteica y organica con delivery a domicilio.",
  keywords: [
    "restaurante saludable Trujillo",
    "comida fit Trujillo",
    "comida vegetariana Trujillo",
    "postres fit Trujillo",
    "waffles saludables Trujillo",
    "desayunos proteicos Trujillo",
    "delivery saludable Trujillo",
  ],
  path: "/",
});

export default function Home() {
  return (
    <>
      {/* 1. Hero principal - Atraer atención y dar bienvenida */}
      <HeroPokebowl />

      {/* 2. Cómo funciona - Eliminar fricción y explicar el proceso */}
      {/* <HowItWorks /> */}

      {/* 3. Categorías - Mostrar opciones disponibles */}
      <Categories />

      {/* 4. Favoritos - Social proof: qué otros clientes compran */}
      <Featured />

      {/* 5. Segundo hero - Mostrar diversidad de productos */}
      <HeroSmoothiebowl />

      {/* 6. Newsletter - Conversiones finales */}
      <Newsletter />

      {/* 7. Aliados */}
      <Sponsors />

      {/* 8. Instagram - Más social proof y engagement */}
      <Instagram />

      {/* 9. Ubicación */}
      <Location />
    </>
  );
}
