import Hardware1 from '@/app/images/main/Hardware_slide1.png';
import Hardware2 from '@/app/images/main/Hardware_slide2.png';
import Hardware3 from '@/app/images/main/Hardware_slide3.png';
import ChevronLeft from '@/app/svgs/main/ChevronLeft.svg';
import Solution_slide1 from '@/app/svgs/main/Solution_slide1.svg';
import Solution_slide2 from '@/app/svgs/main/Solution_slide2.svg';
import Solution_slide3 from '@/app/svgs/main/Solution_slide3.svg';
import dict from '@/dictionaries/main.json';

import ProductCarouselItem from '@/components/pages/Main/ProductCarouselItem';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
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
  const totalSlides = emblaApi?.slideNodes().length || 0;
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
    <>
      <Carousel
        setApi={(api) => {
          setEmblaApi(api);
        }}
        opts={{
          loop: false,
          active: true,
          // align: 'start',
          containScroll: false,
          // skipSnaps: true,
        }}>
        {tabValue === 'solution' && (
          <CarouselContent>
            <ProductCarouselItem
              isSelected={selectedSlide === 0}
              cardImg={<Solution_slide1 />}
              desc={[
                dict['Section4_Solution1_Desc1'][lang],
                dict['Section4_Solution1_Desc2'][lang],
              ]}
              subDesc={[dict['Section4_Solution1_SubDesc'][lang]]}
            />
            <ProductCarouselItem
              isSelected={selectedSlide === 1}
              cardImg={<Solution_slide2 />}
              desc={[dict['Section4_Solution2_Desc'][lang]]}
              subDesc={[
                dict['Section4_Solution2_SubDesc1'][lang],
                dict['Section4_Solution2_SubDesc2'][lang],
              ]}
            />
            <ProductCarouselItem
              isSelected={selectedSlide === 2}
              cardImg={<Solution_slide3 />}
              desc={[dict['Section4_Solution3_Desc'][lang]]}
              subDesc={[dict['Section4_Solution3_SubDesc'][lang]]}
            />
          </CarouselContent>
        )}
        {tabValue === 'hardware' && (
          <CarouselContent>
            <ProductCarouselItem
              isSelected={selectedSlide === 0}
              cardImg={<Image src={Hardware1} alt="Hardware1" fill />}
              desc={[dict['Section4_Hardware1_Desc'][lang]]}
              subDesc={[dict['Section4_Hardware1_SubDesc'][lang]]}
            />

            <ProductCarouselItem
              isSelected={selectedSlide === 1}
              cardImg={<Image src={Hardware2} alt="Hardware2" fill />}
              desc={[dict['Section4_Hardware2_Desc'][lang]]}
              subDesc={[dict['Section4_Hardware2_SubDesc'][lang]]}
            />

            <ProductCarouselItem
              isSelected={selectedSlide === 2}
              cardImg={<Image src={Hardware3} alt="Hardware3" fill />}
              desc={[dict['Section4_Hardware3_Desc'][lang]]}
              subDesc={[dict['Section4_Hardware3_SubDesc'][lang]]}
            />
          </CarouselContent>
        )}
      </Carousel>
      <div className="flex gap-5 items-center justify-center mt-[30px] lg-screen:mt-8 mb-[60px] sm-screen:mb-[100px] xl-screen:mb-[140px]">
        <button
          className="w-6 h-6 group"
          onClick={
            selectedSlide === 0
              ? () => emblaApi?.scrollTo(selectedSlide)
              : () => emblaApi?.scrollTo(selectedSlide - 1)
          }
          disabled={selectedSlide === 0}>
          <ChevronLeft className="group-disabled:[&>path]:fill-grayscale-500" />
        </button>
        <div className="flex gap-[10px]">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={
                selectedSlide === idx
                  ? () => emblaApi?.scrollTo(selectedSlide)
                  : () => emblaApi?.scrollTo(idx)
              }
              className={`w-3 h-3 rounded-full cursor-pointer ${
                selectedSlide === idx
                  ? 'w-9 bg-primary-alpha-70'
                  : 'bg-primary-alpha-30'
              }`}
            />
          ))}
        </div>
        <button
          className="group w-6 h-6 rotate-180 "
          onClick={
            selectedSlide === totalSlides - 1
              ? () => emblaApi?.scrollTo(selectedSlide)
              : () => emblaApi?.scrollTo(selectedSlide + 1)
          }
          disabled={selectedSlide === totalSlides - 1}>
          <ChevronLeft className="group-disabled:[&>path]:fill-grayscale-500" />
        </button>
      </div>
    </>
  );
};

export default ProductCarousel;
