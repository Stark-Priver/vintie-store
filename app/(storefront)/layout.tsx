import { Providers } from '@/context/providers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </Providers>
  );
}
