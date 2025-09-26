import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GameInstructions = () => {
  return (
    <Card className="bg-gradient-to-br from-curtain to-stage p-6 border-circus-gold max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-circus-gold mb-4 text-center">
        🎪 How to Play The Sacrifice Bloom 🎪
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Badge className="bg-circus-purple text-white min-w-[24px] h-6 flex items-center justify-center">1</Badge>
            <div>
              <h3 className="font-semibold text-spotlight">Movement</h3>
              <p className="text-sm text-muted-foreground">Use arrow keys ← → to move your circus performer across the stage</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Badge className="bg-circus-purple text-white min-w-[24px] h-6 flex items-center justify-center">2</Badge>
            <div>
              <h3 className="font-semibold text-spotlight">Spotlight Control</h3>
              <p className="text-sm text-muted-foreground">Your spotlight follows you. Stand over flowers to charge their bloom meter</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Badge className="bg-circus-purple text-white min-w-[24px] h-6 flex items-center justify-center">3</Badge>
            <div>
              <h3 className="font-semibold text-spotlight">The Sacrifice Rule</h3>
              <p className="text-sm text-muted-foreground">You can't bloom all flowers! Choose wisely - some must be sacrificed</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Badge className="bg-circus-gold text-stage min-w-[24px] h-6 flex items-center justify-center">🌸</Badge>
            <div>
              <h3 className="font-semibold text-spotlight">Flower Types</h3>
              <p className="text-sm text-muted-foreground">
                <span className="text-circus-green">Common (10 pts)</span> • 
                <span className="text-circus-gold"> Rare (25 pts)</span> • 
                <span className="text-circus-purple"> Special (50 pts)</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Badge className="bg-circus-gold text-stage min-w-[24px] h-6 flex items-center justify-center">⏰</Badge>
            <div>
              <h3 className="font-semibold text-spotlight">Race Against Time</h3>
              <p className="text-sm text-muted-foreground">Bloom flowers before the curtain rises! Higher scores = bigger applause</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Badge className="bg-circus-gold text-stage min-w-[24px] h-6 flex items-center justify-center">💡</Badge>
            <div>
              <h3 className="font-semibold text-spotlight">Energy Management</h3>
              <p className="text-sm text-muted-foreground">Spotlight energy drains while blooming. It recharges slowly over time</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-stage rounded-lg border border-circus-gold">
        <p className="text-center text-spotlight font-semibold">
          🎭 Remember: In the circus, sacrifice creates beauty. Choose your blooms wisely! 🎭
        </p>
      </div>
    </Card>
  );
};

export default GameInstructions;