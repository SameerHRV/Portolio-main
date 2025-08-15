"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/lib/actions";
import { Loader2, RefreshCw, Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CometCard } from "@/components/ui/comet-card";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [lastSubmission, setLastSubmission] = React.useState<ContactFormValues | null>(null);
  const [showResend, setShowResend] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setLastSubmission(data);
    setShowResend(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    const result = await sendEmail(undefined as any, formData);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: result.message,
        variant: "default",
      });
      form.reset();
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: result.message,
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const handleResend = () => {
    if (lastSubmission) {
      onSubmit(lastSubmission);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "sameerhrv.work@gmail.com",
      href: "mailto:sameerhrv.work@gmail.com",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Belagavi Karnataka, India",
      href: "#",
    },
  ];

  return (
    <section id="contact" data-scroll data-scroll-class="is-inview" className="relative overflow-hidden reveal-up">
      {/* Background decoration */}
      <div
        data-scroll
        data-scroll-speed="-0.25"
        className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-secondary/30 will-change-transform"
      />
      <div
        data-scroll
        data-scroll-speed="-0.15"
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl will-change-transform"
      />
      <div
        data-scroll
        data-scroll-speed="-0.1"
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl will-change-transform"
      />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div data-scroll data-scroll-class="is-inview" className="mb-16 text-center reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-accent font-medium text-primary backdrop-blur-sm border border-primary/20 mb-6">
            <MessageSquare className="h-4 w-4" />
            Let's Connect
          </div>
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="mt-6 font-body text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </div>

        {/* Comet Card CTA */}
        <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <CometCard className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl comet-surface p-6 sm:p-10 border border-border/60">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-headline text-2xl sm:text-3xl font-semibold text-foreground">
                    Let’s build something great
                  </h3>
                  <p className="mt-2 font-body text-muted-foreground max-w-2xl">
                    I partner with teams to design, build, and ship performant web and mobile experiences. Reach out and
                    I’ll reply within 24 hours.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <Button asChild>
                    <a href={"mailto:hello@example.com"}>Email me</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="#contact">Use the form</a>
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-secondary/50 p-4 border border-border/50 text-foreground/80">
                  <div className="text-sm">Avg. response time</div>
                  <div className="text-2xl font-semibold text-foreground">&lt; 24 hrs</div>
                </div>
                <div className="rounded-xl bg-secondary/50 p-4 border border-border/50 text-foreground/80">
                  <div className="text-sm">Timezone</div>
                  <div className="text-2xl font-semibold text-foreground">IST (UTC+5:30)</div>
                </div>
                <div className="rounded-xl bg-secondary/50 p-4 border border-border/50 text-foreground/80">
                  <div className="text-sm">Preferred</div>
                  <div className="text-2xl font-semibold text-foreground">Email first</div>
                </div>
              </div>
            </div>
          </CometCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="glass-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold">Let's Talk</CardTitle>
                <CardDescription className="font-body text-lg">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                  visions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-primary/10 transition-all duration-300 group border border-border/50"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-accent font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {info.title}
                      </div>
                      <div className="font-body text-sm text-muted-foreground">{info.value}</div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Card className="glass-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl font-bold">Send Message</CardTitle>
                <CardDescription className="font-body">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-accent text-base font-medium">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your Name"
                                {...field}
                                className="h-12 text-base border-2 focus:border-primary transition-colors duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-accent text-base font-medium">Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                {...field}
                                className="h-12 text-base border-2 focus:border-primary transition-colors duration-300"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-accent text-base font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              rows={6}
                              {...field}
                              className="text-base border-2 focus:border-primary transition-colors duration-300 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto h-12 px-8 text-lg font-accent font-medium bg-primary hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" /> Send Message
                          </>
                        )}
                      </Button>
                      {showResend && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleResend}
                          disabled={isSubmitting}
                          className="h-12 px-8 text-lg font-accent font-medium border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                          <RefreshCw className="mr-2 h-5 w-5" /> Resend
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
