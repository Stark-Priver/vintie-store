import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata = {
  title: "Campus Vibes Media | Transforming Campus Experience",
  description: "Media, Tech & Innovation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-milk font-body text-ink">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
