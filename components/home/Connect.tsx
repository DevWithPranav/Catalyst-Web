import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Connect = () => {
  return (
    <section className="relative mt-35 rounded-xl bg-white text-black overflow-hidden mx-5">
      {/* Background image */}
      <img
        src="/connect.png"
        alt="Contact illustration"
        className="pointer-events-none absolute bottom-0 right-0 w-48 z-0"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-7">
        <h2 className="mb-8 text-2xl font-primary">GET IN TOUCH WITH US</h2>

        <form className="space-y-6 font-secondary">
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name<span className="text-red-500">*</span>
            </Label>
            <Input id="name" placeholder="Your full name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@gmail.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number<span className="text-red-500">*</span>
            </Label>
            <Input id="phone" type="tel" placeholder="+91472742747" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input id="subject" placeholder="Enter the subject" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us how we can help you"
              className="min-h-[140px] resize-y bg-white"
              required
            />
          </div>

          <Button
            type="submit"
            className="mt-4 bg-black text-white hover:bg-neutral-800"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Connect;
