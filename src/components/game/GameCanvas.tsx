import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

interface GameCanvasProps {
  onScoreUpdate?: (score: number) => void;
  onTimeUpdate?: (time: number) => void;
}

class CircusScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private spotlight!: Phaser.GameObjects.Graphics;
  private flowers: Array<{
    sprite: Phaser.GameObjects.Rectangle;
    bloomMeter: number;
    type: 'common' | 'rare' | 'special';
    x: number;
    y: number;
    bloomed: boolean;
  }> = [];
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private gameTime = 60; // 60 seconds
  private score = 0;
  private spotlightEnergy = 100;
  private coins = 10;

  constructor() {
    super({ key: 'CircusScene' });
  }

  preload() {
    // Create colored rectangles as placeholders for sprites
    const playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0x8B4513);
    playerGraphics.fillRect(0, 0, 32, 32);
    playerGraphics.generateTexture('player', 32, 32);

    const commonFlowerGraphics = this.add.graphics();
    commonFlowerGraphics.fillStyle(0xFF69B4);
    commonFlowerGraphics.fillRect(0, 0, 24, 24);
    commonFlowerGraphics.generateTexture('flower_common', 24, 24);

    const rareFlowerGraphics = this.add.graphics();
    rareFlowerGraphics.fillStyle(0xFFD700);
    rareFlowerGraphics.fillRect(0, 0, 24, 24);
    rareFlowerGraphics.generateTexture('flower_rare', 24, 24);

    const specialFlowerGraphics = this.add.graphics();
    specialFlowerGraphics.fillStyle(0xFF1493);
    specialFlowerGraphics.fillRect(0, 0, 24, 24);
    specialFlowerGraphics.generateTexture('flower_special', 24, 24);
  }

  create() {
    // Stage background
    const stage = this.add.graphics();
    stage.fillStyle(0x1a0d2e);
    stage.fillRect(0, 0, 800, 600);

    // Curtains
    const leftCurtain = this.add.graphics();
    leftCurtain.fillStyle(0x8B0000);
    leftCurtain.fillRect(0, 0, 100, 600);

    const rightCurtain = this.add.graphics();
    rightCurtain.fillStyle(0x8B0000);
    rightCurtain.fillRect(700, 0, 100, 600);

    // Player (circus performer)
    this.player = this.add.rectangle(400, 500, 32, 32, 0x8B4513);

    // Spotlight
    this.spotlight = this.add.graphics();
    this.updateSpotlight();

    // Create flower plots
    this.createFlowerPlots();

    // Input
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Game timer
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });

    // Instructions
    this.add.text(120, 50, 'The Sacrifice Bloom', { 
      fontSize: '28px', 
      color: '#FFD700',
      fontFamily: 'serif'
    });

    this.add.text(120, 80, 'Move with arrow keys • Stand over flowers to bloom them', { 
      fontSize: '14px', 
      color: '#FFFFFF'
    });
  }

  private createFlowerPlots() {
    const plotPositions = [
      { x: 200, y: 450 }, { x: 300, y: 450 }, { x: 400, y: 450 },
      { x: 500, y: 450 }, { x: 600, y: 450 },
      { x: 250, y: 350 }, { x: 400, y: 350 }, { x: 550, y: 350 }
    ];

    plotPositions.forEach((pos, index) => {
      const flowerType = index < 3 ? 'common' : index < 6 ? 'rare' : 'special';
      const color = flowerType === 'common' ? 0x90EE90 : 
                   flowerType === 'rare' ? 0xFFD700 : 0xFF1493;
      
      const flower = this.add.rectangle(pos.x, pos.y, 24, 24, color);
      flower.setAlpha(0.3); // Start faded

      this.flowers.push({
        sprite: flower,
        bloomMeter: 0,
        type: flowerType,
        x: pos.x,
        y: pos.y,
        bloomed: false
      });
    });
  }

  private updateSpotlight() {
    this.spotlight.clear();
    
    // Spotlight beam
    this.spotlight.fillStyle(0xFFFFE0, 0.4);
    this.spotlight.fillCircle(this.player.x, this.player.y - 100, 80);
    
    // Intense center
    this.spotlight.fillStyle(0xFFFFE0, 0.8);
    this.spotlight.fillCircle(this.player.x, this.player.y - 100, 40);
  }

  private updateTimer() {
    this.gameTime--;
    
    // Emit time update to parent component
    if (this.scene.scene.game.events) {
      this.scene.scene.game.events.emit('timeUpdate', this.gameTime);
    }

    if (this.gameTime <= 0) {
      this.endGame();
    }
  }

  private endGame() {
    // Count bloomed flowers
    const bloomedFlowers = this.flowers.filter(f => f.bloomed);
    this.score = bloomedFlowers.reduce((total, flower) => {
      const points = flower.type === 'common' ? 10 : 
                    flower.type === 'rare' ? 25 : 50;
      return total + points;
    }, 0);

    // Show final score
    const finalText = this.add.text(400, 300, 
      `Curtain Rises!\nAudience Applause: ${this.score} points\n\nPress R to restart`, {
      fontSize: '24px',
      color: '#FFD700',
      align: 'center',
      fontFamily: 'serif'
    });
    finalText.setOrigin(0.5);

    // Emit score to parent
    if (this.scene.scene.game.events) {
      this.scene.scene.game.events.emit('scoreUpdate', this.score);
    }

    // Restart on R key
    this.input.keyboard!.on('keydown-R', () => {
      this.scene.restart();
    });
  }

  update() {
    if (this.gameTime <= 0) return;

    // Player movement
    if (this.cursors.left.isDown) {
      this.player.x = Math.max(120, this.player.x - 3);
    } else if (this.cursors.right.isDown) {
      this.player.x = Math.min(680, this.player.x + 3);
    }

    // Update spotlight position
    this.updateSpotlight();

    // Check flowers in spotlight
    this.flowers.forEach(flower => {
      if (flower.bloomed) return;

      const distance = Phaser.Math.Distance.Between(
        this.player.x, this.player.y - 100,
        flower.x, flower.y
      );

      if (distance < 60 && this.spotlightEnergy > 0) {
        // Flower is in spotlight
        flower.bloomMeter += 2;
        this.spotlightEnergy -= 0.5;

        // Update flower appearance
        const alpha = 0.3 + (flower.bloomMeter / 100) * 0.7;
        flower.sprite.setAlpha(alpha);

        if (flower.bloomMeter >= 100) {
          flower.bloomed = true;
          flower.sprite.setAlpha(1);
          // Add bloom effect
          const bloomEffect = this.add.graphics();
          bloomEffect.fillStyle(0xFFD700, 0.6);
          bloomEffect.fillCircle(flower.x, flower.y, 35);
          this.time.delayedCall(500, () => bloomEffect.destroy());
        }
      }
    });

    // Auto-recharge spotlight slowly
    if (this.spotlightEnergy < 100) {
      this.spotlightEnergy += 0.1;
    }
  }
}

const GameCanvas: React.FC<GameCanvasProps> = ({ onScoreUpdate, onTimeUpdate }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGame = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current,
        backgroundColor: '#1a0d2e',
        scene: CircusScene,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
          }
        }
      };

      phaserGame.current = new Phaser.Game(config);

      // Listen for game events
      phaserGame.current.events.on('scoreUpdate', (score: number) => {
        onScoreUpdate?.(score);
      });

      phaserGame.current.events.on('timeUpdate', (time: number) => {
        onTimeUpdate?.(time);
      });
    }

    return () => {
      if (phaserGame.current) {
        phaserGame.current.destroy(true);
        phaserGame.current = null;
      }
    };
  }, [onScoreUpdate, onTimeUpdate]);

  return (
    <div 
      ref={gameRef} 
      className="border-4 border-circus-gold rounded-lg shadow-spotlight mx-auto"
      style={{
        background: 'var(--gradient-stage)',
      }}
    />
  );
};

export default GameCanvas;