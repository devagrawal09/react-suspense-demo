import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export function SpeakerReview({ sessionId }: { sessionId: string }) {
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this review to your backend
    console.log(`Speaker review for session ${sessionId}:`, review);
    toast({
      title: "Review submitted",
      description: "Thank you for your detailed feedback!",
    });
    setReview("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Speaker Review</h3>
      <Textarea
        placeholder="Please provide your detailed review of this session..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={5}
      />
      <Button type="submit" disabled={!review.trim()}>
        Submit Review
      </Button>
    </form>
  );
}
