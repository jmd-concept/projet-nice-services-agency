import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function BlogActualiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
   <div>
     <NavBar />
     <main className="my-16">{children}</main>
     <Footer />
   </div>
 );
}
