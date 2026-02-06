import HeroPokebowl from '@/components/home/HeroPokebowl';
import HeroTransition from '@/components/home/HeroTransition';
import HeroSmoothiebowl from '@/components/home/HeroSmoothiebowl';
import HowItWorks from '@/components/home/HowItWorks';
import Categories from '@/components/home/Categories';
import Featured from '@/components/home/Featured';
import Newsletter from '@/components/home/Newsletter';
import Values from '@/components/home/Values';

export default function Home() {
  return (
    <>
      <HeroPokebowl />
      <HeroTransition />
      <HeroSmoothiebowl />
      <HowItWorks />
      <Categories />
      <Featured />
      <Newsletter />
      <Values />
    </>
  );
}
