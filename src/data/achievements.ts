// Everything shown on /about/. Adding a talk, win or video means adding one object here;
// the stats row on the page counts these arrays, so it never drifts.
//
// Every entry is backed by a certificate, the LinkedIn profile, the event's own page or
// Gaurav's confirmation. Co-winners are not named: team results show the team name only.

export const YOUTUBE_PLAYLIST_URL =
  'https://www.youtube.com/playlist?list=PLUlzmYT8n_5uW9rA866zOjYi8Ibn2AQHc';

export type Talk = {
  event: string;
  title: string;
  /** Shown as written, e.g. "4 Nov 2026". Omitted when the event never published one. */
  date?: string;
  format: 'Talk' | 'Tutorial' | 'Training session';
  location?: string;
  href: string;
  /** Path under /static, e.g. /img/achievements/x.webp */
  image?: string;
  /** YouTube ID when a recording exists; the card thumbnail falls back to it. */
  videoId?: string;
};

export type Win = {
  event: string;
  organiser: string;
  /** Omitted when the certificate gives none. */
  date?: string;
  placement: string;
  /** e.g. 'Team "Thinkers"' or 'Mobile Automation Challenge'. */
  detail?: string;
  team?: boolean;
  image: string;
};

export type Recognition = {
  title: string;
  from: string;
  desc: string;
  image?: string;
};

export type Appearance = {
  title: string;
  channel: string;
  videoId: string;
};

export type Certification = {
  title: string;
  issuer: string;
};

// Newest first.
export const talks: Talk[] = [
  {
    event: 'AutomationSTAR 2026',
    title: 'Poison Kills Poison: AI Tests AI',
    date: '4 Nov 2026',
    format: 'Tutorial',
    location: 'Antwerp, Belgium',
    href: 'https://automation.eurostarsoftwaretesting.com/event/2026/poison-kills-poison-ai-tests-ai/',
  },
  {
    event: 'TestMu Conf 2026',
    title: "You Can't assertEquals an Agent: A Tester's Guide to Agentic Quality",
    date: '20 Aug 2026',
    format: 'Talk',
    location: 'Online',
    href: 'https://www.testmuai.com/testmuconf-2026/testers-guide-to-agentic-quality/',
    image: '/img/achievements/testmu-conf-2026.webp',
  },
  {
    event: 'BrowserStack Breakpoint 2026',
    title: 'Prompt Injection is the new SQL injection',
    date: 'May 2026',
    format: 'Talk',
    location: 'Online',
    href: 'https://www.browserstack.com/events/breakpoint-2026',
  },
  {
    event: 'Automation Guild 2026',
    title: 'A Playwright Visual Regression Runner: 39 lines of TypeScript',
    date: '13 Feb 2026',
    format: 'Training session',
    href: 'https://testguild.com/automation-guild-2026/',
  },
  {
    event: 'ATA AI Test Fest',
    title: 'From Flaky to Bulletproof: Teaching AI to Smell Bad Test Patterns',
    format: 'Talk',
    href: 'https://aitestfest.com/speakers/',
  },
  {
    event: 'TestFlix 2024',
    title: 'Navigating the Future: Principles of Responsible AI',
    date: '2024',
    format: 'Talk',
    href: 'https://www.youtube.com/watch?v=suYhl_8N_8Y',
    videoId: 'suYhl_8N_8Y',
  },
  {
    event: 'CP-SAT Selenium Summit 2021',
    title: 'Super Cool Daily Chores with Selenium',
    date: '6 Feb 2021',
    format: 'Talk',
    location: 'Online',
    href: 'https://www.youtube.com/watch?v=qh4iPNKgRCg',
    image: '/img/achievements/selenium-summit-2021.webp',
    videoId: 'qh4iPNKgRCg',
  },
];

