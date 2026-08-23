// The full site index, powering /links.
//
// Framework-free on purpose — plain objects, no React or Docusaurus imports — so the
// planned udzial.com landing page can consume this same catalogue without pulling in
// the site's build toolchain.
//
// Internal hrefs MUST end with a trailing slash (trailingSlash: true) and MUST match a
// real route: onBrokenLinks is 'throw', so a typo here fails the build.

import {
  UDEMY_API_TESTING_URL,
  UDEMY_PYTHON_AI_URL,
  UDEMY_PERSONAL_WEBSITE_URL,
  UDEMY_INSTRUCTOR_URL,
  TOPMATE_API_TESTING_URL,
  TOPMATE_PYTHON_AI_URL,
  TOPMATE_PERSONAL_WEBSITE_URL,
  TOPMATE_RESUME_BUILDER_URL,
  TOPMATE_PROFILE_URL,
} from './links';

export type SiteLink = {
  title: string;
  desc: string;
  href: string;
  external?: boolean;
  /** Extra filter keywords — matched but not rendered. */
  tags?: string[];
};

export type LinkGroup = {
  /** Anchor slug used by the jump bar. */
  id: string;
  title: string;
  icon: string;
  blurb?: string;
  links: SiteLink[];
};

export const linkGroups: LinkGroup[] = [
  {
    id: 'start',
    title: 'Start Here',
    icon: '🧭',
    blurb: 'New around here? These five cover most of what people come looking for.',
    links: [
      {
        title: 'Welcome to Sharing is Caring',
        desc: 'What this site is and how to get the most out of it',
        href: '/docs/intro/',
        tags: ['intro', 'getting started', 'about'],
      },
      {
        title: 'Homepage',
        desc: 'Featured courses, topic grid and popular resources',
        href: '/',
        tags: ['home'],
      },
      {
        title: 'Blog',
        desc: 'Articles on testing, automation, AI and career growth',
        href: '/blog/',
        tags: ['articles', 'posts', 'writing'],
      },
      {
        title: 'Courses',
        desc: 'Free and premium courses on Python + AI, API testing and more',
        href: '/courses/',
        tags: ['learn', 'training', 'udemy', 'topmate'],
      },
      {
        title: 'Practice Sites',
        desc: 'Free hands-on playgrounds for UI, API, bug hunting and security',
        href: '/practice/',
        tags: ['hands-on', 'labs', 'exercises'],
      },
    ],
  },

  {
    id: 'ai',
    title: 'AI',
    icon: '🤖',
    blurb: 'Using AI in testing and automation — roadmaps, tools, prompts and honest limitations.',
    links: [
      {
        title: 'All AI Content',
        desc: 'Browse every AI article in one place',
        href: '/docs/category/ai/',
        tags: ['hub', 'index', 'category'],
      },
      {
        title: 'AI Roadmap for SDETs',
        desc: 'A step-by-step path for testers picking up AI skills',
        href: '/docs/AI/sdet-ai-roadmap/',
        tags: ['roadmap', 'learning path', 'sdet'],
      },
      {
        title: 'Prompt Library',
        desc: 'Ready-to-use AI prompts for testing, automation and QA work',
        href: '/docs/AI/prompt-library/',
        tags: ['prompts', 'chatgpt', 'copilot'],
      },
      {
        title: 'GitHub Copilot',
        desc: 'Tutorial series on the AI pair programmer, including GH-300 prep',
        href: '/docs/AI/github-copilot/',
        tags: ['copilot', 'gh-300', 'certification'],
      },
      {
        title: 'Agentic AI',
        desc: 'Autonomous AI agents and what they mean for testing',
        href: '/docs/AI/agentic-ai/',
        tags: ['agents', 'autonomous', 'mcp'],
      },
      {
        title: 'AI Browser Automation',
        desc: 'Driving browsers with AI-powered tools',
        href: '/docs/AI/ai-browser-automation/',
        tags: ['browser', 'playwright', 'agents'],
      },
      {
        title: 'Bug Analysis with AI',
        desc: 'Using AI to triage, reproduce and explain defects',
        href: '/docs/AI/bug-analysis/',
        tags: ['bugs', 'defects', 'triage'],
      },
      {
        title: 'AI Coding Failures & Pitfalls',
        desc: 'Where AI-generated code goes wrong, with real examples',
        href: '/docs/AI/ai-coding-failures/',
        tags: ['limitations', 'pitfalls', 'hallucination'],
      },
      {
        title: 'Azure AI-900: AI Fundamentals',
        desc: 'Certification prep for the Azure AI Fundamentals exam',
        href: '/docs/AI/azure-ai-900/',
        tags: ['azure', 'certification', 'exam'],
      },
      {
        title: 'AI Q&A Sessions',
        desc: 'Questions from the community, answered',
        href: '/docs/AI/qa-sessions/',
        tags: ['questions', 'answers', 'community'],
      },
      // No /blog/tags/ai/ entry yet — Docusaurus only generates a tag route once a post
      // actually uses the tag, and the build throws on links to routes that don't exist.
    ],
  },

  {
    id: 'automation',
    title: 'Automation',
    icon: '⚙️',
    blurb: 'Frameworks, tools and the fundamentals that survive a tool change.',
    links: [
      {
        title: 'All Automation Content',
        desc: 'Browse every automation article in one place',
        href: '/docs/category/automation/',
        tags: ['hub', 'index', 'category'],
      },
      {
        title: 'Learn Test Automation — Complete Guide',
        desc: 'The full automation learning path, start to finish',
        href: '/docs/Automation/',
        tags: ['guide', 'learning path', 'complete'],
      },
      {
        title: 'Automation Basics Series',
        desc: 'Java, Selenium, TestNG, Git and pipelines from scratch',
        href: '/docs/Automation/automation-basics-series/',
        tags: ['java', 'testng', 'series', 'beginner'],
      },
      {
        title: 'Automation Fundamentals',
        desc: 'What every tester should know before writing a single test',
        href: '/docs/Automation/automation-fundamentals/',
        tags: ['basics', 'fundamentals'],
      },
      {
        title: 'Automation Basics',
        desc: 'Core concepts explained simply',
        href: '/docs/Automation/AutomationBasics/',
        tags: ['basics', 'beginner'],
      },
      {
        title: 'Test Automation Framework — Must Have',
        desc: 'The technical pieces every framework needs',
        href: '/docs/Automation/automation-must-know-technical/',
        tags: ['framework', 'architecture', 'design'],
      },
      {
        title: 'Playwright',
        desc: 'Guides and tips for Microsoft Playwright',
        href: '/docs/Automation/playwright/',
        tags: ['playwright', 'e2e', 'browser'],
      },
      {
        title: 'Selenium WebDriver',
        desc: 'Practical Selenium guidance from real projects',
        href: '/docs/Automation/selenium/',
        tags: ['selenium', 'webdriver'],
      },
      {
        title: 'Automation Q&A',
        desc: 'Common automation questions, answered directly',
        href: '/docs/Automation/automation-qna/',
        tags: ['questions', 'interview', 'answers'],
      },
      {
        title: 'Browser Extensions',
        desc: 'Extensions that make automation and testing work faster',
        href: '/docs/Automation/browser-extensions/',
        tags: ['chrome', 'extensions', 'productivity'],
      },
      {
        title: 'GitHub Repositories',
        desc: 'Open-source repos worth studying and borrowing from',
        href: '/docs/Automation/github-repos/',
        tags: ['github', 'open source', 'examples'],
      },
    ],
  },

  {
    id: 'testing',
    title: 'Testing',
    icon: '🧪',
    blurb: 'Mindset, principles and the craft of finding what matters.',
    links: [
      {
        title: 'All Testing Content',
        desc: 'Browse every testing article in one place',
        href: '/docs/category/testing/',
        tags: ['hub', 'index', 'category'],
      },
      {
        title: '410+ Testing Tips Collection',
        desc: 'The big list — practical tips accumulated over years',
        href: '/docs/Testing/testing-tips-collection/',
        tags: ['tips', 'collection', 'checklist'],
      },
      {
        title: 'Testing Philosophy and Tester Mindset',
        desc: 'How good testers think about the product',
        href: '/docs/Testing/testing-philosophy-mindset/',
        tags: ['mindset', 'philosophy'],
      },
      {
        title: 'Testing Principles — User Expectations',
        desc: 'Principles that hold regardless of tooling',
        href: '/docs/Testing/testing-principles/',
        tags: ['principles', 'fundamentals'],
      },
      {
        title: 'Essential Skills for Software Testers',
        desc: 'The skills that actually move your career',
        href: '/docs/Testing/tester-skills/',
        tags: ['skills', 'career'],
      },
      {
        title: 'How to Test Better',
        desc: 'Advice for raising the quality of your testing',
        href: '/docs/Testing/tester-advice/',
        tags: ['advice', 'improve'],
      },
      {
        title: 'Advanced Level Tips for Testers',
        desc: 'For testers past the basics',
        href: '/docs/Testing/advanced-testing-tips/',
        tags: ['advanced', 'tips'],
      },
      {
        title: 'Bug Reporting Best Practices',
        desc: 'Write defects developers actually act on',
        href: '/docs/Testing/Bugs/',
        tags: ['bugs', 'defects', 'reporting'],
      },
      {
        title: 'Assumptions in Software Testing',
        desc: 'The unspoken assumptions that let bugs through',
        href: '/docs/Testing/Assumptions/',
        tags: ['assumptions', 'risk'],
      },
      {
        title: 'Common Misconceptions in Software Testing',
        desc: 'Myths worth unlearning',
        href: '/docs/Testing/misconceptions-in-testing/',
        tags: ['myths', 'misconceptions'],
      },
      {
        title: 'Test Data Management',
        desc: 'Getting the right data into your tests',
        href: '/docs/Testing/test-data/',
        tags: ['test data', 'data'],
      },
      {
        title: 'User Journey and Product Knowledge',
        desc: 'Why knowing the product beats knowing the tool',
        href: '/docs/Testing/user-journey-product-knowledge/',
        tags: ['user journey', 'domain knowledge'],
      },
      {
        title: 'Testing Communities',
        desc: 'Where to learn from and with other testers',
        href: '/docs/Testing/testing-communities/',
        tags: ['community', 'networking'],
      },
    ],
  },

  {
    id: 'api',
    title: 'API Testing',
    icon: '🔌',
    links: [
      {
        title: 'All API Testing Content',
        desc: 'Browse every API testing article in one place',
        href: '/docs/category/api-testing/',
        tags: ['hub', 'index', 'category'],
      },
      {
        title: 'Learn API Testing',
        desc: 'API testing concepts from the ground up',
        href: '/docs/API/learn-api-testing/',
        tags: ['rest', 'basics', 'learn'],
      },
      {
        title: 'HTTP Status Codes Cheat Sheet',
        desc: 'Quick reference for every status code you will meet',
        href: '/docs/API/HTTP-Status-Codes/',
        tags: ['http', 'cheat sheet', 'reference', 'status codes'],
      },
      {
        title: 'Postman Assertions Guide',
        desc: 'Writing assertions that catch real API problems',
        href: '/docs/API/postman-assertions/',
        tags: ['postman', 'assertions', 'scripts'],
      },
    ],
  },

  {
    id: 'devops-git',
    title: 'DevOps & Git',
    icon: '🔀',
    links: [
      {
        title: 'Azure DevOps Complete Video Series',
        desc: 'Pipelines, boards and releases end to end',
        href: '/docs/AzureDevOps/azure-devops-complete-series/',
        tags: ['azure', 'ci/cd', 'pipelines', 'video'],
      },
      {
        title: 'Git Commands',
        desc: 'The commands you actually use, with context',
        href: '/docs/Git/git-commands/',
        tags: ['git', 'commands', 'reference'],
      },
      {
        title: 'GitHub New Features',
        desc: 'What GitHub shipped recently and why it matters',
        href: '/docs/Git/github-new-features/',
        tags: ['github', 'features'],
      },
      {
        title: 'GitHub Profile Tips',
        desc: 'Make your profile work as a portfolio',
        href: '/docs/Git/github-profile-tips/',
        tags: ['github', 'profile', 'portfolio', 'branding'],
      },
    ],
  },

  {
    id: 'tools',
    title: 'Tools & Productivity',
    icon: '🛠️',
    blurb: 'Software and shortcuts that save real time, all personally used.',
    links: [
      {
        title: 'All Tools Content',
        desc: 'Browse every tools article in one place',
        href: '/docs/category/tools/',
        tags: ['hub', 'index', 'category'],
      },
      {
        title: 'Testers Toolkit',
        desc: 'The core set of tools worth having installed',
        href: '/docs/Tools/testers-toolkit/',
        tags: ['toolkit', 'essentials'],
      },
      {
        title: 'Browser Console Snippets',
        desc: 'Copy-paste JavaScript for testing and automation',
        href: '/docs/Tools/browser-console-snippets/',
        tags: ['javascript', 'console', 'snippets', 'devtools'],
      },
      {
        title: 'Browser Hacks',
        desc: 'Lesser-known browser tricks for testers',
        href: '/docs/Tools/browser-hacks/',
        tags: ['browser', 'devtools', 'tricks'],
      },
      {
        title: 'Best Screenshot and Screen Recording Tools',
        desc: 'What to use for bug evidence and demos',
        href: '/docs/Tools/best-screenshot-tools/',
        tags: ['screenshot', 'recording', 'capture'],
      },
      {
        title: 'Windows Best Software',
        desc: 'The Windows apps worth installing first',
        href: '/docs/Tools/windows-best-software/',
        tags: ['windows', 'software', 'apps'],
      },
      {
        title: 'Useful Mobile Apps for Productivity',
        desc: 'Phone apps that earn their place',
        href: '/docs/Tools/mobile-apps/',
        tags: ['mobile', 'android', 'ios', 'apps'],
      },
      {
        title: 'Best Todo App for Windows, Android and iPhone',
        desc: 'Task managers compared across platforms',
        href: '/docs/Tools/best-todo-app-windows-android/',
        tags: ['todo', 'tasks', 'productivity'],
      },
      {
        title: 'AutoHotkey Windows Shortcuts',
        desc: 'Automate repetitive Windows actions',
        href: '/docs/Tools/autohotkey-shortcuts/',
        tags: ['autohotkey', 'shortcuts', 'windows', 'macros'],
      },
      {
        title: 'Supercharge Your Mouse with Logi Options+',
        desc: 'Turn a Logitech mouse into a productivity device',
        href: '/docs/Tools/logi-options-plus-productivity/',
        tags: ['logitech', 'mouse', 'hardware'],
      },
      {
        title: 'Migrate Laptop in Minutes',
        desc: 'Set up a new machine without losing a day',
        href: '/docs/Tools/migrate-laptop-in-minutes/',
        tags: ['setup', 'migration', 'new laptop'],
      },
      {
        title: 'Pro Testing Tips and PowerPoint Trick',
        desc: 'Presentation tricks for testers who have to demo',
        href: '/docs/Tools/pro-testing-tips-powerpoint/',
        tags: ['powerpoint', 'presentation', 'demo'],
      },
      {
        title: 'Stay Updated with Testing and Automation',
        desc: 'Sources worth following to keep current',
        href: '/docs/Tools/stay-updated-testing-automation/',
        tags: ['news', 'newsletters', 'learning'],
      },
    ],
  },

  {
    id: 'career',
    title: 'Career & Industry',
    icon: '📈',
    blurb: 'Job titles, referrals, layoffs and the parts of the industry nobody documents.',
    links: [
      {
        title: 'All Industry Insights',
        desc: 'Browse every industry article in one place',
        href: '/docs/category/industry-insights/',
        tags: ['hub', 'index', 'category'],
      },
      {
        title: 'Career Tips for Testing & Automation Professionals',
        desc: 'Practical moves that compound over a career',
        href: '/docs/IndustryInsights/career-tips/',
        tags: ['career', 'growth', 'tips'],
      },
      {
        title: 'Tips for Getting Referrals',
        desc: 'How to ask, and who to ask',
        href: '/docs/IndustryInsights/referral-tips/',
        tags: ['referral', 'job search', 'networking'],
      },
      {
        title: 'Job Titles in Testing',
        desc: 'QA, SDET, Test Engineer — what the titles actually mean',
        href: '/docs/IndustryInsights/job-titles/',
        tags: ['sdet', 'qa', 'titles', 'roles'],
      },
      {
        title: 'Contract-to-Hire Jobs — Should You Take One?',
        desc: 'The trade-offs nobody spells out',
        href: '/docs/IndustryInsights/contract-to-hire/',
        tags: ['contract', 'c2h', 'jobs'],
      },
      {
        title: '13 Reasons for Layoffs in Companies',
        desc: 'Why layoffs happen, beyond the press release',
        href: '/docs/IndustryInsights/layoffs-reasons/',
        tags: ['layoffs', 'industry', 'jobs'],
      },
      {
        title: 'Performance Testing & JMeter Skills',
        desc: 'Building a career around performance work',
        href: '/docs/IndustryInsights/performance-testing-career/',
        tags: ['jmeter', 'performance', 'load testing'],
      },
    ],
  },

  {
    id: 'self-mastery',
    title: 'Self Mastery',
    icon: '🎯',
    blurb: 'The non-technical skills that decide how far the technical ones take you.',
    links: [
      {
        title: 'All Self Mastery Content',
        desc: 'Browse every self-mastery article in one place',
        href: '/docs/category/self-mastery/',
        tags: ['hub', 'index', 'category'],
      },
      {
        title: 'Career Development for Software Testers',
        desc: 'Planning the next few years deliberately',
        href: '/docs/self-mastery/career-development/',
        tags: ['career', 'development', 'planning'],
      },
      {
        title: 'Learning Strategies for Software Testers',
        desc: 'How to learn fast and make it stick',
        href: '/docs/self-mastery/learning-strategies/',
        tags: ['learning', 'study', 'skills'],
      },
      {
        title: 'Focus and Productivity for Software Testers',
        desc: 'Protecting attention in an interrupt-driven job',
        href: '/docs/self-mastery/focus-productivity/',
        tags: ['focus', 'productivity', 'deep work'],
      },
      {
        title: 'Time Management for Software Testers',
        desc: 'Getting the important work done first',
        href: '/docs/self-mastery/time-management/',
        tags: ['time management', 'planning'],
      },
      {
        title: 'Effective Communication: Beyond Hello',
        desc: 'Communicating so people act on what you say',
        href: '/docs/self-mastery/effective-communication/',
        tags: ['communication', 'soft skills'],
      },
      {
        title: 'Building Your Professional Brand',
        desc: 'Becoming known for something specific',
        href: '/docs/self-mastery/brand-building/',
        tags: ['branding', 'linkedin', 'visibility'],
      },
    ],
  },

  {
    id: 'courses',
    title: 'Courses & Learning',
    icon: '🎓',
    blurb: 'Free video courses here, plus paid courses on Udemy and Topmate.',
    links: [
      {
        title: 'All Courses',
        desc: 'Every course in one comparison view',
        href: '/courses/',
        tags: ['courses', 'compare'],
      },
      {
        title: 'Free Courses',
        desc: 'Free video series on automation, Azure DevOps, Copilot and more',
        href: '/docs/FreeCourses/',
        tags: ['free', 'video', 'youtube'],
      },
      {
        title: 'Python + AI for Beginners (Topmate)',
        desc: 'Build a local AI assistant with LM Studio — 11 videos plus a capstone',
        href: TOPMATE_PYTHON_AI_URL,
        external: true,
        tags: ['python', 'ai', 'topmate', 'course', 'lm studio'],
      },
      {
        title: 'Python + AI for Beginners (Udemy)',
        desc: 'The same course on Udemy, if you prefer buying there',
        href: UDEMY_PYTHON_AI_URL,
        external: true,
        tags: ['python', 'ai', 'udemy', 'course'],
      },
      {
        title: 'API Testing Course (Udemy)',
        desc: '34 lectures with 30+ interview questions and lifetime access',
        href: UDEMY_API_TESTING_URL,
        external: true,
        tags: ['api', 'udemy', 'interview', 'course'],
      },
      {
        title: 'API Testing Course (Topmate)',
        desc: 'The same API testing course on Topmate',
        href: TOPMATE_API_TESTING_URL,
        external: true,
        tags: ['api', 'topmate', 'course'],
      },
      {
        title: 'Build Your Personal Website (Topmate)',
        desc: 'Launch yourname.com — free hosting, custom domain, real portfolio',
        href: TOPMATE_PERSONAL_WEBSITE_URL,
        external: true,
        tags: ['website', 'portfolio', 'domain', 'topmate', 'course'],
      },
      {
        title: 'Build Your Personal Website (Udemy)',
        desc: 'The same website course on Udemy',
        href: UDEMY_PERSONAL_WEBSITE_URL,
        external: true,
        tags: ['website', 'portfolio', 'udemy', 'course'],
      },
      {
        title: 'Resume Builder (Topmate)',
        desc: 'Templates and guidance for a testing resume that gets replies',
        href: TOPMATE_RESUME_BUILDER_URL,
        external: true,
        tags: ['resume', 'cv', 'topmate'],
      },
      {
        title: 'All Courses on Udemy',
        desc: 'My full Udemy instructor profile',
        href: UDEMY_INSTRUCTOR_URL,
        external: true,
        tags: ['udemy', 'instructor', 'profile'],
      },
    ],
  },

  {
    id: 'practice',
    title: 'Practice Sites',
    icon: '🏋️',
    blurb: 'Free, open-source playgrounds. No sign-up, no paywall.',
    links: [
      {
        title: 'All Practice Sites',
        desc: 'Overview of every practice platform',
        href: '/practice/',
        tags: ['hub', 'index'],
      },
      {
        title: 'UI Automation Practice Site',
        desc: 'Forms, tables and widgets to automate against',
        href: 'https://gauravkhurana.com/test-automation-play',
        external: true,
        tags: ['ui', 'selenium', 'playwright', 'cypress', 'practice'],
      },
      {
        title: 'Bug Hunt Challenge',
        desc: 'A deliberately broken app — find the planted defects',
        href: 'https://gauravkhurana.com/bug-hunt-challenge/',
        external: true,
        tags: ['bugs', 'exploratory', 'challenge', 'practice'],
      },
      {
        title: 'API Testing / Automation Practice',
        desc: 'Live endpoints to test with Postman or code',
        href: 'https://gauravkhurana.com/practise-api',
        external: true,
        tags: ['api', 'postman', 'rest', 'practice'],
      },
      {
        title: 'SQL Injection Practice',
        desc: 'Safe environment for learning injection testing',
        href: 'https://gauravkhurana.com/SQLInjection/',
        external: true,
        tags: ['security', 'sql injection', 'practice'],
      },
      {
        title: 'New Laptop Setup (GitHub)',
        desc: 'Scripts to set up a fresh dev machine quickly',
        href: 'https://github.com/gauravkhuraana/new-laptop-setup',
        external: true,
        tags: ['github', 'setup', 'scripts', 'repo'],
      },
    ],
  },

  {
    id: 'mentorship',
    title: 'Mentorship & Picks',
    icon: '🤝',
    links: [
      {
        title: 'Testimonials',
        desc: 'What testers and SDETs said after a session',
        href: '/docs/Mentorship/testimonials/',
        tags: ['testimonials', 'reviews', 'mentorship'],
      },
      {
        title: 'Resume Templates & Guidance',
        desc: 'Testing resume templates plus what reviewers look for',
        href: '/docs/Mentorship/resume/',
        tags: ['resume', 'cv', 'templates'],
      },
      {
        title: 'Book a 1:1 Session (Topmate)',
        desc: 'Career advice, resume review or a technical deep-dive',
        href: TOPMATE_PROFILE_URL,
        external: true,
        tags: ['mentorship', 'topmate', 'coaching', '1:1', 'guidance'],
      },
      {
        title: 'Product Recommendations',
        desc: 'Books and products I have personally used',
        href: '/docs/Recommendations/',
        tags: ['recommendations', 'books', 'products', 'gear'],
      },
    ],
  },

  {
    id: 'connect',
    title: 'Connect & Follow',
    icon: '🔗',
    blurb: 'Every profile in one place — pick whichever platform you already live on.',
    links: [
      {
        title: 'LinkedIn',
        desc: 'Daily posts on testing, automation and career growth',
        href: 'https://www.linkedin.com/in/gauravkhuraana/',
        external: true,
        tags: ['social', 'linkedin', 'network'],
      },
      {
        title: 'YouTube (@Udzial)',
        desc: 'Free video courses and tutorials',
        href: 'https://www.youtube.com/@Udzial?sub_confirmation=1',
        external: true,
        tags: ['social', 'youtube', 'video', 'udzial'],
      },
      {
        title: 'GitHub',
        desc: 'Open-source repos, practice apps and code samples',
        href: 'https://github.com/gauravkhuraana',
        external: true,
        tags: ['social', 'github', 'code', 'repos'],
      },
      {
        title: 'Medium',
        desc: 'Long-form articles',
        href: 'https://medium.com/@gauravkhuraana',
        external: true,
        tags: ['social', 'medium', 'articles', 'blog'],
      },
      {
        title: 'X (Twitter)',
        desc: 'Short takes and quick tips',
        href: 'https://x.com/gauravkhuraana',
        external: true,
        tags: ['social', 'twitter', 'x'],
      },
      {
        title: 'WhatsApp Channel',
        desc: 'Quick tips and fresh updates straight to your phone',
        href: 'https://whatsapp.com/channel/0029Vb6pKpPElagzl4OTqG2s',
        external: true,
        tags: ['social', 'whatsapp', 'channel', 'updates'],
      },
      {
        title: 'Topmate',
        desc: 'Book a session or grab a digital product',
        href: TOPMATE_PROFILE_URL,
        external: true,
        tags: ['social', 'topmate', 'mentorship'],
      },
      {
        title: 'Newsletter',
        desc: 'Testing, automation and AI in your inbox',
        href: 'https://newsletter.gauravkhurana.com',
        external: true,
        tags: ['newsletter', 'email', 'subscribe'],
      },
      {
        title: 'Buy Me a Coffee (Ko-fi)',
        desc: 'Support the free content',
        href: 'https://ko-fi.com/gauravkhurana',
        external: true,
        tags: ['kofi', 'support', 'donate', 'coffee'],
      },
      {
        title: 'Contact & Feedback',
        desc: 'Send a message, request a topic or report a problem',
        href: '/connect/',
        tags: ['contact', 'feedback', 'message', 'email'],
      },
    ],
  },

  {
    id: 'site',
    title: 'Site & Meta',
    icon: '📄',
    links: [
      {
        title: 'RSS & Feeds',
        desc: 'Subscribe to the blog in your reader of choice',
        href: '/feeds/',
        tags: ['rss', 'atom', 'feed', 'subscribe'],
      },
      {
        title: 'Newsletter Signup',
        desc: 'On-site signup for the email list',
        href: '/newsletter/',
        tags: ['newsletter', 'email', 'subscribe'],
      },
      {
        title: 'Blog Archive',
        desc: 'Every post, listed by date',
        href: '/blog/archive/',
        tags: ['archive', 'blog', 'all posts'],
      },
      {
        title: 'Support My Work',
        desc: 'Ways to support the free courses and articles',
        href: '/support/',
        tags: ['support', 'kofi', 'donate'],
      },
      {
        title: 'Testing Memes',
        desc: 'The lighter side of QA',
        href: '/memes/',
        tags: ['memes', 'fun', 'humour', 'humor'],
      },
      {
        title: 'Privacy Policy',
        desc: 'What data this site collects and why',
        href: '/privacy/',
        tags: ['legal', 'privacy', 'gdpr'],
      },
      {
        title: 'Cookie Policy',
        desc: 'Cookies used and how to control them',
        href: '/cookies/',
        tags: ['legal', 'cookies'],
      },
      {
        title: 'Terms of Use',
        desc: 'Terms covering use of this site',
        href: '/terms/',
        tags: ['legal', 'terms'],
      },
      {
        title: 'Affiliate Disclosure',
        desc: 'Where affiliate links appear and how they work',
        href: '/affiliate-disclosure/',
        tags: ['legal', 'affiliate', 'disclosure'],
      },
    ],
  },
];

/** Total link count — used for the results counter and the page intro. */
export const totalLinkCount = linkGroups.reduce(
  (sum, group) => sum + group.links.length,
  0,
);
