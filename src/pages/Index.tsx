import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Youtube, Sparkles } from "lucide-react";

// Configure your webhook URL here
const WEBHOOK_URL = "https://your-n8n-webhook-url";

const formSchema = z.object({
  channelName: z
    .string()
    .trim()
    .min(1, { message: "Channel name is required" })
    .max(100, { message: "Channel name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelName: data.channelName,
          email: data.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      toast({
        title: "Success! 🎉",
        description: "Your request has been submitted successfully. We'll be in touch soon!",
      });

      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
            <Youtube className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            YouTube Title Booster
          </h1>
          <p className="text-lg text-muted-foreground max-w-sm mx-auto">
            Optimize your video titles and grow your channel with AI-powered suggestions
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-border/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Get Started
            </CardTitle>
            <CardDescription>
              Enter your details to boost your YouTube titles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Channel Name Input */}
              <div className="space-y-2">
                <Label htmlFor="channelName" className="text-sm font-medium">
                  Channel Name
                </Label>
                <Input
                  id="channelName"
                  placeholder="e.g., Tech Tutorials"
                  {...register("channelName")}
                  className={`transition-colors ${
                    errors.channelName ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                  disabled={isSubmitting}
                />
                {errors.channelName && (
                  <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                    {errors.channelName.message}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`transition-colors ${
                    errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Boost My Titles"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground">
          By submitting, you agree to receive title optimization suggestions via email.
        </p>
      </div>
    </div>
  );
};

export default Index;
