import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Connect = () => {
  return (
    <section className="relative mt-35 rounded-xl bg-white text-black overflow-hidden mx-5 md:mx-15 ">
      {/* Background image */}
      <img
        src="/connect.png"
        alt="Contact illustration"
        className="pointer-events-none absolute bottom-0 right-0 w-48 z-0"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-7">
        <h2 className="mb-8 text-2xl font-primary md:text-3xl">
          GET IN TOUCH WITH US
        </h2>

        <form className="space-y-6 font-secondary  ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 ">
              <Label htmlFor="name" className="text-sm md:text-lg">
                Full Name<span className="text-red-500">*</span>
              </Label>
              <Input id="name" placeholder="Your full name" required className="md:text-xl"/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm md:text-lg">
                Email Address<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@gmail.com"
                required
                className="md:text-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm md:text-lg">
                Phone Number<span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91472742747"
                required
                className="md:text-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm md:text-lg">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input id="subject" placeholder="Enter the subject" required className="md:text-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm md:text-lg">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us how we can help you"
              className="min-h-[140px] resize-y bg-white md:text-xl"
              required
            />
          </div>

          <Button
            type="submit"
            className="mt-4 bg-black text-white hover:bg-neutral-800 text-sm md:text-xl md:px-5 md:py-6"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Connect;
