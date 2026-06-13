import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function AvisClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <NavBar />
        {children}
        <Footer/>
      </div>
    );
}
