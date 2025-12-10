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
  description: 'The LBRY Fund aims to promote the adoption and use of the LBRY Protocol, LBRY app, and Spee.ch.',
  transformHtml: (code: string): string => {
    return code.replace( /<head>/,`<head prefix="og: https://ogp.me/ns#">`);
  },
  head: [
    // Manifest
    ['link', { rel: 'icon', href: metaLogo }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'viewport', content: 'initial-scale=1,width=device-width' }],

    // Icons
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'mask-icon', href: '/logo/safari-pinned-tab.svg', color: metaColor }],
    ['link', { rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '57x57', href: '/img/apple-touch-icon-57x57.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '72x72', href: '/img/apple-touch-icon-72x72.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '76x76', href: '/img/apple-touch-icon-76x76.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '114x114', href: '/img/apple-touch-icon-114x114.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '144x144', href: '/img/apple-touch-icon-144x144.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '152x152', href: '/img/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon-180x180.png' }],
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

    context.head.push([
      'meta',
      {
        content: [
          'lbry, lbc credits, development fund, cryptocurrency fund, cryptocurrency, lbry foundation',
        ].join(', '),
        name: 'keywords',
      },
    ]);

    // Facebook
    context.head.push([
      'meta',
      {
        content: '1673146449633983',
        property: 'fb:app_id',
      },
    ]);

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
        content: 'LBRY Fund',
        property: 'og:site_name',
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
        content: '@lbryio',
        name: 'twitter:site',
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
    editLink: {
      pattern: (payload: PageData): string => {
        return `https://github.com/LBRYFoundation/lbry.fund/edit/master/docs/${payload.filePath}`;
      },
      text: 'Improve this page on GitHub!',
    },
    footer: {
      message: 'All Rights Reserved',
      copyright: '© '+(new Date().getFullYear())+' LBRY Foundation',
    },
    logo: '/img/foundationlogo1.png',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'About',
        link: '/#about',
      },
      {
        text: 'Submit Proposal',
        link: '/proposal/',
      },
      {
        text: 'Meetups',
        link: '/meetup/',
      },
      {
        text: 'Creator',
        link: '/creator/',
      },
      {
        text: 'FAQ',
        link: '/#faq',
      },
      {
        text: 'Contact',
        link: '/#contact',
      },
    ],
    search: {
      provider: 'local',
    },
    outline: false,
    siteTitle: false,
    socialLinks: [
      {
        icon: 'twitter',
        link: 'https://twitter.com/lbryio',
      },
      {
        icon: 'facebook',
        link: 'https://facebook.com/lbryio',
      },
      {
        icon: 'instagram',
        link: 'https://instagram.com/lbryio',
      },
      {
        icon: 'discord',
        link: 'https://chat.lbry.com',
      },
      {
        icon: 'reddit',
        link: 'https://reddit.com/r/lbry',
      },
      {
        icon: 'telegram',
        link: 'https://t.me/lbryofficial',
      },
      {
        icon: 'discourse',
        link: 'https://forum.lbry.com',
      },
      {
        icon: 'bitcoin',
        link: 'https://bitcointalk.org/index.php?topic=5116826.0',
      },
    ],
  },
  cleanUrls: true,
});
