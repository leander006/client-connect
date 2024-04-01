
import { Toaster } from "react-hot-toast";
import "../globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar/>
            {children}
        </>
  );
}
