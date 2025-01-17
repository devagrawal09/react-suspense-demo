import { lazy, Suspense, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Toaster } from "./components/ui/toaster";
import { getRole } from "./data";
import { PhraseCounterWrapper } from "./components/PhraseCounter";

export type Route =
  | { route: "session"; sessionId: string }
  | { route: "home" }
  | { route: "login" }
  | { route: "counter" };

function App() {
  const [currentRoute, setRoute] = useState<Route>({ route: "home" });

  const [role, setRole] = useState(getRole);
  useEffect(() => setRole(role), [role]);

  if (currentRoute.route === "counter") {
    return <PhraseCounterWrapper />;
  }

  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <Header role={role} setRole={setRole} setRoute={setRoute} />
      </header>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <main className="flex-grow container mx-auto p-4">
        {currentRoute.route === "home" ? (
          <Schedule setRoute={setRoute} />
        ) : currentRoute.route === "session" ? (
          // <Suspense fallback={<div>Loading session details...</div>}>
          <SessionDetails
            role={role}
            sessionId={currentRoute.sessionId}
            goBack={() => setRoute({ route: "home" })}
          />
        ) : // </Suspense>
        currentRoute.route === "login" ? (
          <Login setRoute={setRoute} setRole={setRole} />
        ) : null}
      </main>
      {/* </Suspense> */}
      <Toaster />
    </>
  );
}

const Schedule = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const module = await import("./components/Schedule");
  return { default: module.Schedule };
});

const SessionDetails = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const module = await import("./components/SessionDetails");
  return { default: module.SessionDetails };
});

export default App;
