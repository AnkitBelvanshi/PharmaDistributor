import { useCallback, useEffect, useState } from 'react';

const slides = [
  {
    src: '/images/carousel-1.jpg',
    alt: 'Pharmaceutical laboratory testing',
    headline: 'Quality You Can Trust',
    sub: 'Every product sourced from WHO-GMP certified manufacturers.',
  },
  {
    src: '/images/carousel-2.jpg',
    alt: 'Medicine capsules and tablets',
    headline: 'Wide Range of Medicines',
    sub: 'Over 500 pharmaceutical products available for fast delivery.',
  },
  {
    src: '/images/carousel-3.jpg',
    alt: 'Healthcare research and development',
    headline: 'Your Healthcare Partner',
    sub: 'Serving 1,200+ hospitals, clinics, and pharmacies nationwide.',
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  // Auto-advance every 5 s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-900" style={{ height: '480px' }}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Caption */}
          <div className="absolute inset-0 flex items-center">
            <div className="page-container">
              <div
                className={`max-w-lg transition-all duration-700 ${
                  i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                  {slide.headline}
                </h2>
                <p className="text-gray-200 text-base sm:text-lg">{slide.sub}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus:outline-none"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors focus:outline-none"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
              i === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
