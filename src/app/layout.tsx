import "./globals.css";
import { Roboto } from "next/font/google";

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
