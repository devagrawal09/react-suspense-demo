import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSchedule, getSpeakers, Session } from "@/data";
import { useAsync } from "@/hooks/use-async";
import { useState } from "react";

export type ScheduleProps = {
  onSelectSession: (session: Session) => void;
};

export function Schedule({ onSelectSession }: ScheduleProps) {
  const [activeTab, setActiveTab] = useState("day1");

  return (
    <>
      <Tabs className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="day1">Day 1</TabsTrigger>
          <TabsTrigger value="day2">Day 2</TabsTrigger>
          <TabsTrigger value="day3">Day 3</TabsTrigger>
        </TabsList>
      </Tabs>
      <DaySchedule day={activeTab} onSelectSession={onSelectSession} />
    </>
  );
}

function DaySchedule({
  day,
  onSelectSession,
}: {
  day: string;
  onSelectSession: (session: Session) => void;
}) {
  const { value: sessions } = useAsync(() => getSchedule(day));
  const { value: speakers } = useAsync(() => getSpeakers());

  return (
    <div className="mt-4">
      {sessions ? (
        sessions.map((session) => (
          <Button
            key={session.id}
            variant="ghost"
            className="w-full justify-start text-left mb-2 p-4 py-8 bg-gray-50 hover:bg-gray-100"
            onClick={() => onSelectSession(session)}
          >
            <div>
              <p className="font-bold">{session.title}</p>
              <p className="text-sm text-gray-600">
                {session.time} -{" "}
                {speakers?.find((s) => s.id === session.speakerId)?.name}
              </p>
            </div>
          </Button>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
