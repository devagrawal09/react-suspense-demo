import { Route } from "@/App";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSchedule, getSpeakers } from "@/data";
import { useAsyncData } from "@/hooks/use-async";
import { Suspense, useState, useTransition } from "react";

export type ScheduleProps = {
  setRoute: (route: Route) => void;
};

export function Schedule({ setRoute }: ScheduleProps) {
  const [activeTab, setActiveTab] = useState("day1");
  const [navigating, start] = useTransition();
  // const setActiveTab = (tab: string) => start(() => _setActiveTab(tab));

  return (
    <>
      <Tabs
        className={"w-full " + (navigating ? "opacity-50" : "")}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="day1">Day 1</TabsTrigger>
          <TabsTrigger value="day2">Day 2</TabsTrigger>
          <TabsTrigger value="day3">Day 3</TabsTrigger>
        </TabsList>
      </Tabs>
      {/* <Suspense fallback={<div>Loading schedule...</div>}> */}
      <DaySchedule activeTab={activeTab} setRoute={setRoute} />
      {/* </Suspense> */}
    </>
  );
}

function DaySchedule({
  activeTab,
  setRoute,
}: {
  activeTab: string;
  setRoute: (route: Route) => void;
}) {
  const { value: sessions } = useAsyncData(
    () => getSchedule(activeTab),
    [activeTab]
  );
  const { value: speakers } = useAsyncData(() => getSpeakers());

  return (
    <div className="mt-4">
      {sessions.map((session) => (
        <Button
          key={session.id}
          variant="ghost"
          className="w-full justify-start text-left mb-2 p-4 py-8 bg-gray-50 hover:bg-gray-100"
          onClick={() => setRoute({ route: "session", sessionId: session.id })}
        >
          <div>
            <p className="font-bold">{session.title}</p>
            <p className="text-sm text-gray-600">
              {session.time} -{" "}
              {speakers.find((s) => s.id === session.speakerId)?.name}
            </p>
          </div>
        </Button>
      ))}
    </div>
  );
}
