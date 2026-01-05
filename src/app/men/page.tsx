import VerticalCarousel from "@/features/home/components/verticalCarousel/verticalCarousel";

import { CONST_MEN_HOME_PAGE_CAROUSEL_ITEMS } from "@/features/home/constants";

// ------------------------------------------------------------------

export default function Home() {
  const carouselItems = CONST_MEN_HOME_PAGE_CAROUSEL_ITEMS;

  return <VerticalCarousel items={carouselItems} />;
}
