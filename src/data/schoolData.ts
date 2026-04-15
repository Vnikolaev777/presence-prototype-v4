// ─────────────────────────────────────────────────────────────────────────────
// Shared data for the Oakwood High school website.
// All hardcoded content lives here so the main app can inject pending changes
// without touching component files.
// ─────────────────────────────────────────────────────────────────────────────

export interface Teacher {
  name: string;
  role: string;
  department: string;
  photo: string;
  tag: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;   // full URL or BASE_URL-relative filename
  category: string;
}

export interface PendingChanges {
  newTeacher?: Teacher;
  newBlogPost?: BlogPost;
}

// ── Holloway — auto-published new hire (used in new_teacher preview) ──────────

export const HOLLOWAY: Teacher = {
  name: 'Mr. James Holloway',
  role: '10th Grade History',
  department: 'Social Studies',
  photo: 'https://randomuser.me/api/portraits/men/75.jpg',
  tag: 'New Faculty',
  bio: 'Joined Oakwood in April 2026. Previously at Lincoln High for 8 years. Specializes in American history, civic engagement, and primary source analysis.',
};

// ── Staff ─────────────────────────────────────────────────────────────────────

export const STAFF: Teacher[] = [
  {
    name: 'Mr. Davis',
    role: 'Advanced Calculus',
    department: 'Mathematics',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    tag: 'Department Head',
    bio: 'MIT graduate with 14 years at Oakwood. Led the AP Calculus program to a 98% pass rate.',
  },
  {
    name: 'Ms. Johnson',
    role: 'World History',
    department: 'Social Studies',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    tag: 'Department Head',
    bio: 'Yale-trained historian and award-winning educator. Sponsor of the Model UN club since 2018.',
  },
  {
    name: 'Ms. Rivera',
    role: 'AP Biology & Chemistry',
    department: 'Science',
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
    tag: 'STEM Lead',
    bio: 'Former research scientist turned educator. Coaches the Science Olympiad team every spring.',
  },
  {
    name: 'Mr. Okafor',
    role: 'English & Creative Writing',
    department: 'English',
    photo: 'https://randomuser.me/api/portraits/men/54.jpg',
    tag: 'Published Author',
    bio: 'Published novelist and creative writing mentor. His students have won state-level writing awards three years running.',
  },
  {
    name: 'Ms. Park',
    role: 'Computer Science & Robotics',
    department: 'STEM',
    photo: 'https://randomuser.me/api/portraits/women/67.jpg',
    tag: 'Robotics Coach',
    bio: 'Former Google engineer who joined Oakwood to inspire the next generation of builders. Robotics team went to nationals in 2025.',
  },
  {
    name: 'Mr. Thompson',
    role: 'Physical Education & Athletics',
    department: 'Athletics',
    photo: 'https://randomuser.me/api/portraits/men/18.jpg',
    tag: 'Head Coach',
    bio: 'Varsity Soccer and Track coach. Led the soccer team to back-to-back state championships in 2025 and 2026.',
  },
];

// ── Blog Posts ────────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'math-olympiad',
    title: 'Join the Statewide Math Olympiad!',
    excerpt: 'The Ministry of Education has just announced the dates for the upcoming Annual Math Olympiad. We strongly encourage our advanced mathematics students to sign up early.',
    image: 'blog_math.png',
    category: 'Academics',
  },
  {
    id: 'science-fair',
    title: 'Oakwood Excels at State Science Fair',
    excerpt: 'Incredible innovations were on display this weekend as our brightest STEM minds took home 3 gold medals at the regional competition...',
    image: 'blog_science.png',
    category: 'Events',
  },
];
