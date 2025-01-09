const withDeviation = (seed: number) => {
  const deviation = Math.random() * 0.8 + 0.6;
  return Math.floor(seed * deviation);
};
const timeout = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, withDeviation(ms)));

export type Session = {
  id: string;
  title: string;
  time: string;
  speakerId: string;
  description?: string;
};

export type Speaker = {
  id: string;
  name: string;
  bio: string;
};

const schedule: Record<string, Session[]> = {
  day1: [
    {
      id: "1",
      title: "Keynote",
      time: "9:00 AM",
      speakerId: "1",
      description: "Opening keynote speech",
    },
    {
      id: "2",
      title: "React Best Practices",
      time: "10:30 AM",
      speakerId: "2",
      description: "Learn the latest React best practices",
    },
  ],
  day2: [
    {
      id: "3",
      title: "GraphQL Workshop",
      time: "9:00 AM",
      speakerId: "3",
      description: "Hands-on GraphQL workshop",
    },
    {
      id: "4",
      title: "State Management",
      time: "11:00 AM",
      speakerId: "4",
      description: "Comparing different state management solutions",
    },
  ],
  day3: [
    {
      id: "5",
      title: "Serverless Architecture",
      time: "9:30 AM",
      speakerId: "5",
      description: "Introduction to serverless architecture",
    },
    {
      id: "6",
      title: "Closing Keynote",
      time: "2:00 PM",
      speakerId: "6",
      description: "Closing remarks and wrap-up",
    },
  ],
};

const speakers: Speaker[] = [
  {
    id: "1",
    name: "John Doe",
    bio: "John Doe is a software engineer and speaker",
  },
  {
    id: "2",
    name: "Jane Smith",
    bio: "Jane Smith is a designer and speaker",
  },
  {
    id: "3",
    name: "Alice Johnson",
    bio: "Alice Johnson is a developer and speaker",
  },
  {
    id: "4",
    name: "Bob Wilson",
    bio: "Bob Wilson is a manager and speaker",
  },
  {
    id: "5",
    name: "Charlie Brown",
    bio: "Charlie Brown is a data scientist and speaker",
  },
  {
    id: "6",
    name: "Diana Prince",
    bio: "Diana Prince is a writer and speaker",
  },
];

export async function getSchedule(day: string) {
  await timeout();
  return schedule[day];
}

export async function getSession(sessionId: string) {
  await timeout();
  return Object.values(schedule)
    .flat()
    .find((s) => s.id === sessionId);
}

export async function getSpeaker(speakerId: string) {
  await timeout();
  return speakers.find((s) => s.id === speakerId);
}

export async function getSpeakers() {
  await timeout();
  return speakers;
}

export async function getIsBookmarked(sessionId: string) {
  console.log(`get bookmark`, sessionId);
  await timeout();
  const bookmarks: string[] = JSON.parse(
    localStorage.getItem("bookmarks") || "[]"
  );
  return bookmarks.includes(sessionId);
}

export async function toggleBookmark(sessionId: string) {
  console.log(`toggle bookmark`, sessionId);
  await timeout();
  const bookmarks: string[] = JSON.parse(
    localStorage.getItem("bookmarks") || "[]"
  );
  const index = bookmarks.indexOf(sessionId);
  if (index === -1) {
    bookmarks.push(sessionId);
  } else {
    bookmarks.splice(index, 1);
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  return !index;
}

export type AttendeeFeedback = "negative" | "neutral" | "positive";
export async function getAttendeeFeedback(sessionId: string) {
  await timeout();
  const feedback: Record<string, AttendeeFeedback> = JSON.parse(
    localStorage.getItem("attendee-feedback") || "{}"
  );
  return feedback[sessionId];
}

export async function setAttendeeFeedback(
  sessionId: string,
  feedback: AttendeeFeedback
) {
  await timeout();
  const currentFeedback: Record<string, AttendeeFeedback> = JSON.parse(
    localStorage.getItem("attendee-feedback") || "{}"
  );
  currentFeedback[sessionId] = feedback;
  localStorage.setItem("attendee-feedback", JSON.stringify(currentFeedback));
}

export async function getSpeakerFeedback(sessionId: string) {
  await timeout();
  const feedback: Record<string, string> = JSON.parse(
    localStorage.getItem("speaker-feedback") || "{}"
  );
  return feedback[sessionId] || "";
}

export async function setSpeakerFeedback(sessionId: string, feedback: string) {
  await timeout();
  const currentFeedback: Record<string, string> = JSON.parse(
    localStorage.getItem("speaker-feedback") || "{}"
  );
  currentFeedback[sessionId] = feedback;
  localStorage.setItem("speaker-feedback", JSON.stringify(currentFeedback));
}
