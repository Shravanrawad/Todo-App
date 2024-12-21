import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/redux-provider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo-App",
  description: "Manage your task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReduxProvider>
          <Header/>
          <main className='h-full'>
          {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
