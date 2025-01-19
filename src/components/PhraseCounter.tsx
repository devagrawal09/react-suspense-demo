import { cache } from "@/hooks/use-async";
import { Suspense, use, useMemo, useState } from "react";
import "./comparison.css";

export function PhraseCounterWrapper() {
  return (
    <Suspense fallback={<p className="p">Loading phrase counter...</p>}>
      <PhraseCounter />
    </Suspense>
  );
}

function PhraseCounter() {
  console.log(`Rendering PhraseCounter`);

  const [count, setCount] = useState(0);
  const hello = use(useMemo(() => getHello(), []));
  const phrasePromise = useMemo(() => getPhrase(count), [count]);

  return (
    <main className="comparison">
      <h1 className="h1">{hello}</h1>
      <button
        className="increment"
        onClick={() => setCount(count + 1)}
        type="button"
      >
        Clicks: {count}
      </button>
      <Suspense fallback={<p className="p">Loading phrase...</p>}>
        <Message textPromise={phrasePromise} />
      </Suspense>
    </main>
  );
}

function Message({ textPromise }: { textPromise: Promise<string> }) {
  console.log(`Rendering <Message>`);
  const text = use(textPromise);
  return <p className="p">The message is: {text}</p>;
}

const phrases = [
  "Zero is the number of times I've given up.",
  "One is the number of times I've tried.",
  "Two is the number of times I've failed.",
  "Three is the number of times I've succeeded.",
  "Four is the number of times I've been lucky.",
  "Five is the number of times I've been unlucky.",
  "Six is the number of times I've been happy.",
  "Seven is the number of times I've been sad.",
  "Eight is the number of times I've been angry.",
  "Nine is the number of times I've been calm.",
];
const getPhrase = cache(async (num: number) => {
  // generate a funny phrase for each number from 0 to 9
  console.log("Fetching phrase for", num);
  await new Promise((r) => setTimeout(r, 1000));
  return phrases[num];
});

const getHello = cache(async () => {
  console.log("Fetching helloo...");
  await new Promise((r) => setTimeout(r, 500));
  return "Hello world!";
});
