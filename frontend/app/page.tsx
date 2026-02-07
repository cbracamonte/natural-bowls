import HeroPokebowl from '@/components/home/HeroPokebowl';
import HowItWorks from '@/components/home/HowItWorks';
import Categories from '@/components/home/Categories';
import Featured from '@/components/home/Featured';
import Values from '@/components/home/Values';
import HeroSmoothiebowl from '@/components/home/HeroSmoothiebowl';
import Instagram from '@/components/home/Instagram';
import Location from '@/components/home/Location';
import Newsletter from '@/components/home/Newsletter';

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

      {/* 5. Valores - Generar confianza en la marca */}
      <Values />

      {/* 6. Segundo hero - Mostrar diversidad de productos */}
      <HeroSmoothiebowl />

      {/* 7. Instagram - Más social proof y engagement */}
      <Instagram />

      {/* 8. Ubicación - Facilitar acceso y contacto */}
      <Location />

      {/* 9. Newsletter - Conversiones finales */}
      <Newsletter />
    </>
  );
}
