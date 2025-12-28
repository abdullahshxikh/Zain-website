import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-28">
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
