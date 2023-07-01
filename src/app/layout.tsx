import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Roboto } from "next/font/google";
import { cn } from "@/utils/classNames";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "Scribble Art",
  description: "Scribble art ai art generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, "overflow-hidden")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
