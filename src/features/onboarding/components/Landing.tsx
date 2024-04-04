import { Button } from '@/components/ui/Button';
import '@/styles/landing.css';

const Landing = () => {
  return (
    <div className="flex flex-col items-center bg-background h-full text-foreground gap-24">
      <Topbar />
      <Hero />
    </div>
  );
};

export default Landing;

const Topbar = () => {
  return (
    <nav className="flex justify-between w-full h-20 max-w-7xl items-center">
      <div className="left-nav">
        <div className="logo-container flex gap-4 h-10 w-auto">
          <img src="logo.svg" alt="app logo" className="w-full h-full" />
          <h1 className="font-bold text-3xl">EDUMAPS</h1>
        </div>
      </div>

      <ul className="flex gap-8 text-xl font-semibold">
        <li className="">Blog</li>
        <li className="">Solutions</li>
        <li className="">Gallery</li>
        <li className="">Log in</li>
      </ul>
    </nav>
  );
};

const Hero = () => {
  return (
    <main className="flex flex-col items-center relative overflow-hidden h-full">
      <div className="w-1/2 flex flex-col items-center">
        <h2 className="header text-center text-6xl font-bold leading-tight">
          <span className="text-gradient">Collaborative learning</span> with the power of flash
          cards
        </h2>
        <h3 className="text-center mb-8 text-lg">
          Nextion redefines collaborative learning by combining mind maps, flashcards, and
          discussion boards in one seamless, gamified experience.
        </h3>
        <Button className="w-min">Sign up today</Button>
      </div>

      <img
        src="landingImage.png"
        alt=""
        className="absolute -bottom-20 left-1/2 -translate-x-1/2"
      />
    </main>
  );
};
