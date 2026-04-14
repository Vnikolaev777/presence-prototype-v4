import { addDays, subDays } from "date-fns";

export type EventCategory = 
  | "grades"
  | "sports"
  | "clubs"
  | "parents_committee"
  | "unofficial"
  | "other_schools";

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description?: string;
  category: EventCategory;
  time?: string;
}

export interface Deadline {
  id: string;
  dueDate: Date;
  title: string;
  subject: string;
  urgency: "high" | "medium" | "low";
}

export interface ProductivityStat {
  date: string; // ISO String (YYYY-MM-DD or similar) for recharts
  productivityScore: number; // 0-100
  busynessLevel: number; // 0-100
}

// Ensure the demo relies on the current time roughly so distances are correct.
const today = new Date();

export const mockEvents: CalendarEvent[] = [
  // Grades
  { id: "g1", date: subDays(today, 2), title: "Math Midterm Scored", description: "A- (92%)", category: "grades" },
  { id: "g2", date: addDays(today, 5), title: "Science Lab Report Grade", description: "Pending", category: "grades" },
  { id: "g3", date: addDays(today, 12), title: "History Essay Graded", description: "Expected today", category: "grades" },
  { id: "g4", date: addDays(today, 20), title: "English Pop Quiz", description: "B+ (88%)", category: "grades", time: "10:00 AM" },
  { id: "g5", date: subDays(today, 8), title: "Physics Quiz", description: "A (96%)", category: "grades" },

  // Sports
  { id: "s1", date: addDays(today, 1), title: "Varsity Soccer Practice", category: "sports", time: "3:30 PM" },
  { id: "s2", date: addDays(today, 4), title: "Basketball Away Game", description: "vs. Lincoln High", category: "sports", time: "5:00 PM" },
  { id: "s3", date: addDays(today, 8), title: "Track & Field Meet", category: "sports", time: "9:00 AM" },
  { id: "s4", date: subDays(today, 4), title: "Soccer Home Game", category: "sports", time: "4:00 PM" },
  { id: "s5", date: addDays(today, 15), title: "Tennis Tournament", category: "sports", time: "11:00 AM" },

  // Clubs
  { id: "c1", date: today, title: "Robotics Club Meeting", category: "clubs", time: "3:15 PM" },
  { id: "c2", date: addDays(today, 7), title: "Debate Team Prep", category: "clubs", time: "4:00 PM" },
  { id: "c3", date: addDays(today, 14), title: "Drama Rehearsal", category: "clubs", time: "3:30 PM" },
  { id: "c4", date: subDays(today, 6), title: "Coding Club Hackathon", category: "clubs", time: "12:00 PM" },
  { id: "c5", date: addDays(today, 22), title: "Chess Tournament", category: "clubs", time: "3:30 PM" },

  // Parents Committee
  { id: "p1", date: addDays(today, 3), title: "PTA Monthly Meeting", description: "Library", category: "parents_committee", time: "6:30 PM" },
  { id: "p2", date: addDays(today, 18), title: "Fundraising Planning Session", category: "parents_committee", time: "7:00 PM" },
  { id: "p3", date: subDays(today, 12), title: "End of Year Gala Planning", category: "parents_committee", time: "6:00 PM" },

  // Unofficial Events
  { id: "u1", date: addDays(today, 2), title: "Study Group at Cafe", description: "Math study before finals", category: "unofficial", time: "4:30 PM" },
  { id: "u2", date: addDays(today, 9), title: "Alex's Birthday Party", category: "unofficial", time: "2:00 PM" },
  { id: "u3", date: addDays(today, 25), title: "Post-Midterm Movie Night", category: "unofficial", time: "7:00 PM" },
  { id: "u4", date: subDays(today, 1), title: "Weekend Hike", category: "unofficial", time: "9:00 AM" },

  // Other Schools
  { id: "o1", date: addDays(today, 6), title: "Cross-District Art Exhibition", description: "Held at Westside Academy", category: "other_schools", time: "5:00 PM" },
  { id: "o2", date: addDays(today, 16), title: "Regional Science Fair", description: "State University Campus", category: "other_schools", time: "9:00 AM" },
  { id: "o3", date: addDays(today, 29), title: "Joint Band Concert", description: "With Northwood High", category: "other_schools", time: "7:30 PM" }
];

export const mockDeadlines: Deadline[] = [
  { id: "d1", dueDate: addDays(today, 2), title: "Science Fair Proposal", subject: "Science", urgency: "high" },
  { id: "d2", dueDate: addDays(today, 5), title: "History Research Essay", subject: "History", urgency: "medium" },
  { id: "d3", dueDate: addDays(today, 10), title: "Math Take-Home Exam", subject: "Math", urgency: "high" },
  { id: "d4", dueDate: addDays(today, 21), title: "English Novel Review", subject: "English", urgency: "low" },
];

export const mockProductivityStats: ProductivityStat[] = Array.from({ length: 14 }).map((_, i) => {
  const d = subDays(today, 13 - i);
  // generate some sine-wave-like semi-random data
  const baseScore = 60 + Math.sin(i * 0.8) * 20;
  const baseBusyness = 50 + Math.cos(i * 0.5) * 30;
  
  return {
    date: `${d.getMonth() + 1}/${d.getDate()}`,
    productivityScore: Math.round(baseScore + (Math.random() * 15 - 7.5)),
    busynessLevel: Math.round(baseBusyness + (Math.random() * 20 - 10)),
  };
});
