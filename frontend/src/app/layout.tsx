import AuthProvider from "@/app/AuthProvider";
import Profile from "@/components/Profile";
import ScreenContainer from "@/components/ui/ScreenContainer";
import ReduxProvider from "@/store/Provider";
import { cn } from "@/utils/classNameMerge";
import { IconCardsFilled } from "@tabler/icons-react";
import type { Metadata } from "next";
import { Alegreya, Work_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/store/react-query/QueryProvider";

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
  title: "Smart Cards",
  description: "Smart Flashcard App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1198833545019540" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            <QueryProvider>
              <ScreenContainer className="bg-base text-text flex flex-col items-center justify-between p-[2px] overflow-y-auto scrollbar-hide max-w-full">
                <div className="flex px-5 flex-col items-center max-w-[600px] lg:max-w-[800px] w-full flex-1 max-w-full gap-1">
                  <div className="flex items-center gap-2 w-full  justify-between py-[4px] border-b-[2px] border-b-text-base">
                    <div className="flex items-center gap-2">
                      <IconCardsFilled />
                      <h3 className="font-bold text-[24px] text-center">
                        Smart Cards
                      </h3>
                    </div>
                    <Profile className="px-[20px] py-[4px]" />
                  </div>
                  {children}
                </div>
              </ScreenContainer>
            </QueryProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
