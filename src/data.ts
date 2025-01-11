import { cache } from "./hooks/use-async";

const withDeviation = (seed: number) => {
  const deviation = Math.random() * 0.8 + 0.6;
  return Math.floor(seed * deviation);
};
const timeout = (ms = 100) =>
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

export const getSchedule = cache(async (day: string) => {
  await timeout();
  return schedule[day];
});

export const getSession = cache(async (sessionId: string) => {
  await timeout();
  const session = Object.values(schedule)
    .flat()
    .find((s) => s.id === sessionId);
  if (!session) throw new Error("Session not found");
  return session;
});

export const getSpeaker = cache(async (speakerId: string) => {
  await timeout();
  const speaker = speakers.find((s) => s.id === speakerId);
  if (!speaker) throw new Error("Speaker not found");
  return speaker;
});

export const getSpeakers = cache(async () => {
  await timeout();
  return speakers;
});

export const getIsBookmarked = cache(async (sessionId: string) => {
  await timeout();
  const bookmarks: string[] = JSON.parse(
    localStorage.getItem("bookmarks") || "[]"
  );
  const is = bookmarks.includes(sessionId);
  console.log(sessionId, is);
  return is;
});

export async function toggleBookmark(sessionId: string) {
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

export const getAttendeeFeedback = cache(async (sessionId: string) => {
  await timeout();
  const feedback: Record<string, AttendeeFeedback> = JSON.parse(
    localStorage.getItem("attendee-feedback") || "{}"
  );
  return feedback[sessionId];
});

export const setAttendeeFeedback = async (
  sessionId: string,
  feedback: AttendeeFeedback
) => {
  await timeout();
  const currentFeedback: Record<string, AttendeeFeedback> = JSON.parse(
    localStorage.getItem("attendee-feedback") || "{}"
  );
  currentFeedback[sessionId] = feedback;
  localStorage.setItem("attendee-feedback", JSON.stringify(currentFeedback));
};

export const getSpeakerFeedback = cache(async (sessionId: string) => {
  await timeout();
  const feedback: Record<string, string> = JSON.parse(
    localStorage.getItem("speaker-feedback") || "{}"
  );
  return feedback[sessionId] || "";
});

export const setSpeakerFeedback = async (
  sessionId: string,
  feedback: string
) => {
  await timeout();
  const currentFeedback: Record<string, string> = JSON.parse(
    localStorage.getItem("speaker-feedback") || "{}"
  );
  currentFeedback[sessionId] = feedback;
  localStorage.setItem("speaker-feedback", JSON.stringify(currentFeedback));
};

export type Role = "attendee" | "speaker" | "";
export function getRole() {
  return localStorage.getItem("role") as Role;
}
export function setRole(role: Role) {
  localStorage.setItem("role", role);
}
