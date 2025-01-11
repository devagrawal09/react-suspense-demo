import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { getSpeakerFeedback, setSpeakerFeedback } from "@/data";
import { useAsyncAction, useAsyncData } from "@/hooks/use-async";

export type SpeakerReviewProps = { sessionId: string };
export function SpeakerReview({ sessionId }: SpeakerReviewProps) {
  const { value: review, refetch } = useAsyncData(() =>
    getSpeakerFeedback(sessionId)
  );

  const { execute: handleSubmit, status: submitStatus } = useAsyncAction(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const value = formData.get("review") as string;
      await setSpeakerFeedback(sessionId, value);
      refetch();
      toast({
        title: "Review submitted",
        description: "Thank you for your detailed feedback!",
      });
    }
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Speaker Review</h3>
      <p className="text-sm text-gray-600">
        Please provide your detailed review of this session.
      </p>
      <Textarea
        placeholder="Please provide your detailed review of this session..."
        rows={5}
        name="review"
        defaultValue={review || ""}
        disabled={submitStatus === "pending"}
      />
      <Button type="submit" disabled={submitStatus === "pending"}>
        Submit Review
      </Button>
    </form>
  );
}
