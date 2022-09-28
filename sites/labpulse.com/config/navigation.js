const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const businessInsights = [
  { href: '/business-insights/trends-and-finance', label: 'Trends & Finance' },
  { href: '/business-insights/policy-and-regulation', label: 'Policy & Regulation' },
  { href: '/business-insights/people-on-the-move', label: 'People on the Move' },
];

const researchDevelopment = [
  { href: '/research-and-development/clinical-trial', label: 'Clinical Trials' },
  { href: '/research-and-development/collaboration', label: 'Collaboration' },
  { href: '/research-and-development/funding', label: 'Funding' },
  // { href: '/research-and-development/ruo', label: 'RUO' },
];

const diagnosticTechnologies = [
  { href: '/diagnostic-technologies/molecular-diagnostics', label: 'Molecular Diagnostics' },
  { href: '/diagnostic-technologies/immunoassays', label: 'Immunoassays' },
  { href: '/diagnostic-technologies/pathology-and-ai', label: 'Pathology & AI' },
  { href: '/diagnostic-technologies/clinical-chemistry', label: 'Clinical Chemistry' },
  { href: '/diagnostic-technologies/emerging-technology', label: 'Emerging Technology' },
];

const diseases = [
  { href: '/diseases/cancer', label: 'Cancer' },
  { href: '/diseases/infectious', label: 'Infectious' },
  { href: '/diseases/covid-19', label: 'COVID-19' },
  { href: '/diseases/cardiovascular', label: 'Cardiovascular' },
  { href: '/diseases/autoimmune', label: 'Autoimmune' },
  { href: '/diseases/health-topics', label: 'Health Topics' },
];

const resources = [
  { href: '/page/about-us', label: 'About Us' },
  { href: '/resources/cases', label: 'Cases' },
  // { href: '/resources/conferences', label: 'Conferences' },
  // { href: '/showcasts', label: 'Showcasts' },
  // { href: '/resources/vendors', label: 'Vendors' },
  { href: '/resources/video', label: 'Videos' },
  { href: '/resources/webinars', label: 'Webinars' },
];

const topics = [
  { href: '/business-insights', label: 'Business Insights', children: businessInsights },
  { href: '/diagnostic-technologies', label: 'Diagnostic Technologies', children: diagnosticTechnologies },
  { href: '/diseases', label: 'Diseases', children: diseases },
  { href: '/point-of-care-testing', label: 'Point-of-Care Testing' },
  { href: '/research-and-development', label: 'Research & Development', children: researchDevelopment },
];

const mobileMenu = {
  primary: topics,
  secondary: resources,
};

module.exports = {
  type: 'navbar-c',
  promos: [
    {
      title: subscribe.label,
      callToAction: subscribe.label,
      link: subscribe.href,
    },
  ],
  user: {
    items: [
      {
        href: '/page/Account',
        label: 'Sign In',
        when: 'logged-out',
        modifiers: ['user'],
      },
      // {
      //   href: '/login',
      //   label: 'Sign In',
      //   when: 'logged-out',
      //   modifiers: ['user'],
      // },
      {
        href: '/logout',
        label: 'Sign Out',
        when: 'logged-in',
        modifiers: ['user'],
      },
    ],
    tools: [
      {
        href: '/page/Account',
        label: 'Sign In',
        when: 'logged-out',
        modifiers: ['user'],
      },
      // {
      //   href: '/login',
      //   label: 'Sign In',
      //   when: 'logged-out',
      //   modifiers: ['user'],
      // },
      {
        href: '/user/profile',
        label: 'Modify profile',
        when: 'logged-in',
        modifiers: ['user'],
      },
      {
        href: '/logout',
        label: 'Sign Out',
        when: 'logged-in',
        modifiers: ['user'],
      },
    ],
  },
  mobileMenu,
  topics,
  primary: {
    items: resources,
  },
  secondary: {
    items: topics,
  },
  tertiary: {
    items: [],
  },
  contexts: [
    {
      when: ['/business-insights'],
      secondary: {
        items: topics,
      },
      tertiary: { items: [] },
      primary: {
        items: businessInsights,
      },
    },
    {
      when: ['/diagnostic-technologies'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: diagnosticTechnologies,
      },
    },
    {
      when: ['/diseases'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: diseases,
      },
    },
    {
      when: ['/research-and-development'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: researchDevelopment,
      },
    },
    {
      when: ['/resources'],
      secondary: { items: [...topics] },
      tertiary: { items: [] },
      primary: {
        items: resources,
      },
    },
  ],
  toggleMenu: {
    col1: {
      label: 'Business Insights',
      items: businessInsights,
    },
    col2: {
      label: 'Research & Development',
      items: researchDevelopment,
    },
    col3: {
      label: 'Diagnostic Technologies',
      items: diagnosticTechnologies,
    },
    col4: {
      label: 'Diseases',
      items: diseases,
    },
    col5: {
      label: 'Resources',
      items: resources,
    },
  },
  footer: {
    col1: {
      label: 'Business Insights',
      items: businessInsights,
    },
    col2: {
      label: 'Research & Development',
      colspan: '3',
      items: researchDevelopment,
    },
    col3: {
      label: 'Diagnostic Technologies',
      colspan: '3',
      items: diagnosticTechnologies,
    },
    col4: {
      label: 'Diseases',
      items: diseases,
    },
    col5: {
      label: 'Resources',
      items: resources,
    },
    // col3: {
    //   label: 'More',
    //   items: [
    //     { href: '#', label: 'TBD' },
    //     { href: '#', label: 'TBD' },
    //   ],
    // },
    items: [
      privacyPolicy,
      { href: '/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
    ],
  },
};
