'use client';
import HeadsOrTailsGame from '@/components/games/HeadsOrTails';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeadsOrTailsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/games')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>

        {/* Game Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Heads or Tails</h1>
          <p className="text-muted-foreground">
            Flip a coin and double your money with a correct guess!
          </p>
        </div>

        {/* Game Component */}
        <HeadsOrTailsGame />
      </div>
    </div>
  );
} 