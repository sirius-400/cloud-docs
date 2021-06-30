/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Travel Partner by Sirius',
  tagline: 'Your Partner for Local Exploration',
  url: 'https://opensource.poros-cys.com/cloud-docs',
  baseUrl: '/cloud-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'opensource.poros-cys.com', // Usually your GitHub org/user name.
  projectName: 'cloud-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Travel Partner by Sirius',
      logo: {
        alt: 'Travel Partner Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'overview',
          position: 'left',
          label: 'Cloud Docs',
        },
        {
          href: 'https://github.com/sirius-400/cloud-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Cloud Docs',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/sirius-400/cloud-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Travel Partner by Sirius, Inc. Built with Docusaurus.`,
    },
		customFields: {
			generator: 'Powered by Docusaurus',
		}
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/sirius-400/cloud-docs/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
