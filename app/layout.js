import "@/app/globals.css";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "My Portfolio",
  description: "A portfolio showcasing my projects and skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
