import tippy from 'tippy.js';
import Component from '../classes/Component';
import { $dom } from '../helpers/dom';

const { get } = $dom;

export function introTippy(
  rootSelector = "#intro__chart"
) {

  const chartTippyTemplate = get('#intro-tooltip');

  return new Component({
    name: 'aboutParallax',
    requiredSelector: rootSelector,

    onInit() {
      this.tippy = tippy('.js-tooltip-button', {
        content: chartTippyTemplate.innerHTML,
        allowHTML: true,
        theme: 'white',
      })
    },
    onDestroy() {

    },
  })
}