import { Inter } from "next/font/google";
import "./globals.css";
// app/layout.js or app/layout.tsx
import "@fontsource/karma"; // Defaults to weight 400
import "@fontsource/karma/400.css"; // Specific weight
import "@fontsource/karma/500.css"; // Add other weights as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Village Family",
  description: "Generated by NSRGFX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
