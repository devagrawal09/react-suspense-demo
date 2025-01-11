import { Route } from "@/App";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSchedule, getSpeakers } from "@/data";
import { useAsyncData } from "@/hooks/use-async";
import { useState } from "react";

export type ScheduleProps = {
  setRoute: (route: Route) => void;
};

export function Schedule({ setRoute }: ScheduleProps) {
  const [activeTab, setActiveTab] = useState("day1");
  const { value: sessions } = useAsyncData(
    () => getSchedule(activeTab),
    [activeTab]
  );
  const { value: speakers } = useAsyncData(() => getSpeakers());

  return (
    <>
      <Tabs className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="day1">Day 1</TabsTrigger>
          <TabsTrigger value="day2">Day 2</TabsTrigger>
          <TabsTrigger value="day3">Day 3</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-4">
        {sessions ? (
          sessions.map((session) => (
            <Button
              key={session.id}
              variant="ghost"
              className="w-full justify-start text-left mb-2 p-4 py-8 bg-gray-50 hover:bg-gray-100"
              onClick={() =>
                setRoute({ route: "session", sessionId: session.id })
              }
            >
              <div>
                <p className="font-bold">{session.title}</p>
                <p className="text-sm text-gray-600">
                  {session.time} -{" "}
                  {speakers
                    ? speakers.find((s) => s.id === session.speakerId)?.name
                    : "Loading speaker..."}
                </p>
              </div>
            </Button>
          ))
        ) : (
          <div>Loading schedule data...</div>
        )}
      </div>
    </>
  );
}
