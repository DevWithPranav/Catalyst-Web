import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SimpleCard = () => {
  return (
    <Card className="relative mx-auto bg-white text-black shadow-lg rounded-xl overflow-hidden">
      {/* SVG background */}
      <div className="absolute bottom-0 right-0 pointer-events-none z-0">
        <img src="bg.svg" alt="" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <CardHeader>
          <CardTitle className="text-xl font-bold font-primary leading-tight">
            GET IN TOUCH <br /> WITH US
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-8">
            <div>
              <Label className="font-extrabold">
                Full Name<span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Your Full Name"
                className="w-full border-[0.9px] border-[#E5E7EB] focus-visible:ring-0"
              />
            </div>

            <div>
              <Label className="font-extrabold">
                Email Address<span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                placeholder="john@icloud.com"
                className="w-full border-[0.9px] border-[#E5E7EB] focus-visible:ring-0"
              />
            </div>

            <div>
              <Label className="font-extrabold">
                Phone Number<span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                placeholder="+1234567890"
                className="w-full border-[0.9px] border-[#E5E7EB] focus-visible:ring-0"
              />
            </div>

            <div>
              <Label className="font-extrabold">
                Subject<span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Enter the Subject"
                className="w-full border-[0.9px] border-[#E5E7EB] focus-visible:ring-0 bg-white"
              />
            </div>

            <div>
              <Label className="font-extrabold">
                Message<span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Tell us how we can help you"
                className="w-full border-[0.9px] border-[#E5E7EB] focus-visible:ring-0 resize-none bg-white"
              />
            </div>

            <Button className="w-1/2 bg-black text-white font-extrabold hover:bg-black/80">
              Send Message
            </Button>
          </div>
        </CardContent>

        <CardFooter />
      </div>
    </Card>
  );
};

export default SimpleCard;
