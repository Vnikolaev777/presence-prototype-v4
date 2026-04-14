import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const today = new Date();
today.setHours(12, 0, 0, 0);

const OUT_PATH = path.join(__dirname, '../src/data/extendedStudentData.json');

// Add Schedule schema
const dailySchedule = [
  { id: "l1", period: 1, subject: "Math", time: "8:00 AM - 8:50 AM", room: "Room 102" },
  { id: "l2", period: 2, subject: "Physics", time: "9:00 AM - 9:50 AM", room: "Lab 4" },
  { id: "l3", period: 3, subject: "English", time: "10:00 AM - 10:50 AM", room: "Room 205" },
  { id: "l4", period: 4, subject: "History", time: "11:00 AM - 11:50 AM", room: "Room 304" },
  { id: "l5", period: 5, subject: "Biology", time: "1:00 PM - 1:50 PM", room: "Lab 2" },
  { id: "l6", period: 6, subject: "Computer Science", time: "2:00 PM - 2:50 PM", room: "Computer Lab" }
];

const subjects = dailySchedule.map(s => s.subject);
const assignments = ["Homework", "Quiz", "Lab Report", "Midterm", "Pop Quiz", "Essay", "Coursework"];
const gradesDist = ["A+ (98%)", "A (95%)", "A- (92%)", "B+ (88%)", "B (85%)", "B- (81%)", "C+ (78%)"];
const locations = ["Library", "Science Wing", "Main Hall", "Gym", "Cafeteria"];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate an event function
let globalId = 1;
function genEvent(date, title, description, category, time) {
  return {
    id: `ev_${globalId++}`,
    date: date.toISOString(),
    title,
    description,
    category,
    time
  };
}

const events = [];

for (let i = -45; i <= 45; i++) {
  const pointerDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
  const dayOfWeek = pointerDate.getDay(); 

  // 1. GRADES
  if (dayOfWeek !== 0 && dayOfWeek !== 6) {
    const numGrades = Math.random() > 0.6 ? 2 : 1;
    for (let g = 0; g < numGrades; g++) {
      const subj = randomItem(subjects);
      const title = `${subj} ${randomItem(assignments)}`;
      const grade = randomItem(gradesDist);
      // Inject subject implicitly in description or keep it in title so frontend can match
      events.push(genEvent(pointerDate, title, grade, "grades", ""));
    }
  }

  // 2. SPORTS: Tue, Thu, Fri, Sat
  if ([2, 4, 5, 6].includes(dayOfWeek) && Math.random() > 0.4) {
    const sportsList = ["Varsity Soccer", "Track & Field", "Basketball", "Tennis", "Swim Team"];
    events.push(genEvent(pointerDate, `${randomItem(sportsList)} Game/Practice`, "", "sports", "4:00 PM"));
  }

  // 3. CLUBS: Mon, Wed
  if ([1, 3].includes(dayOfWeek) && Math.random() > 0.3) {
    const clubsList = ["Robotics Club", "Drama Club", "Debate Team", "Coding Club"];
    events.push(genEvent(pointerDate, `${randomItem(clubsList)} Meeting`, randomItem(locations), "clubs", "3:15 PM"));
  }

  // 4. UNOFFICIAL (Student Initiatives): Weekends or Friday Night
  if ([5, 6, 0].includes(dayOfWeek) && Math.random() > 0.5) {
    const acts = ["Student Initiative Reading Club", "Student-Led Science Fair", "DIY Debate Practice", "Independent Art Exhibition", "Student Charity Bake Sale"];
    events.push(genEvent(pointerDate, randomItem(acts), "Student Initiative", "unofficial", "2:00 PM"));
  }

  // 5. PARENTS COMITTEE: ~10% chance
  if (Math.random() > 0.9) {
    events.push(genEvent(pointerDate, "PTA Monthly Meeting", randomItem(locations), "parents_committee", "6:30 PM"));
  }

  // 6. OTHER SCHOOLS: ~5% chance
  if (Math.random() > 0.95) {
    events.push(genEvent(pointerDate, "District Event/Fair", "State University", "other_schools", "9:00 AM"));
  }
}

// Deadlines
const deadlines = [
  { id: "d1", dueDate: new Date(today.getTime() + 2*86400000).toISOString(), title: "Science Fair Proposal", subject: "Biology", urgency: "high" },
  { id: "d2", dueDate: new Date(today.getTime() + 6*86400000).toISOString(), title: "Midterm Paper", subject: "History", urgency: "high" },
  { id: "d3", dueDate: new Date(today.getTime() + 10*86400000).toISOString(), title: "Math Assignment", subject: "Math", urgency: "medium" },
  { id: "d4", dueDate: new Date(today.getTime() + 14*86400000).toISOString(), title: "Book Review", subject: "English", urgency: "low" },
];

const payload = {
  dailySchedule,
  events,
  deadlines
};

fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2));
console.log(`Successfully wrote ${events.length} events to ${OUT_PATH}`);
