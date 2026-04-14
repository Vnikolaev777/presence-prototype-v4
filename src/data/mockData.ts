export type AiAction = {
  id: string;
  source: string;
  sourceType: 'newsletter' | 'sis' | 'district' | 'sports' | 'google-drive';
  isInternal: boolean;
  title: string;
  summary: string;
  confidence: number;
  proposedChanges: string[];
  requiresUserInput?: boolean;
  userPrompt?: string;
  status: 'pending' | 'approved' | 'rejected' | 'auto-applied';
  timestamp: string;
  previewType?: 'calendar' | 'news' | 'banner' | 'blog' | 'document' | 'quick_links' | 'science_fair_blog' | string;
};

// Actions split between internal/auto and external/manual
export const MOCK_AI_ACTIONS: AiAction[] = [
  {
    id: 'act_1',
    source: 'PowerSchool SIS Sync',
    sourceType: 'sis',
    isInternal: true,
    title: 'New Math Teacher Schedule',
    summary: 'SIS detected Mr. Davis was assigned to Advanced Calculus. The class schedule has been automatically updated on the portal.',
    confidence: 0.99,
    proposedChanges: [
      'Update the "Academic Calendar" and "Directory" pages.',
      'Send automatic email notification to enrolled students.'
    ],
    status: 'auto-applied',
    timestamp: 'Just now',
    previewType: 'calendar'
  },
  {
    id: 'act_2',
    source: 'Google Workspace (Shared Drive)',
    sourceType: 'google-drive',
    isInternal: true,
    title: 'Updated Parent Handbook 2026',
    summary: 'Detected a new version of the Parent Handbook PDF in the Principal\'s shared drive. Replaced the old link on the website.',
    confidence: 0.99,
    proposedChanges: [
      'Replace link on the "Resources" page.',
    ],
    status: 'auto-applied',
    timestamp: '10 mins ago',
    previewType: 'document'
  },
  {
    id: 'act_3',
    source: 'Ministry of Education Feed',
    sourceType: 'district',
    isInternal: false,
    title: 'Statewide Math Competition Announced',
    summary: 'The Ministry announced the dates for the Annual Math Olympiad. We recommend posting this on the school blog to encourage signups.',
    confidence: 0.95,
    proposedChanges: [
      'Draft a new Blog Post under "Academics".',
      'Add front-page banner for upcoming deadlines.'
    ],
    status: 'pending',
    timestamp: '2 hours ago',
    previewType: 'blog'
  },
  {
    id: 'act_4',
    source: 'Local Sports Weekly',
    sourceType: 'sports',
    isInternal: false,
    title: 'Varsity Soccer Championship Date',
    summary: 'The local sports news announced dates for the Varsity Soccer State Championship. Location is missing from the article.',
    confidence: 0.85,
    proposedChanges: [
      'Create a new prominent event card under the "Athletics" section.',
    ],
    requiresUserInput: true,
    userPrompt: 'Please confirm the exact location (home or away stadium) to complete the event posting.',
    status: 'pending',
    timestamp: '5 hours ago',
    previewType: 'banner'
  }
];

export const MOCK_STATS = {
  visitorsToday: 1240,
  eventsSynced: 12,
  activeAgents: 4,
  connectedSystems: [
    // We start empty in Phase 2 to allow the user to connect them in the demo
  ] as any[]
};

export const MOCK_AGENTS = [
  { id: 1, name: 'Web Crawler α', target: 'District Gov Sites', topics: ['Policy Changes', 'Grants'], status: 'Scanning pages...', iconType: 'radar' },
  { id: 2, name: 'Sports Scraper β', target: 'Local News Outlets', topics: ['Oakwood High Athletics'], status: 'Extracting events...', iconType: 'bot' }
];
