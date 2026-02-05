import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Categories from '@/components/home/Categories';
import Featured from '@/components/home/Featured';
import Newsletter from '@/components/home/Newsletter';
import Values from '@/components/home/Values';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Categories />
      <Featured />
      <Newsletter />
      <Values />
    </>
  );
}
