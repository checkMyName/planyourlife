import Component from "../classes/Component";
import { $dom } from "../helpers/dom";
import { $events } from "../helpers/events";
import { $style } from "../helpers/style";

const { get, callAll, attr, addClass, removeClass } = $dom
const { set, offset } = $style

const chartRootId = 'intro__chart';
const hoverChartPointDataAttr = "data-hover-tooltip-point";
const hoverChartPointSelector = `#${chartRootId} [${hoverChartPointDataAttr}]`;
const hoverChartContentDataAttr = "data-hover-tooltip-content";
const hoverChartContentSelector = `#${chartRootId} [${hoverChartContentDataAttr}]`;

const directionEnter = 'enter';
const directionOut = 'out';

export function introChart(
  rootSelector = [hoverChartPointSelector, hoverChartContentSelector]
) {

  const getBoundContent = p => get(`[${hoverChartContentDataAttr}=${attr(p, hoverChartPointDataAttr)}]`);

  const mouseHandler = (point, direction) => {

    const content = getBoundContent(point);

    switch (direction) {

      case directionEnter:
        addClass(content, 'shown');
        break;
      case directionOut:
        removeClass(content, 'shown');
        break;
    }
  }

  const setupPositions = () => {
    callAll(hoverChartPointSelector, point => {

      const { top, left } = offset(point);

      const {width, height} = point.getBoundingClientRect();

      const content = getBoundContent(point);

      console.log('position setted');

      set(content, {
        left: `${(left - (content.offsetWidth / 2)) + (width / 2)}px`,
        top: `${(top - (content.offsetHeight * 1.5))}px`,
      });

    })
  }

  return new Component({
    name: 'introChart',
    requiredSelector: rootSelector,

    onInit() {
      setupPositions();
      
      $events
        .add('mouseenter', hoverChartPointSelector, event => mouseHandler(event.target, directionEnter))
        .add('mouseleave', hoverChartPointSelector, event => mouseHandler(event.target, directionOut))
        .resize('on', setupPositions)
    },
    onDestroy() {
      $events
        .remove('mouseenter', hoverChartPointSelector, event => mouseHandler(event.target, directionEnter))
        .remove('mouseleave', hoverChartPointSelector, event => mouseHandler(event.target, directionOut))
        .resize('off', setupPositions)
    },
  })
}