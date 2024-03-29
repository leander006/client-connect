import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "@/store/providers";
import Navbar from "@/components/Navbar";



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
        <Navbar/>
          {children}
        </body>
      </Providers>
    </html>
  );
}
