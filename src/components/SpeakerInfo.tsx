import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SessionCard } from "./SessionCard";
import { ActionItems } from "./ActionItems";

const mockSpeakerData = {
  name: "Jane Smith",
  bio: "Jane Smith is a renowned expert in React and modern web development.",
  sessions: [
    {
      id: "2",
      title: "React Best Practices",
      time: "10:30 AM",
      date: "Day 1",
      description:
        "Learn the latest React best practices and how to implement them in your projects.",
    },
    {
      id: "7",
      title: "Advanced React Patterns",
      time: "2:00 PM",
      date: "Day 2",
      description:
        "Dive deep into advanced React patterns and improve your application architecture.",
    },
  ],
  actionItems: [
    {
      id: "1",
      title: "Submit slide deck",
      dueDate: "2023-07-15",
      completed: false,
    },
    {
      id: "2",
      title: "Confirm A/V requirements",
      dueDate: "2023-07-20",
      completed: true,
    },
    {
      id: "3",
      title: "Review speaker guidelines",
      dueDate: "2023-07-10",
      completed: false,
    },
  ],
};

export function SpeakerInfo() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Speaker Dashboard</h1>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${mockSpeakerData.name}`}
              alt={mockSpeakerData.name}
            />
            <AvatarFallback>
              {mockSpeakerData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{mockSpeakerData.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Speaker</p>
          </div>
        </CardHeader>
        <CardContent>
          <p>{mockSpeakerData.bio}</p>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Sessions</h2>
        {mockSpeakerData.sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
      <ActionItems items={mockSpeakerData.actionItems} />
    </div>
  );
}
