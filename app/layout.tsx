import React from "react";
import "./globals.css";

export const metadata = {
  title: "Classic TO-DO",
  description: "A TO-DO App that makes you WOW!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full h-full flex flex-col items-center">
        {children}
      </body>
    </html>
  );
}
