import "./globals.css";
import { Archivo_Black, Inter } from "next/font/google";
import SiteShell from "@/components/SiteShell";
const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
export const metadata = { title: "Donaben Limited | Fawde Diesel Generators", description: "Authorized Fawde generator dealer in Nigeria." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${display.variable} ${body.variable}`}><body className="font-sans antialiased"><SiteShell>{children}</SiteShell></body></html>);
}
