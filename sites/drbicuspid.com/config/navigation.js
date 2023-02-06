const subscribe = require('./subscribe');
const privacyPolicy = require('./privacy-policy');

const dentalPractice = [
  { href: '/dental-practice/dental-assistant', label: 'Dental Assistant' },
  { href: '/dental-practice/legal-issues', label: 'Legal Issues' },
  { href: '/dental-practice/office-management', label: 'Office Management' },
  { href: '/dental-practice/patient-communication', label: 'Patient Communication' },
  { href: '/dental-practice/public-health', label: 'Public Health' },
  { href: '/dental-practice/wellness', label: 'Wellness' },
];
const dentalSpecialties = [
  { href: '/dental-specialties/endodontics', label: 'Endodontics' },
  { href: '/dental-specialties/oral-maxillofacial-surgery', label: 'Oral & Maxillofacial Surgery' },
  { href: '/dental-specialties/orofacial-pain', label: 'Orofacial Pain' },
  { href: '/dental-specialties/orthodontics', label: 'Orthodontics' },
  { href: '/dental-specialties/pediatrics', label: 'Pediatrics' },
  { href: '/dental-specialties/periodontics', label: 'Periodontics' },
  { href: '/dental-specialties/prosthodontics', label: 'Prosthodontics' },
  { href: '/dental-specialties/smile-design', label: 'Smile Design' },
];
const dentalHygiene = [
  { href: '/dental-hygiene/hygiene-tools', label: 'Hygiene Tools' },
  { href: '/dental-hygiene/infection-control', label: 'Infection Control' },
  { href: '/dental-hygiene/nutrition', label: 'Nutrition' },
  { href: '/dental-hygiene/oral-systemic-link', label: 'Oral Systemic Link' },
  { href: '/dental-hygiene/scope-of-practice', label: 'Scope of Practice' },
];
const digitalDentistry = [
  { href: '/digital-dentistry/ai', label: 'AI' },
  { href: '/digital-dentistry/imaging-cad-cam', label: 'Imaging & CAD/CAM' },
  { href: '/digital-dentistry/implants', label: 'Implants' },
  { href: '/digital-dentistry/invisible-aligners', label: 'Invisible Aligners' },
  { href: '/digital-dentistry/sleep-dentistry', label: 'Sleep Dentistry' },
];
const dentalBusiness = [
  { href: '/dental-business/dental-education', label: 'Dental Education' },
  { href: '/dental-business/dental-organizations', label: 'Dental Organizations' },
  { href: '/dental-business/dso', label: 'DSO' },
  { href: '/dental-business/industry-updates', label: 'Industry Updates' },
  { href: '/dental-business/practice-trends', label: 'Practice Trends' },
  { href: '/dental-business/regulatory-updates', label: 'Regulatory Updates' },
];

const topics = [
  { href: '/dental-practice', label: 'Dental Practice', children: dentalPractice },
  { href: '/dental-specialties', label: 'Dental Specialties', children: dentalSpecialties },
  { href: '/dental-hygiene', label: 'Dental Hygiene', children: dentalHygiene },
  { href: '/digital-dentistry', label: 'Digital Dentistry', children: digitalDentistry },
  { href: '/dental-business', label: 'Dental Business', children: dentalBusiness },
];

const resources = [
  { href: '/page/about-us', label: 'About Us' },
  { href: '/resources/conferences', label: 'Conferences' },
  { href: '/resources/videos', label: 'Videos' },
  { href: '/resources/webinars', label: 'Webinars' },
  { href: '/resources/media-press', label: 'Media & Press' },
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
        href: '/login',
        label: 'Sign In',
        when: 'logged-out',
        modifiers: ['user'],
      },
      {
        href: '/logout',
        label: 'Sign Out',
        when: 'logged-in',
        modifiers: ['user'],
      },
    ],
    tools: [
      {
        href: '/login',
        label: 'Sign In',
        when: 'logged-out',
        modifiers: ['user'],
      },
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
      when: ['/dental-practice'],
      secondary: {
        items: topics,
      },
      tertiary: { items: [] },
      primary: {
        items: dentalPractice,
      },
    },
    {
      when: ['/dental-specialties'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: {
        items: dentalSpecialties,
      },
    },
    {
      when: ['/dental-hygiene'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: {
        items: dentalHygiene,
      },
    },
    {
      when: ['/digital-dentistry'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: {
        items: digitalDentistry,
      },
    },
    {
      when: ['/dental-business'],
      secondary: { items: topics },
      tertiary: { items: [] },
      primary: {
        items: dentalBusiness,
      },
    },
  ],
  toggleMenu: {
    col1: {
      label: 'Dental Practice',
      items: dentalPractice,
    },
    col2: {
      label: 'Dental Specialties',
      items: dentalSpecialties,
    },
    col4: {
      label: 'Dental Hygiene',
      items: dentalHygiene,
    },
    col5: {
      label: 'Resources',
      items: resources,
    },
  },
  footer: {
    col1: {
      label: 'Topics',
      colspan: 5,
      items: [
        { href: '/dental-practice', label: 'Dental Practice' },
        { href: '/dental-specialties', label: 'Dental Specialties' },
        { href: '/dental-hygiene', label: 'Dental Hygiene' },
        { href: '/digital-dentistry', label: 'Digital Dentistry' },
        { href: '/dental-business', label: 'Dental Business' },
      ],
    },
    col2: {
      label: 'Resources',
      items: resources,
    },
    items: [
      privacyPolicy,
      { href: '/page/contact-us', label: 'Contact Us' },
      { href: '/site-map', label: 'Site Map' },
    ],
  },
};
