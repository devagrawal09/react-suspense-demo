import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { getSpeakerFeedback, setSpeakerFeedback } from "@/data";
import { useAsync } from "@/hooks/use-async";

export function SpeakerReview({ sessionId }: { sessionId: string }) {
  const { value: review, refetch } = useAsync(() =>
    getSpeakerFeedback(sessionId)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("review") as string;
    await setSpeakerFeedback(sessionId, value);
    refetch();
    toast({
      title: "Review submitted",
      description: "Thank you for your detailed feedback!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Speaker Review</h3>
      <Textarea
        placeholder="Please provide your detailed review of this session..."
        rows={5}
        name="review"
        defaultValue={review}
      />
      <Button type="submit">Submit Review</Button>
    </form>
  );
}
