import { lazy, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Toaster } from "./components/ui/toaster";
import { getRole } from "./data";

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

const Schedule = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const m = await import("./components/Schedule");
  return { default: m.Schedule };
});

const SessionDetails = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const m = await import("./components/SessionDetails");
  return { default: m.SessionDetails };
});

export default App;
