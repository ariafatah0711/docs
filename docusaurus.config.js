import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "docs.ariaf.my.id",
  tagline: "documentation by ariaf",
  favicon: "img/favicon.ico",
  url: "https://docs.ariaf.my.id",
  baseUrl: "/",
  organizationName: "ariafatah0711",
  projectName: "docs",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "id",
    locales: ["id"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          id: "default",
          path: "_linux", // Mengubah path ke _docs
          routeBasePath: "linux",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/ariafatah0711/docs/tree/main/",
        },
        blog: {
          path: "_blog", // Mengubah path ke _blog
          showReadingTime: true,
          editUrl: "https://github.com/ariafatah0711/docs/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "storage",
        path: "_storage",
        routeBasePath: "storage",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/ariafatah0711/docs/tree/main/",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "cybersec",
        path: "_cybersec",
        routeBasePath: "cybersec",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/ariafatah0711/docs/tree/main/",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "scripting",
        path: "_scripting",
        routeBasePath: "scripting",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/ariafatah0711/docs/tree/main/",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "cisco",
        path: "_cisco",
        routeBasePath: "cisco",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/ariafatah0711/docs/tree/main/",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "mikrotik",
        path: "_mikrotik",
        routeBasePath: "mikrotik",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/ariafatah0711/docs/tree/main/",
      },
    ],
    // [
    //   "@docusaurus/plugin-content-docs",
    //   {
    //     id: "android_debug",
    //     path: "_android_debug",
    //     routeBasePath: "android_debug",
    //     sidebarPath: require.resolve("./sidebars.js"),
    //     editUrl: "https://github.com/ariafatah0711/docs/tree/main/",
    //   },
    // ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "docs_aria",
        logo: {
          alt: "docs_aria",
          src: "img/profil.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "default",
            position: "left",
            label: "linux",
            docsPluginId: "default",
          },
          {
            type: "docSidebar",
            sidebarId: "default",
            position: "left",
            label: "storage",
            docsPluginId: "storage",
          },
          {
            type: "docSidebar",
            sidebarId: "default",
            position: "left",
            label: "cybersec",
            docsPluginId: "cybersec",
          },
          {
            type: "docSidebar",
            sidebarId: "default",
            position: "left",
            label: "cisco",
            docsPluginId: "cisco",
          },
          {
            type: "docSidebar",
            sidebarId: "default",
            position: "left",
            label: "mikrotik",
            docsPluginId: "mikrotik",
          },
          {
            type: "docSidebar",
            sidebarId: "default",
            position: "left",
            label: "scripting",
            docsPluginId: "scripting",
          },
          // {
          //   type: "docSidebar",
          //   sidebarId: "default",
          //   position: "left",
          //   label: "android_debug",
          //   docsPluginId: "android_debug",
          // },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/ariafatah0711/docs",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https:/ariaf.my.id",
            label: "ariaf.my.id",
            position: "right",
          },
          // {
          // type: "localeDropdown",
          // position: "right",
          // },
        ],
      },
      // footer: {
      //   style: "dark",
      //   links: [
      //     {
      //       title: "Docs",
      //       items: [
      //         {
      //           label: "linux",
      //           to: "/linux",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Community",
      //       items: [
      //         {
      //           label: "Discord",
      //           href: "https://s.id/dev-universe",
      //         },
      //       ],
      //     },
      //     {
      //       title: "More",
      //       items: [
      //         {
      //           label: "Blog",
      //           to: "/blog",
      //         },
      //         {
      //           label: "GitHub",
      //           href: "https://github.com/ariafatah0711/docs",
      //         },
      //       ],
      //     },
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      // },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
