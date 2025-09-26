import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GameControlsProps {
  onRestart: () => void;
  gameEnded: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ onRestart, gameEnded }) => {
  return (
    <Card className="bg-curtain border-circus-gold p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button 
          onClick={onRestart}
          className="bg-circus-red hover:bg-circus-red/80 text-white px-8 py-2"
        >
          🎪 New Game
        </Button>
        
        {gameEnded ? (
          <div className="text-center">
            <p className="text-spotlight text-sm font-semibold">
              Press R or SPACE to restart!
            </p>
          </div>
        ) : (
          <div className="text-center space-y-1">
            <p className="text-circus-gold text-sm font-semibold">Controls:</p>
            <p className="text-xs text-muted-foreground">← → Arrow keys to move • Stand over flowers to bloom</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GameControls;