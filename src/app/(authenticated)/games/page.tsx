'use client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import Image from "next/image";

interface Game {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  path: string;
  stats?: {
    totalPlayed: number;
    maxWin: number;
  };
}

const games: Game[] = [
  {
    id: 'heads-or-tails',
    title: 'Heads or Tails',
    description: 'Classic coin flip game. Double your money with a correct guess!',
    imageSrc: '/heads.png',
    path: '/games/heads-or-tails',
    stats: {
      totalPlayed: 1234,
      maxWin: 100,
    }
  },
  {
    id: 'gumball-machine',
    title: 'Gun Gumball Machine',
    description: 'Insert 25¢ and get a random gun! What will you get?',
    imageSrc: '/gumball.png',
    path: '/games/gumball-machine',
    stats: {
      totalPlayed: 567,
      maxWin: 25,
    }
  }
];

export default function GamesLobby() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
          <p className="text-muted-foreground text-lg">Test your luck and win big!</p>
        </div>

        {/* Featured Game */}
        <div className="max-w-md mx-auto">
          {games.map((game) => (
            <Card 
              key={game.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Game Image */}
              <div className="relative w-full h-64">
                <Image
                  src={game.imageSrc}
                  alt={game.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{game.title}</CardTitle>
                <CardDescription className="text-lg">{game.description}</CardDescription>
              </CardHeader>

              <CardContent>
                {game.stats && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      <span>Played: {game.stats.totalPlayed.toLocaleString()}</span>
                    </div>
                    <div>Max Win: ${game.stats.maxWin.toLocaleString()}</div>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full text-lg py-6" 
                  onClick={() => router.push(game.path)}
                  size="lg"
                >
                  Play Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}