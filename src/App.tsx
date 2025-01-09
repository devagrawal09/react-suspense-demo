import { JSX, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { type ScheduleProps } from "./components/Schedule";
import { type SessionDetailsProps } from "./components/SessionDetails";
import { Toaster } from "./components/ui/toaster";
import { getRole } from "./data";
import { useAsync } from "./hooks/use-async";

export type Route =
  | { route: "session"; sessionId: string }
  | { route: "home" }
  | { route: "login" };

function App() {
  const [currentRoute, setRoute] = useState<Route>({ route: "home" });

  const [role, setRole] = useState(getRole);
  useEffect(() => setRole(role), [role]);

  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <Header role={role} setRole={setRole} setRoute={setRoute} />
      </header>
      <main className="flex-grow container mx-auto p-4">
        {currentRoute.route === "home" ? (
          <Schedule setRoute={setRoute} />
        ) : currentRoute.route === "session" ? (
          <SessionDetails
            role={role}
            sessionId={currentRoute.sessionId}
            goBack={() => setRoute({ route: "home" })}
          />
        ) : currentRoute.route === "login" ? (
          <Login setRoute={setRoute} setRole={setRole} />
        ) : null}
      </main>
      <Toaster />
    </>
  );
}

async function asyncSchedule() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await import("./components/Schedule");
}
let loadedSchedule: (props: ScheduleProps) => JSX.Element;

function Schedule(props: ScheduleProps) {
  const { value: _Schedule } = useAsync(() => {
    if (loadedSchedule) return Promise.resolve(loadedSchedule);

    return asyncSchedule().then((module) => {
      loadedSchedule = module.Schedule;
      return loadedSchedule;
    });
  });

  return _Schedule && <_Schedule {...props} />;
}

async function asyncSessionDetails() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await import("./components/SessionDetails");
}
let loadedSessionDetails: (props: SessionDetailsProps) => JSX.Element;

function SessionDetails(props: SessionDetailsProps) {
  const { value: _SessionDetails } = useAsync(() => {
    if (loadedSessionDetails) return Promise.resolve(loadedSessionDetails);

    return asyncSessionDetails().then((module) => {
      loadedSessionDetails = module.SessionDetails;
      return loadedSessionDetails;
    });
  });

  return _SessionDetails && <_SessionDetails {...props} />;
}

export default App;
