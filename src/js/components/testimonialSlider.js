import Swiper, { Navigation, Pagination } from "swiper";
import Component from "../classes/Component";

export function testimonialSlider(
  rootSelector = '#testimonial'
) {

  return new Component({
    name: 'testimonialSlider',
    requiredSelector: rootSelector,

    onInit() {
      this.swiper = new Swiper('.js-testimonial-slider', {
        modules: [Navigation, Pagination],

        direction: 'horizontal',
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 45,
        simulateTouch: true,

        pagination: {
          el: '.js-testimonial-slider-pagination',
          type: 'bullets',
          clickable: true
        }
      })
    },
    onDestroy() {
      this.swiper = null;
    }
  })
}