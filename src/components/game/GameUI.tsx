import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface GameUIProps {
  score: number;
  timeLeft: number;
  spotlightEnergy: number;
  coins: number;
}

const GameUI: React.FC<GameUIProps> = ({ 
  score, 
  timeLeft, 
  spotlightEnergy = 100, 
  coins = 10 
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center p-4">
      <Card className="bg-curtain border-circus-gold p-4 min-w-[120px]">
        <div className="text-center">
          <div className="text-sm text-circus-gold font-semibold">APPLAUSE</div>
          <div className="text-2xl font-bold text-spotlight">{score}</div>
        </div>
      </Card>

      <Card className="bg-curtain border-circus-gold p-4 min-w-[120px]">
        <div className="text-center">
          <div className="text-sm text-circus-gold font-semibold">SHOWTIME</div>
          <div className="text-2xl font-bold text-spotlight">{formatTime(timeLeft)}</div>
        </div>
      </Card>

      <Card className="bg-curtain border-circus-gold p-4 min-w-[160px]">
        <div className="space-y-2">
          <div className="text-sm text-circus-gold font-semibold">SPOTLIGHT</div>
          <Progress 
            value={spotlightEnergy} 
            className="h-3"
            style={{
              background: 'hsl(var(--muted))',
            }}
          />
          <div className="text-xs text-spotlight">{Math.round(spotlightEnergy)}%</div>
        </div>
      </Card>

      <Card className="bg-curtain border-circus-gold p-4 min-w-[100px]">
        <div className="text-center">
          <div className="text-sm text-circus-gold font-semibold">COINS</div>
          <Badge variant="secondary" className="text-lg font-bold bg-circus-gold text-stage">
            {coins}
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default GameUI;