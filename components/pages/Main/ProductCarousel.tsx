import ProductCard from '@/components/pages/Main/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
type Props = {};

const ProductCarousel = (props: Props) => {
  return (
    <Carousel
      opts={{
        loop: true,
        active: true,
        // watchFocus: (api, e) => {
        //   // console.log(api.slideNodes());
        // },
        // watchDrag: (api) => {
        //   // console.log(api.slidesInView());
        // },
        watchSlides: (api) => {
          console.log(api.slidesInView());
        },
      }}>
      <CarouselContent>
        <CarouselItem className="flex justify-center basis-1/2">
          <ProductCard theme="primary" />
        </CarouselItem>
        <CarouselItem className="flex justify-center basis-1/2">
          <ProductCard />
        </CarouselItem>
        <CarouselItem className="flex justify-center basis-1/2">
          <ProductCard />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default ProductCarousel;
