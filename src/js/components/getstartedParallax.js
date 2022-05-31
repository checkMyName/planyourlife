import { $events } from '../helpers/events';
import { $style } from '../helpers/style';
import Component from '../classes/Component';
import { getRandomInt } from '../helpers/_utilities';
import { $dom } from '../helpers/dom';

const { get, append, html, each, clone } = $dom;
const { set, remove } = $style

const sectionIdName = '#getstarted';
const targetsSelector = get('#js-getstarted-parallax-element');

export function getstartedParallax(
  rootSelector = '#js-getstarted-parallax'
) {
  const root = get(rootSelector);

  const arraySize = 10;
  const elementsArray = new Array(arraySize).fill(null).map(() => clone(targetsSelector));
  const depthsArray = new Array(arraySize).fill(null).map(() => getRandomInt(1, 4) / 100);
  const opacityArray = new Array(arraySize).fill(null).map(() => getRandomInt(40, 80));

  const printElements = () => {
    html(root, '');

    each(elementsArray, element => {
      append(root, element);
    });
  };

  const setupRandomPosition = () => {
    const clientHeight = root.clientHeight - 100;
    const clientWidth = root.clientWidth - 100;
    each(elementsArray, element => {
      remove(element, ['top', 'left', 'transform']);

      const scale = "scale(" + getRandomInt(6, 15) / 10 + ")";
      set(element, 'top', Math.floor(getRandomInt(0, clientHeight)) + "px");
      set(element, 'left', Math.floor(getRandomInt(0, clientWidth)) + "px");
      set(get('svg', element), 'transform', scale);
    });
  }

  const setupParallax = event => {
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
    name: 'getstartedParallax',
    requiredSelector: rootSelector,

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
    },
  })
}