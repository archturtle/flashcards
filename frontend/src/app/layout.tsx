import ScreenContainer from "@/components/ui/ScreenContainer";
import ReduxProvider from "@/store/Provider";
import { cn } from "@/utils/classNameMerge";
import type { Metadata } from "next";
import { Alegreya, Work_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/app/AuthProvider";
import { IconCardsFilled } from "@tabler/icons-react";

const alegreya = Alegreya({
  variable: "--font-alegreya",
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habit Square",
  description: "Simple habit tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-1198833545019540"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body
        className={cn(
          workSans.variable,
          alegreya.variable,
          "font-workSans font-alegreya antialiased",
        )}
      >
        <AuthProvider>
          <ReduxProvider>
            <ScreenContainer className="bg-base text-text flex flex-col items-center justify-between p-[2px] overflow-y-auto scrollbar-hide">
              <div className="flex flex-col item-center max-w-[600px] lg:max-w-[800px] w-full">
                <div className="flex items-center gap-2 w-full px-2">
                  <IconCardsFilled />
                  <h3 className="font-bold text-[24px] text-center">
                    Smart Cards
                  </h3>
                </div>
                {children}
              </div>
            </ScreenContainer>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
