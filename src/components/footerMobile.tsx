import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Youtube } from "lucide-react";
const FooterMobile = () => {
  return (
    <div
      className="mx-7 mt-24 mb-7 relative p-[1px] rounded-2xl
      bg-[linear-gradient(50deg,rgba(255,255,255,0.6),rgba(255,255,255,0),rgba(255,255,255,0.6))]"
    >
      <Card className="rounded-2xl bg-gradient-to-b from-[#1D1D1D] to-[#0B0B0B] text-white shadow-none">
        <CardContent className="p-12 flex flex-col gap-8">
          <p className="text-xl">Home</p>
          <p className="text-xl">Events</p>

          <p className="text-xl">Execom</p>
          <div className="ml-16 flex flex-col gap-2 text-lg text-muted-foreground">
            <p>Execom</p>
            <p>Achievements</p>
          </div>

          <p className="text-xl">Achievements</p>
          <p className="text-xl">Legacy</p>

          <p className="text-xl">More</p>
          <div className="ml-16 mb-5 flex flex-col gap-2 text-lg text-muted-foreground">
            <p>Web Workforce</p>
            <p>Gallery</p>
          </div>

          <div className="flex gap-4 justify-between">
            <img src="Discord.svg" alt="Discord" />
            <img src="Instagram.svg" alt="Instagram" />
            <img src="Linkedin.svg" alt="Linkedin" />
            <Youtube />
          </div>
        </CardContent>

        <CardFooter className="justify-center text-sm text-center text-muted-foreground">
          All Rights Reserved © Catalyst IEDC 2025
        </CardFooter>
      </Card>
    </div>
  );
};

export default FooterMobile;
