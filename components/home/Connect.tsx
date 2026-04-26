"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Connect = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      await fetch(
        "https://discord.com/api/webhooks/1497959545345933345/feiohQ6PS2qSh-K9UKfozwUjMyA7enRnz4qMyCAJ79vmByQCXBVgC1hAJfxJf70Sx-YQ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            embeds: [
              {
                title: "New Contact Submission",
                color: 5814783,
                fields: [
                  { name: "👤 Name", value: data.name, inline: true },
                  { name: "📧 Email", value: data.email, inline: true },
                  { name: "📞 Phone", value: data.phone, inline: true },
                  { name: "📝 Subject", value: data.subject },
                  { name: "💬 Message", value: data.message },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        },
      );

      setShowModal(true); // 👈 trigger modal
      e.target.reset(); // optional: clear form
    } catch (err) {
      console.error(err);
      alert("Failed to send");
    }
  };

  return (
    <section className="relative mt-35 rounded-xl bg-white text-black overflow-hidden mx-5 md:mx-15 sm:mx-15">
      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-8 text-center shadow-lg max-w-sm">
            <h3 className="text-xl font-semibold mb-3">🎉 Whoohoo!</h3>
            <p className="mb-6 text-gray-700">
              Your feedback has been submitted.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <img
        src="/connect.png"
        alt="Contact illustration"
        className="pointer-events-none absolute bottom-0 right-0 w-48 z-0"
      />

      <div className="relative z-10 max-w-2xl px-6 py-7 sm:px-12 sm:py-12 text-left">
        <h2 className="mb-8 text-2xl font-primary md:text-3xl sm:text-4xl sm:w-100">
          GET IN TOUCH WITH US
        </h2>

        <form className="space-y-6 font-secondary" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Input
                id="phone"
                type="tel"
                placeholder="+91472742747"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject<span className="text-red-500">*</span>
              </Label>
              <Input id="subject" placeholder="Enter the subject" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us how we can help you"
              className="min-h-[140px] resize-y bg-white text-lg md:text-xl"
              required
            />
          </div>

          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </section>
  );
};

export default Connect;
