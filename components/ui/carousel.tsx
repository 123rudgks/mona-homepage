'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as React from 'react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);
export interface EmblaEventListType {
  init: 'init';
  pointerDown: 'pointerDown';
  pointerUp: 'pointerUp';
  slidesChanged: 'slidesChanged';
  slidesInView: 'slidesInView';
  scroll: 'scroll';
  select: 'select';
  settle: 'settle';
  destroy: 'destroy';
  reInit: 'reInit';
  resize: 'resize';
  slideFocusStart: 'slideFocusStart';
  slideFocus: 'slideFocus';
}
export type EmblaEventType = EmblaEventListType[keyof EmblaEventListType];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const TWEEN_FACTOR_BASE = 0.3;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins,
    );
    const tweenFactor = React.useRef(0);
    const tweenNodes = React.useRef<HTMLElement[]>([]);

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const setTweenNodes = React.useCallback(
      (emblaApi: UseEmblaCarouselType[1]): void => {
        if (emblaApi === undefined) return;
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
          return slideNode.querySelector(
            '.embla__slide__number',
          ) as HTMLElement;
        });
      },
      [],
    );
    const setTweenFactor = React.useCallback(
      (emblaApi: UseEmblaCarouselType[1]) => {
        if (emblaApi === undefined) return;
        tweenFactor.current =
          TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
      },
      [],
    );
    const tweenScale = React.useCallback(
      (emblaApi: UseEmblaCarouselType[1], event?: EmblaEventType) => {
        if (emblaApi === undefined) return;
        const engine = emblaApi?.internalEngine();
        const scrollProgress = emblaApi?.scrollProgress();
        const slidesInView = emblaApi?.slidesInView();
        const isScrollEvent = event === 'scroll';
        emblaApi?.scrollSnapList().forEach((scrollSnap, snapIndex) => {
          let diffToTarget = scrollSnap - scrollProgress;
          if (isScrollEvent && !slidesInView.includes(snapIndex)) return;
          if (opts?.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (snapIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[snapIndex];
          if (tweenNode) tweenNode.style.transform = `scale(${scale})`;

          // slidesInSnap.forEach((slideIndex) => {
          //   if (isScrollEvent && !slidesInView.includes(slideIndex)) return;
          //   if (engine.options.loop) {
          //     engine.slideLooper.loopPoints.forEach((loopItem) => {
          //       const target = loopItem.target();
          //       if (slideIndex === loopItem.index && target !== 0) {
          //         console.log(loopItem, target);

          //         const sign = Math.sign(target);

          //         if (sign === -1) {
          //           diffToTarget = scrollSnap - (1 + scrollProgress);
          //         }
          //         if (sign === 1) {
          //           diffToTarget = scrollSnap + (1 - scrollProgress);
          //         }
          //       }
          //     });
          //   }
          //   const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          //   const scale = numberWithinRange(tweenValue, 0, 1).toString();
          //   const tweenNode = tweenNodes.current[slideIndex];
          //   if (tweenNode) tweenNode.style.transform = `scale(${scale})`;
          // });
        });
      },
      [],
    );
    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      setTweenNodes(api);
      setTweenFactor(api);
      tweenScale(api);

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);
      api.on('reInit', tweenScale);
      api.on('scroll', tweenScale);
      api.on('slideFocus', tweenScale);

      return () => {
        api?.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}>
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden ">
      <div
        ref={ref}
        aria-roledescription="carousel-container"
        className={cn(
          'flex ',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full ',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      // variant={variant}
      // size={size}
      className={cn(
        'absolute  h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      // variant={variant}
      // size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}>
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
};
