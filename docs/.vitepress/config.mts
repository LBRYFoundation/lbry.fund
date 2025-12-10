import {readFileSync, writeFileSync} from "fs";
import path from "path";
import {defineConfig, SiteConfig, TransformContext} from 'vitepress';

const metaColor = '#27E4EB';
const metaLogo = '/logo.png';

/** @type {import('vitepress').DefaultTheme.Config} */
export default defineConfig({
  vite:{
    build:{
      chunkSizeWarningLimit: 5000,
    },
  },
  appearance: 'force-dark',
  lang: 'en-US',
  title: 'LBRY Fund',
  lastUpdated: true,
  description: 'The LBRY community invites everyone to join us in building a more free and open way to share content and information online.',
  transformHtml: (code: string): string => {
    return code.replace( /<head>/,`<head prefix="og: https://ogp.me/ns#">`);
  },
  head: [
    // Manifest
    ['link', { rel: 'icon', href: metaLogo }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'viewport', content: 'initial-scale=1,width=device-width' }],

    // Icons
    ['link', { rel: 'mask-icon', href: '/logo/safari-pinned-tab.svg', color: metaColor }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', sizes: '16x16', href: '/logo/favicon-16x16.png' }],
    ['link', { rel: 'icon', sizes: '32x32', href: '/logo/favicon-32x32.png' }],
    ['link', { rel: 'icon', sizes: '192x192', href: '/logo/android-chrome-192x192.png' }],
    ['link', { rel: 'icon', sizes: '512x512', href: '/logo/android-chrome-512x512.png' }],

    // Theme Color
    ['meta', { name: 'theme-color', content: metaColor }],
    ['meta', { name: 'msapplication-TileColor', content: metaColor }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:image', content: metaLogo }],

    // OpenGraph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image', content: metaLogo }],
  ],
  transformHead: (context: TransformContext): void => {
    let path = '/'+context.pageData.relativePath
      .replace(/index\.md$/,'')
      .replace(/\.md$/,'.html');

    // OpenGraph
    context.head.push([
      'meta',
      {
        content: context.description,
        property: 'og:description',
      },
    ]);
    context.head.push([
      'meta',
      {
        content: context.title,
        property: 'og:title',
      },
    ]);
    if(!context.pageData.isNotFound){
      context.head.push([
        'meta',
        {
          content: path,
          property: 'og:url',
        },
      ]);
    }

    // Twitter Card
    context.head.push([
      'meta',
      {
        content: context.description,
        name: 'twitter:description',
      },
    ]);
    context.head.push([
      'meta',
      {
        content: context.title,
        name: 'twitter:title',
      },
    ]);
    if(!context.pageData.isNotFound){
      context.head.push([
        'meta',
        {
          content: path,
          name: 'twitter:url',
        },
      ]);
    }
  },
  sitemap: {
    hostname: 'https://lbry.fund',
  },
  buildEnd: async (siteConfig: SiteConfig): void => {
    const sitemapFile: string = path.join(siteConfig.outDir,'sitemap.xml');

    // Wait for sitemap.xml to be made
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Modify sitemap.xml
    writeFileSync(sitemapFile,readFileSync(sitemapFile).toString().replace('<?xml version="1.0" encoding="UTF-8"?>','<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="sitemap.xsl" type="text/xsl"?>'));
  },
  themeConfig: {
    footer: {
      message: 'All Rights Reserved',
      copyright: '© '+(new Date().getFullYear())+' LBRY Foundation',
    },
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'About',
        link: '/#about'
      },
      {
        text: 'Submit Proposal',
        link: '/#proposal'
      },
      {
        text: 'Meetups',
        link: '/meetup'
      },
      {
        text: 'FAQ',
        link: '/#faq'
      },
      {
        text: 'Contact',
        link: '/#contact'
      },
    ],
  },
  cleanUrls: true,
});
