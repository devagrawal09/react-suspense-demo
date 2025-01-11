import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getIsBookmarked,
  getSession,
  getSpeaker,
  toggleBookmark,
} from "@/data";
import { useAsyncAction, useAsyncData } from "@/hooks/use-async";
import { Bookmark } from "lucide-react";
import { JSX } from "react";
import { AttendeeRatingProps } from "./AttendeeRating";
import { SpeakerReviewProps } from "./SpeakerReview";

export type SessionDetailsProps = {
  sessionId: string;
  role?: "attendee" | "speaker" | "";
  goBack: () => void;
};

export function SessionDetails({
  sessionId,
  goBack,
  role,
}: SessionDetailsProps) {
  const { value: session } = useAsyncData(() => getSession(sessionId));
  const { value: speaker } = useAsyncData(
    async () => (session?.speakerId ? getSpeaker(session?.speakerId) : null),
    [session?.speakerId]
  );
  const {
    value: isBookmarked,
    status,
    refetch,
  } = useAsyncData(() => getIsBookmarked(sessionId));

  const { status: toggleBookmarkStatus, execute: toggleBookmarkAction } =
    useAsyncAction(() => toggleBookmark(sessionId).then(refetch));

  if (!session) return <div>Loading session details...</div>;

  return (
    <>
      <Button variant="link" onClick={goBack}>
        &lt; Go back
      </Button>
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold">{session.title}</h2>
        {status === "pending" ? (
          "Loading bookmark status..."
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleBookmarkAction}
            disabled={toggleBookmarkStatus === "pending"}
          >
            <Bookmark className={isBookmarked ? "fill-current" : ""} />
          </Button>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-4">{session.time}</p>
      <p>{session.description || "No description available."}</p>

      {speaker ? (
        <div className="mt-4">
          <p className="font-bold">{speaker.name}</p>
          <p className="text-sm text-gray-600">{speaker.bio}</p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Loading speaker details.</p>
      )}

      <Card className="mt-4 pt-4">
        <CardContent className="space-y-6">
          {role === "attendee" ? (
            <AttendeeRating sessionId={session.id} />
          ) : role === "speaker" ? (
            <SpeakerReview sessionId={session.id} />
          ) : (
            <>Login to provide feedback</>
          )}
        </CardContent>
      </Card>
    </>
  );
}

let loadedAttendeeRating: (props: AttendeeRatingProps) => JSX.Element;

function AttendeeRating(props: AttendeeRatingProps) {
  const { value: _AttendeeRating } = useAsyncData(async () => {
    if (loadedAttendeeRating) return loadedAttendeeRating;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const module = await import("./AttendeeRating");
    loadedAttendeeRating = module.AttendeeRating;
    return loadedAttendeeRating;
  });

  return _AttendeeRating ? (
    <_AttendeeRating {...props} />
  ) : (
    "Loading feedback widget..."
  );
}

let loadedSpeakerReview: (props: SpeakerReviewProps) => JSX.Element;

function SpeakerReview(props: SpeakerReviewProps) {
  const { value: _SpeakerReview } = useAsyncData(async () => {
    if (loadedSpeakerReview) return loadedSpeakerReview;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const module = await import("./SpeakerReview");
    loadedSpeakerReview = module.SpeakerReview;
    return loadedSpeakerReview;
  });

  return _SpeakerReview ? (
    <_SpeakerReview {...props} />
  ) : (
    "Loading feedback widget..."
  );
}