// Newest first; undated entries sit where Gaurav placed them.
export const wins: Win[] = [
  {
    event: 'ATA AI Test Hackathon',
    organiser: 'Agile Testing Alliance',
    date: 'Jul 2026',
    placement: '1st place',
    team: true,
    image: '/img/achievements/ata-ai-test-hackathon-2026.webp',
  },
  {
    event: 'So You Think You Can Hack? AI Hackathon',
    organiser: 'The Test Chat',
    date: '18–19 Jul 2026',
    placement: 'Winner',
    detail: 'Joint top spot',
    image: '/img/achievements/so-you-think-you-can-hack-2026.webp',
  },
  {
    event: 'BrowserStack Testathon, Noida',
    organiser: 'BrowserStack',
    date: '26 Jul 2025',
    placement: '1st place',
    detail: 'Team "Thinkers"',
    team: true,
    image: '/img/achievements/browserstack-testathon-2025.webp',
  },
  {
    event: 'UiPath AI-Driven No-Code Automation Hackathon',
    organiser: 'UiPath and The Test Tribe',
    date: '26–27 Apr 2025',
    placement: 'Winner',
    detail: 'Mobile Automation Challenge, team "The Autopilot Gang"',
    team: true,
    image: '/img/achievements/uipath-mobile-automation-2025.webp',
  },
  {
    event: 'Test Innovation Challenge 2022',
    organiser: 'askui',
    date: '2022',
    placement: '2nd place',
    image: '/img/achievements/askui-test-innovation-2022.webp',
  },
  {
    event: 'ACCELQ Automation Hackathon 2.0',
    organiser: 'ACCELQ and The Test Tribe',
    date: '13–14 Nov 2021',
    placement: '1st place',
    image: '/img/achievements/accelq-hackathon-2-2021.webp',
  },
  {
    event: 'So You Think You Can Test?',
    organiser: 'The Test Chat, with TestProject and Bugasura',
    date: '17 Oct 2021',
    placement: '1st runner-up',
    image: '/img/achievements/so-you-think-you-can-test-2021.webp',
  },
  {
    event: 'ACCELQ Automation Hackathon',
    organiser: 'ACCELQ and The Test Tribe',
    date: '1–2 May 2021',
    placement: '3rd place',
    detail: 'Team "TTT Believers"',
    team: true,
    image: '/img/achievements/accelq-hackathon-2021.webp',
  },
  {
    event: 'Moolympics #2: Experimenting with selectors && beliefs',
    organiser: 'Moolya',
    date: 'Feb 2021',
    placement: '2nd place',
    image: '/img/achievements/moolympics-2-2021.webp',
  },
  {
    event: 'Cignithon testing hackathon',
    organiser: 'Cigniti and The Test Tribe',
    placement: '1st prize',
    detail: 'Team "Believers", project Cometa.Rocks',
    team: true,
    image: '/img/achievements/cignithon-cometa.webp',
  },
];

export const recognition: Recognition[] = [
  {
    title: 'Tester of the Year 2022',
    from: 'The Test Chat',
    desc: 'Named Tester of the Year 2022 by The Test Chat testing community.',
  },
  {
    title: 'AI Odyssey: top 11',
    from: 'Microsoft',
    desc: 'One of the top 5 completions from GDC and part of the top 11 who completed the AI Odyssey challenge.',
  },
  {
    title: 'Skills Champion',
    from: 'Microsoft MCAPS Q4 Skills Challenge',
    desc: 'Earned the Skills Champion badge in the MCAPS Q4 Skills Challenge.',
    image: '/img/achievements/skills-champion.webp',
  },
  {
    title: 'Podcast guest trophy',
    from: 'Salesforce Testing Guy podcast',
    desc: 'A thank-you trophy for sharing testing insights and experiences on the podcast.',
    image: '/img/achievements/salesforce-testing-guy.webp',
  },
  {
    title: 'Workplace honours',
    from: 'Employer awards',
    desc: 'SEE (Spotlight Employee Excellence), ABCD and Techie of the Week.',
  },
  {
    title: '99tests beta tester',
    from: '99tests.com',
    desc: '101 bugs logged, level 9 tester, and 3 contests won for finding and validating the most bugs.',
  },
];

export const appearances: Appearance[] = [
  {
    title: 'Testing Roundtable',
    channel: 'Iti Shruti',
    videoId: 'eNgLr-ge4Ow',
  },
  {
    title: 'How to get your dream testing job (Roundtable part 2)',
    channel: 'Iti Shruti',
    videoId: 'QVWVQjISTn0',
  },
  {
    title: 'Four for Fore, chapter 3',
    channel: 'The Test Chat',
    videoId: 'MG3BN9JgWkg',
  },
  {
    title: 'TTC Turns 3',
    channel: 'The Test Chat',
    videoId: 'kiJUM2cfHGQ',
  },
  {
    title: 'Unlock the secrets to community involvement',
    channel: 'Salesforce Testing Guy',
    videoId: 'pO0FuOxX29w',
  },
  {
    title: 'Importance of testing ethics, part 1',
    channel: 'Salesforce Testing Guy',
    videoId: 'yWe7qcKdqeI',
  },
  {
    title: 'Importance of testing ethics, part 2',
    channel: 'Salesforce Testing Guy',
    videoId: 'VlFdPIxcPB4',
  },
  {
    title: 'SelectorsHub user story #5',
    channel: 'SelectorsHub',
    videoId: 'invpTNsKZ3A',
  },
];

export const certifications: Certification[] = [
  {title: 'ISTQB Certified Tester', issuer: 'ISTQB'},
  {title: 'Azure AI Fundamentals (AI-900)', issuer: 'Microsoft'},
  {title: 'Azure Developer Associate', issuer: 'Microsoft'},
  {title: 'Microsoft Global Hackathon 2023', issuer: 'Microsoft'},
];
