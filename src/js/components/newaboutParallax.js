import Component from '../classes/Component';
import { $events } from '../helpers/events';
import { $style } from '../helpers/style';
import { getRandomInt } from '../helpers/_utilities';
import { $dom } from '../helpers/dom';

const { get, append, html, each, clone } = $dom;
const { set, remove } = $style

const sectionIdName = '#about';
const targetsSelector = get('#js-about-parallax-element');

export function newaboutParallax(
  rootSelector = '#js-about-parallax'
) {

  const root = get(rootSelector);

  console.log('printElements');
  console.log(sectionIdName);

  const arraySize = 10;
  const elementsArray = new Array(arraySize).fill(null).map(() => clone(targetsSelector));
  const depthsArray = new Array(arraySize).fill(null).map(() => getRandomInt(3, 7) / 100);
  const opacityArray = new Array(arraySize).fill(null).map(() => getRandomInt(40, 80));

  const printElements = () => {

    console.log('printElements');

    html(root, '');

    each(elementsArray, element => {
      append(root, element);
    });
  };

  const setupRandomPosition = () => {

    console.log('setupRandomPosition');

    const clientHeight = root.clientHeight - 100;
    const clientWidth = root.clientWidth - 100;
    each(elementsArray, element => {
      remove(element, ['top', 'left', 'transform']);

      const scale = "scale(" + getRandomInt(6, 10) / 10 + ")";
      set(element, 'top', Math.floor(getRandomInt(0, clientHeight)) + "px");
      set(element, 'left', Math.floor(getRandomInt(0, clientWidth)) + "px");
      set(get('svg', element), 'transform', scale);
    });
  }

  const setupParallax = event => {

    console.log('setupParallax');

    const rootHeight = root.clientHeight;
    const rootWidth = root.clientWidth;
    const offsetX = event.pageX;
    const offsetY = event.pageY;

    each(elementsArray, (element, i) => {
      remove(element, ['transform']);

      set(element, 'transform', "translate(" + Math.round(50 - (offsetX - rootWidth) * depthsArray[i]) + "px, " + Math.round(50 - (offsetY - rootHeight) * depthsArray[i]) + "px)");
      set(element, 'opacity', opacityArray[i] + "%");
    });
  };

  return new Component({
    name: 'newaboutParallax',
    requiredSelector: rootSelector,

    onCreate() {

    },

    onInit() {
      printElements();
      setupRandomPosition();

      $events.resize('on', setupRandomPosition);

      $events.delegate
        .on('mousemove', sectionIdName, setupParallax);
    },

    onDestroy() {
      $events.delegate
        .off('mousemove', sectionIdName, setupParallax);
    }
  })
}