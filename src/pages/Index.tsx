import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Youtube, Sparkles, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full filter blur-[120px] animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full filter blur-[120px] animate-float" style={{ animationDelay: "2s" }}></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Side - Hero Content */}
            <div className="space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left duration-700">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary animate-glow" />
                <span className="text-sm font-medium text-foreground">AI-Powered Optimization</span>
              </div>
              
              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Boost Your
                  </span>
                  <br />
                  <span className="text-foreground">YouTube Titles</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Get AI-powered suggestions that increase views, engagement, and channel growth
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">More Views</h3>
                    <p className="text-sm text-muted-foreground">Optimized for clicks</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI-Powered</h3>
                    <p className="text-sm text-muted-foreground">Smart algorithms</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Proven Results</h3>
                    <p className="text-sm text-muted-foreground">Data-driven</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form Card */}
            <div className="animate-in fade-in slide-in-from-right duration-700">
              <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-card hover:shadow-hover transition-all duration-500">
                <CardHeader className="space-y-3 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-primary">
                      <Youtube className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-display">Get Started</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Start optimizing your titles today
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Channel Name Input */}
                    <div className="space-y-2">
                      <Label htmlFor="channelName" className="text-sm font-medium text-foreground">
                        Channel Name
                      </Label>
                      <Input
                        id="channelName"
                        placeholder="e.g., Tech Tutorials"
                        {...register("channelName")}
                        className={`h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 ${
                          errors.channelName ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.channelName && (
                        <p className="text-sm text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                          {errors.channelName.message}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...register("email")}
                        className={`h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 ${
                          errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-glow relative overflow-hidden group"
                      disabled={isSubmitting}
                    >
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Boost My Titles
                        </>
                      )}
                    </Button>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Free analysis • No credit card required</span>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
