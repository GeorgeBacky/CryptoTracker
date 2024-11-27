import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function ErrorCard() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-destructive/50">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-destructive/10 rounded-lg">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Unable to Load Data</h3>
            <p className="text-sm text-muted-foreground">
              There was an error loading cryptocurrency data. Please try again later.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}