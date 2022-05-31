import Swiper, { Navigation, Pagination } from 'swiper';
import Component from "../classes/Component";
import variables from '../variables';

const { md } = variables.breakpoints;

export function blogSlider(
  rootSelector = '#blog'
) {

  return new Component({
    name: 'blogSlider',
    requiredSelector: rootSelector,

    onInit() {
      this.swiper = new Swiper(".js-blog-slider", {
        modules: [Navigation, Pagination],

        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 15,
        simulateTouch: true,

        navigation: {
          nextEl: '.js-blog-slider-next',
          prevEl: '.js-blog-slider-prev',
        },

        pagination: {
          el: '.js-blog-slider-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    },
    onDestroy() {
      this.swiper = null;
    },
  })
}