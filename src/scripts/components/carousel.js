import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';

const carouselWrappers = document.querySelectorAll(`.carousel`);

carouselWrappers.forEach(wrapper => {
  const carousel = wrapper.querySelector(`.swiper`);
  const paginationContainer = carousel.querySelector(`.controls__pagination`);
  const prevButton = carousel.querySelector(`.controls__prev`);
  const nextButton = carousel.querySelector(`.controls__next`);

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
    }
  });
  
});

// Custom button click events
$('#first-button').on('click', function() {
  swiper.slideTo(0); // Go to the first slide
});
$('#last-button').on('click', function() {
  swiper.slideTo(swiper.slides.length - 1); // Go to the last slide
});