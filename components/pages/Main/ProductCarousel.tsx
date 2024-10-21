import Hardware1 from '@/app/images/main/Hardware_slide1.png';
import Hardware2 from '@/app/images/main/Hardware_slide2.png';
import Hardware3 from '@/app/images/main/Hardware_slide3.png';
import Solution_slide1 from '@/app/svgs/Solution_slide1.svg';
import Solution_slide2 from '@/app/svgs/Solution_slide2.svg';
import Solution_slide3 from '@/app/svgs/Solution_slide3.svg';
import dict from '@/dictionaries/main.json';

import ProductCard, { ProductDesc } from '@/components/pages/Main/ProductCard';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Language } from '@/types/globals.types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
type Props = {
  lang: Language;
  tabValue: string;
};

const ProductCarousel = ({ lang, tabValue }: Props) => {
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const [selectedSlide, setSelectedSlide] = useState<number>(0);
  const getSelectSlideIdx = React.useCallback((api: CarouselApi) => {
    if (api === undefined) return;
    const slideIdx = api.selectedScrollSnap();
    setSelectedSlide(slideIdx);
  }, []);
  useEffect(() => {
    getSelectSlideIdx(emblaApi);
    emblaApi?.on('select', getSelectSlideIdx);
    return () => {
      emblaApi?.off('select', getSelectSlideIdx);
    };
  }, [emblaApi, getSelectSlideIdx]);
  return (
    <Carousel
      setApi={(api) => {
        setEmblaApi(api);
      }}
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
      {tabValue === 'solution' && (
        <CarouselContent>
          <CarouselItem className="flex justify-center basis-1/2">
            <ProductCard isSelected={selectedSlide === 0}>
              <div className="flex justify-center">
                <div className="w-[450px] h-[450px]">
                  <Solution_slide1 />
                </div>
              </div>
              {selectedSlide === 0 && (
                <ProductDesc
                  desc={dict['Section4_Solution1_Desc'][lang]}
                  subDesc={dict['Section4_Solution1_SubDesc'][lang]}
                />
              )}
            </ProductCard>
          </CarouselItem>
          <CarouselItem className="flex justify-center basis-1/2">
            <ProductCard isSelected={selectedSlide === 1}>
              <div className="flex justify-center">
                <div className="w-[450px] h-[450px]">
                  <Solution_slide2 />
                </div>
              </div>
              {selectedSlide === 1 && (
                <ProductDesc
                  desc={dict['Section4_Solution2_Desc'][lang]}
                  subDesc={dict['Section4_Solution2_SubDesc'][lang]}
                />
              )}
            </ProductCard>
          </CarouselItem>
          <CarouselItem className="flex justify-center basis-1/2">
            <ProductCard isSelected={selectedSlide === 2}>
              <div className="flex justify-center">
                <div className="w-[450px] h-[450px]">
                  <Solution_slide3 />
                </div>
              </div>
              {selectedSlide === 2 && (
                <ProductDesc
                  desc={dict['Section4_Solution3_Desc'][lang]}
                  subDesc={dict['Section4_Solution3_SubDesc'][lang]}
                />
              )}
            </ProductCard>
          </CarouselItem>
        </CarouselContent>
      )}
      {tabValue === 'hardware' && (
        <CarouselContent>
          <CarouselItem className="flex justify-center basis-1/2">
            <ProductCard isSelected={selectedSlide === 0}>
              <div className="flex justify-center">
                <div className="w-[450px] h-[450px] relative">
                  <Image src={Hardware1} alt="Hardware1" fill />
                </div>
              </div>
              {selectedSlide === 0 && (
                <ProductDesc
                  desc={dict['Section4_Hardware1_Desc'][lang]}
                  subDesc={dict['Section4_Hardware1_SubDesc'][lang]}
                />
              )}
            </ProductCard>
          </CarouselItem>
          <CarouselItem className="flex justify-center basis-1/2">
            <ProductCard isSelected={selectedSlide === 1}>
              <div className="flex justify-center">
                <div className="w-[450px] h-[450px] relative">
                  <Image src={Hardware2} alt="Hardware2" fill />
                </div>
              </div>
              {selectedSlide === 1 && (
                <ProductDesc
                  desc={dict['Section4_Hardware2_Desc'][lang]}
                  subDesc={dict['Section4_Hardware2_SubDesc'][lang]}
                />
              )}
            </ProductCard>
          </CarouselItem>
          <CarouselItem className="flex justify-center basis-1/2">
            <ProductCard isSelected={selectedSlide === 2}>
              <div className="flex justify-center">
                <div className="w-[450px] h-[450px] relative">
                  <Image src={Hardware3} alt="Hardware3" fill />
                </div>
              </div>
              {selectedSlide === 2 && (
                <ProductDesc
                  desc={dict['Section4_Hardware3_Desc'][lang]}
                  subDesc={dict['Section4_Hardware3_SubDesc'][lang]}
                />
              )}
            </ProductCard>
          </CarouselItem>
        </CarouselContent>
      )}
    </Carousel>
  );
};

export default ProductCarousel;
