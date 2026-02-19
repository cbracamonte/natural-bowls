import HeroPokebowl from "@/components/home/HeroPokebowl";
import HowItWorks from "@/components/home/HowItWorks";
import Categories from "@/components/home/Categories";
import Featured from "@/components/home/Featured";
import HeroSmoothiebowl from "@/components/home/HeroSmoothiebowl";
import Instagram from "@/components/home/Instagram";
import Location from "@/components/home/Location";
import Newsletter from "@/components/home/Newsletter";
import Sponsors from "@/components/home/Sponsors";

export default function Home() {
  return (
    <>
      {/* 1. Hero principal - Atraer atención y dar bienvenida */}
      <HeroPokebowl />

      {/* 2. Cómo funciona - Eliminar fricción y explicar el proceso */}
      <HowItWorks />

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
