export type Role = 'user' | 'agent';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
}

export interface Connector {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'requires_auth';
  icon: string;
}

export interface AgentSkill {
  id: string;
  title: string;
  description: string;
  icon: string;
  connectors: Connector[];
  settings: Record<string, any>;
  messages: ChatMessage[];
}

export const MOCK_AGENT_SKILLS: AgentSkill[] = [
  {
    id: 'skill-1',
    title: 'Internet Monitoring',
    description: 'Monitor the web for mentions of your school and specific topics.',
    icon: 'Globe',
    connectors: [
      { id: 'conn-gweb', name: 'Google Web Search', status: 'connected', icon: 'Search' }
    ],
    settings: {
      topics: ['Lincoln High', 'Lincoln High School Sports', 'District 9 Education'],
      websites: ['localnews.com', 'educationboard.gov'],
      frequency: 'Daily'
    },
    messages: [
      {
        id: 'msg-1',
        role: 'agent',
        content: 'I have set up internet monitoring using the Google Web Search connector. I am currently tracking mentions of "Lincoln High". Would you like me to broaden the search to include specific academic programs or sports?',
        timestamp: '10:00 AM'
      },
      {
        id: 'msg-2',
        role: 'user',
        content: 'Yes, please add "District 9 Education" to the monitoring topics.',
        timestamp: '10:05 AM'
      },
      {
        id: 'msg-3',
        role: 'agent',
        content: 'Done! I updated your topics setting. I will compile a digest of mentions and provide it to you based on your frequency setting (currently Daily).',
        timestamp: '10:05 AM'
      }
    ]
  },
  {
    id: 'skill-2',
    title: 'Principal Dashboard',
    description: 'Create a dashboard with school metrics for student performance.',
    icon: 'LineChart',
    connectors: [
      { id: 'conn-sis', name: 'Student Information System (SIS)', status: 'connected', icon: 'Database' },
      { id: 'conn-lms', name: 'Learning Management System (LMS)', status: 'connected', icon: 'BookOpen' }
    ],
    settings: {
      metricFocus: 'Average performance by class and subject',
      updateInterval: 'Real-time'
    },
    messages: [
      {
        id: 'msg-1',
        role: 'agent',
        content: 'Hello Principal. I can build a custom performance dashboard for you. To do this, I will need access to your SIS and LMS.',
        timestamp: 'Yesterday'
      },
      {
        id: 'msg-2',
        role: 'user',
        content: 'Both are connected. Please focus on average performance by class and subject.',
        timestamp: 'Yesterday'
      },
      {
        id: 'msg-3',
        role: 'agent',
        content: 'Understood. I have securely pulled the recent quarter data from the SIS and assignment completion rates from the LMS. I am generating the widget now.',
        timestamp: 'Yesterday'
      }
    ]
  },
  {
    id: 'skill-3',
    title: 'Create Website',
    description: 'Generate a new page or entire website structure.',
    icon: 'Layout',
    connectors: [
      { id: 'conn-cms', name: 'Headless CMS (WordPress)', status: 'connected', icon: 'Database' },
      { id: 'conn-analytics', name: 'Google Analytics', status: 'requires_auth', icon: 'LineChart' }
    ],
    settings: {
      targetAudience: 'Prospective Parents',
      themeStyle: 'Modern Professional'
    },
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'I need to create a new promotional page for our upcoming Spring Festival.',
        timestamp: '2 days ago'
      },
      {
        id: 'msg-2',
        role: 'agent',
        content: 'I can certainly help with that. Are we targeting parents, or the wider local community? Knowing the audience will help me draft the initial layout and copy.',
        timestamp: '2 days ago'
      }
    ]
  },
  {
    id: 'skill-4',
    title: 'Update Parent Portal',
    description: 'Add widgets and make changes to the parent portal.',
    icon: 'Users',
    connectors: [
      { id: 'conn-portal', name: 'Parent Portal Backend', status: 'connected', icon: 'Server' }
    ],
    settings: {
      defaultWidgets: ['Calendar', 'Grades Overview', 'Recent Messages']
    },
    messages: [
      {
        id: 'msg-1',
        role: 'agent',
        content: 'I have analyzed the current parent portal usage. The most visited section is the grades overview. Would you like me to add a quick-glance widget for grades on the mobile view?',
        timestamp: '9:00 AM'
      }
    ]
  }
];
