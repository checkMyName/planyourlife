import Component from "../classes/Component";
import { $dom } from "../helpers/dom";
import { $events } from "../helpers/events";
import { $style } from "../helpers/style";

const { get, hasClass, addClass, removeClass } = $dom;

export function siteMenu(
  rootSelector = '#js-site-menu'
) {

  const burgerButtonElement = get('.js-burger-button');
  const burgerButtonClass = 'is-active';

  const headerElement = get('.js-header');

  const firstSectionElement = get('section');

  const setFirstSectionOffset = () => {
    $style.remove(firstSectionElement, 'padding-top');
    $style.set(firstSectionElement, 'padding-top', `${headerElement.offsetHeight}px`);
  }

  const openMenuHundler = () => {
    if (!hasClass(burgerButtonElement, burgerButtonClass)) {
      addClass(burgerButtonElement, burgerButtonClass);
    }

    console.log('menu was opened');
  };

  const closeMenuHundler = () => {
    if (hasClass(burgerButtonElement, burgerButtonClass)) {
      removeClass(burgerButtonElement, burgerButtonClass);
    }

    console.log('menu was closed');
  };

  return new Component({
    name: 'siteMenu',
    requiredSelector: rootSelector,

    onInit() {
      setFirstSectionOffset();

      $events.resize('on', setFirstSectionOffset);

      $events.delegate
        .on('hide.bs.offcanvas', rootSelector, closeMenuHundler)
        .on('show.bs.offcanvas', rootSelector, openMenuHundler);
    },
    onDestroy() {
      $events.delegate
        .off('hide.bs.offcanvas', rootSelector, closeMenuHundler)
        .off('show.bs.offcanvas', rootSelector, openMenuHundler);
    },
  })
}