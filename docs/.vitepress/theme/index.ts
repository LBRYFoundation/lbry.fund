import {Icon} from "@iconify/vue";
import type {EnhanceAppContext} from "vitepress";
import DefaultTheme from 'vitepress/theme';

import Layout from './Layout.vue';

import _redirects from "/_redirects?url&raw";
const redirects = _redirects.split('\n').filter(String).map((item: string[]) => item.split(/\x20+/)).filter((item: string) => item[0].indexOf(':')===-1 && item[0].indexOf('*')===-1);

/** @type {import('vitepress').Theme} */
export default {
  Layout,
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component('IconifyIcon',Icon)

    router.onAfterRouteChange = async (to: string) => {
      // Static redirects
      redirects.forEach((item: string[]) => {
        if(to===item[0] || to.startsWith(item[0]+'?') || to.startsWith(item[0]+'#')){
          router.go(item[1]);
        }
      });
    };
  },
  extends: DefaultTheme,
};
