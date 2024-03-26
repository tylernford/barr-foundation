import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const carouselWrappers = document.querySelectorAll(`.carousel`);

carouselWrappers.forEach(wrapper => {
  const carousel = wrapper.querySelector(`.swiper`);
  const paginationContainer = carousel.querySelector(`.controls__pagination`);
  const prevButton = carousel.querySelector(`.controls__prev`);
  const nextButton = carousel.querySelector(`.controls__next`);
  const firstButton = carousel.querySelector(`.controls__first`);
  const lastButton = carousel.querySelector(`.controls__last`);

  const swiper = new Swiper(carousel, {
    modules: [ Pagination, Navigation ],
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 750,
    pagination: {
      el: paginationContainer,
    },
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton
    },
    keyboard: {
      enabled: true
    },
    on: {
      init: function () {
        firstButton.addEventListener('click', () => {
          this.slideTo(0); // Go to the first slide
        });
        lastButton.addEventListener('click', () => {
          this.slideTo(this.slides.length - 1); // Go to the last slide
        });
      },
    },
  });
  
});

