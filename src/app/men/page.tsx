import Image from "next/image";
import Badge from "@/app/components/common/badge/badge";

import VerticalCarousel, {
  VerticalCarouselItem,
} from "@/app/components/sections/verticalCarousel/verticalCarousel";

// ------------------------------------------------------------------

const CONST_MEN_HOME_PAGE_CAROUSEL_ITEMS: VerticalCarouselItem[] = [
  {
    id: "1",
    imageUrl: "/home-women/home-img-1.jpg",
  },
  {
    id: "2",
    imageUrl: "/home-men/home-img-2.jpg",
    content: (
      <>
        <h2>Seamless Down Parka</h2>
        <p>Engineered for peak performance in cold weather.</p>

        <p>
          <span
            style={{
              fontSize: 48,
              fontWeight: "bold",
            }}
          >
            $129.90
          </span>
        </p>

        <p>
          <span
            style={{
              textDecoration: "line-through",
            }}
          >
            $179.90
          </span>
        </p>

        <p>Limited time offer until 1/8</p>
      </>
    ),
  },
  {
    id: "3",
    imageUrl: "/home-women/home-img-3.jpg",
    content: (
      <>
        <Image
          alt="Uniqlo:C"
          src="/branding/uniqlo-c.png"
          width={90}
          height={30}
        />
        <h2>Best-Sellers for a Reason: Now in New Colors</h2>
        <p>
          Shop sweatsets by Clare Waight Keller offering a refined take on
          relaxed essentials.
        </p>
      </>
    ),
  },
  {
    id: "4",
    imageUrl: "/home-men/home-img-4.jpg",
    content: (
      <>
        <h2>Winter Edit</h2>
        <p>Seasonal essentials for effortless style and warmth.</p>
      </>
    ),
  },
  {
    id: "5",
    imageUrl: "/home-men/home-img-5.jpg",
    content: (
      <>
        <Image
          alt="HEATTECH"
          src="/branding/heattech-logo.jpg"
          width={30}
          height={30}
        />

        <h2>HEATTECH Extra Warm Cashmere Blend</h2>
        <p>Extra warm, with a touch of luxury.</p>
      </>
    ),
  },
  {
    id: "6",
    imageUrl: "/home-men/home-img-6.jpg",
    content: (
      <>
        <Image
          alt="PUFFTECH"
          src="/branding/uniqlo-pufftech.png"
          width={90}
          height={30}
        />

        <h2>PUFFTECH Parka</h2>
        <p>Innovative, high-performance insulation.</p>
      </>
    ),
  },
  {
    id: "7",
    imageUrl: "/home-men/home-img-7.jpg",
    content: (
      <>
        <Badge title="New" />

        <h2>New Year, New UNIQLO</h2>
        <p>
          Get a fresh start with just-arrived fresh styles, like the Harrington
          Jacket.
        </p>
      </>
    ),
  },
];

// ------------------------------------------------------------------

export default function Home() {
  return <VerticalCarousel items={CONST_MEN_HOME_PAGE_CAROUSEL_ITEMS} />;
}
