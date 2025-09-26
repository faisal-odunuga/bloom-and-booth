import { useState } from 'react';
import GameCanvas from '@/components/game/GameCanvas';
import GameUI from '@/components/game/GameUI';
import GameInstructions from '@/components/game/GameInstructions';
import { Button } from '@/components/ui/button';
import circusHero from '@/assets/circus-hero.jpg';

const Index = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-stage text-foreground">
      {/* Header */}
      <header className="relative bg-gradient-curtain p-6 border-b-4 border-circus-gold overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${circusHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-spotlight mb-2" 
              style={{ textShadow: 'var(--glow)' }}>
            🎪 The Sacrifice Bloom 🎪
          </h1>
          <p className="text-circus-gold text-lg md:text-xl font-semibold">
            A Mario-Style Circus Garden Adventure
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Instructions Toggle */}
        <div className="text-center">
          <Button 
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-circus-purple hover:bg-circus-purple/80 text-white"
          >
            {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
          </Button>
        </div>

        {/* Instructions */}
        {showInstructions && <GameInstructions />}

        {/* Game UI */}
        <GameUI 
          score={score}
          timeLeft={timeLeft}
          spotlightEnergy={100}
          coins={10}
        />

        {/* Game Canvas */}
        <div className="flex justify-center">
          <GameCanvas 
            onScoreUpdate={setScore}
            onTimeUpdate={setTimeLeft}
          />
        </div>

        {/* Footer */}
        <footer className="text-center py-8 space-y-2">
          <p className="text-circus-gold font-semibold">
            🌟 Master the art of sacrifice and bloom magnificent flowers! 🌟
          </p>
          <p className="text-muted-foreground text-sm">
            Move with arrow keys • Stand over flowers to bloom them • Choose wisely!
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
