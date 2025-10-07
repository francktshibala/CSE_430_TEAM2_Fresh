import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer"; 
import { CartProvider } from "./context/CartContext";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
        <Header />
        <main className="page-content">{children}</main>
          <Footer />
        </CartProvider>  
      </body>
    </html>
  );
}
