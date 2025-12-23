"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const message = {
  title: "Something went wrong",
  description:
    "We're having trouble loading this section right now. Please refresh or try again in a few minutes.",
};

export function FallbackPanel() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <Alert className="max-w-md border-destructive/30 bg-destructive/5">
        <AlertTitle className="text-lg font-semibold">{message.title}</AlertTitle>
        <AlertDescription className="mt-2 text-sm text-muted-foreground">
          {message.description}
        </AlertDescription>
      </Alert>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => window.location.reload()} size="sm">
          Refresh page
        </Button>
        <Button onClick={() => history.back()} variant="outline" size="sm">
          Go back
        </Button>
      </div>
    </div>
  );
}
