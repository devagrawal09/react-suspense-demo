import { JSX, useEffect, useState } from "react";
import { SessionDetails } from "./components/SessionDetails";
import { Button } from "./components/ui/button";
import { type ScheduleProps } from "./components/Schedule";

async function asyncSchedule() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return import("./components/Schedule");
}

let loadedSchedule: (props: ScheduleProps) => JSX.Element;

function Schedule(props: ScheduleProps) {
  const [_Schedule, setSchedule] = useState<
    (props: ScheduleProps) => JSX.Element
  >(() => loadedSchedule);

  useEffect(() => {
    if (!_Schedule) {
      console.log(`loading schedule`);

      asyncSchedule().then((schedule) =>
        setSchedule(() => (loadedSchedule = schedule.Schedule))
      );
    }
  }, []);

  return _Schedule && <_Schedule {...props} />;
}

type Route =
  | { route: "session"; sessionId: string }
  | { route: "home" }
  | { route: "login" };

type Role = "attendee" | "speaker";

function App() {
  const [currentRoute, setRoute] = useState<Route>({ route: "home" });
  const [role, setRole] = useState<Role>();

  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => setRoute({ route: "home" })}
          >
            Conference Schedule
          </h1>
          {role ? (
            <Button
              variant="link"
              className="text-white"
              onClick={() => {
                setRole(undefined);
                setRoute({ route: "home" });
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="link"
              className="text-white"
              onClick={() => setRoute({ route: "login" })}
            >
              Login
            </Button>
          )}
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {currentRoute.route === "home" ? (
          <Schedule
            onSelectSession={(session) =>
              setRoute({ route: "session", sessionId: session.id })
            }
          />
        ) : currentRoute.route === "session" ? (
          <SessionDetails
            role={role}
            sessionId={currentRoute.sessionId}
            goBack={() => setRoute({ route: "home" })}
          />
        ) : currentRoute.route === "login" ? (
          <div className="flex gap-4 items-center justify-center">
            <Button
              onClick={() => {
                setRole("attendee");
                setRoute({ route: "home" });
              }}
            >
              Login as Attendee
            </Button>
            <Button
              onClick={() => {
                setRole("speaker");
                setRoute({ route: "home" });
              }}
            >
              Login as Speaker
            </Button>
          </div>
        ) : null}
      </main>
    </>
  );
}

export default App;
