import Features from "../Components/Features";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import NotUserHeader from "../Components/NotUserHeader";


export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <NotUserHeader />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
