
import MonoRail from '@parameter1/base-cms-marko-web-theme-monorail/browser';

const ContentMeterTrack = () => import(/* webpackChunkName: "content-meter-tracker" */ './track-content-meter.vue');
const RevealAdHandler = () => import(/* webpackChunkName: "reveal-ad-handler" */ './reveal-ad-handler.vue');

export default (Browser) => {
  MonoRail(Browser);
  Browser.register('ContentMeterTrack', ContentMeterTrack);
  Browser.register('RevealAdHandler', RevealAdHandler);
};
