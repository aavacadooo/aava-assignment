"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Newspaper,
  Compass,
  Target,
  Info,
  RefreshCw,
  Trophy,
  BookOpen,
  Layers,
} from "lucide-react";

const objects = [
  {
    id: "approval",
    name: "Taylor Swift",
    clue: `Swift by name and swift in fame,
She turns life's pages into song and name,
From moments lived, she weaves her art,
Echoes of life in every part.`,
    x: 12,
    y: 35,
    modulePath: "/objects/dummy-find.html",
  },
  {
    id: "compass",
    name: "Magnetic Compass",
    clue: `When seas were vast and maps were few,
A silent guide would point what's true.
No voice it speaks, yet shows the way,
Find the needle that will never stray.`,
    x: 32,
    y: 58,
    modulePath: "/objects/module1.html",
  },
  {
    id: "bluetooth",
    name: "Bluetooth",
    clue: `A Viking King's mark in a world without thread,
Binds the silent air where invisible signals are spread.
No silver wire nor iron chain, yet it links to the brain,
Seek the azure rune where the ghost-signals remain.`,
    x: 10,
    y: 54,
    modulePath: "/objects/module2.html",
  },
  {
    id: "internet",
    name: "Internet (Router)",
    clue: `A web is spun, yet no spider is near,
Messages travel both far and near.
Born in sixty-nine across the sea,
Find the network connecting you and me.`,
    x: 72,
    y: 12,
    modulePath: "/objects/module3 copy.html",
  },
  {
    id: "zero",
    name: "Zero",
    clue: `Born from nothing, yet shaping it all,
A silent symbol that answers the call.
In circles I live, both empty and whole,
Find me where numbers begin their role.`,
    x: 20,
    y: 84,
    modulePath: "/objects/module4_gazette.html",
  },
  {
    id: "penicillin",
    name: "Penicillium",
    clue: `From humble mold, a quiet fight grew,
An unseen hero the world never knew.
It wages war where sickness may dwell,
A tiny savior with stories to tell.`,
    x: 76,
    y: 86,
  },
  {
    id: "lightbulb",
    name: "Light Bulb",
    clue: `When darkness ruled the evening hour,
I brought the gift of glowing power.
A filament aglow with might,
I turned the night into the light.`,
    x: 47,
    y: 20,
  },
  {
    id: "automobile",
    name: "Automobile",
    clue: `Before my time, the horse was king,
But iron and steel changed everything.
Four wheels roll where hooves once tread,
A horseless carriage forging ahead.`,
    x: 58,
    y: 52,
  },
  {
    id: "globe",
    name: "Globe",
    clue: `A silver wanderer maps the Earth,
Showing lands of every birth.
Spin me round to see it all,
A world entire within a ball.`,
    x: 92,
    y: 39,
  },
];

export default function HiddenObjectGame() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [foundIds, setFoundIds] = useState<string[]>([]);

  const handleClick = (obj: any) => {
    const target = objects[current];

    if (obj.id === target.id) {
      if (!foundIds.includes(obj.id)) {
        setScore((prev) => prev + 10);
        setFoundIds((prev) => [...prev, obj.id]);
        setMessage(
          `Success! You found the ${obj.id === "approval" ? "song" : obj.name}`,
        );

        if (obj.modulePath) {
          setSelectedModule(obj.modulePath);
          setTimeout(() => setIsModalOpen(true), 1400);
        }

        setTimeout(() => {
          setMessage("");
          setCurrent((prev) => prev + 1);
        }, 1800);
      }
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setMessage("Search elsewhere...");
      setTimeout(() => setMessage(""), 1200);
    }
  };

  if (current >= objects.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1115] text-amber-50 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent opacity-50" />
        <div className="relative text-center p-12 rounded-4xl bg-stone-900/80 border-2 border-amber-500/20 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(251,191,36,0.3)] max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
            <Trophy className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-5xl font-serif font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-200">
            Mission Complete
          </h1>
          <p className="text-stone-400 mb-8 font-medium">
            Your archaeological persistence has paid off.
          </p>

          <div className="bg-stone-900/60 border border-white/5 rounded-3xl p-8 mb-8 backdrop-blur-xl">
            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.3em] mb-4">
              Historical Archive Accuracy
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-7xl font-mono font-bold text-white tracking-tighter">
                {score}
              </span>
              <span className="text-xl text-stone-500 font-medium">pts</span>
            </div>
          </div>

          <Button
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setFoundIds([]);
            }}
            size="lg"
            className="w-full h-14 rounded-2xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-lg shadow-[0_20px_40px_-15px_rgba(217,119,6,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Restart Expedition
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-stone-200 font-sans selection:bg-amber-500/30">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-[0.03]" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: UI & Controls */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <header className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest">
              <Compass className="w-3 h-3" />
              Research Phase I
            </div>
            <h1 className="text-4xl xl:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              The Inventor's{" "}
              <span className="text-amber-500 italic">Workshop</span>
            </h1>
            <p className="text-stone-500 font-medium">
              Uncover the catalysts of modern civilization.
            </p>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-900/60 border border-white/5 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between group overflow-hidden relative transition-all hover:border-amber-500/20">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Target className="w-20 h-20" />
              </div>
              <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest mb-1">
                Expedition Score
              </span>
              <span className="text-4xl font-mono font-bold text-white tracking-tighter">
                {score}
              </span>
            </div>
            <div className="bg-stone-900/60 border border-white/5 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between group overflow-hidden relative transition-all hover:border-amber-500/20">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Layers className="w-20 h-20" />
              </div>
              <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest mb-1">
                Discoveries
              </span>
              <span className="text-4xl font-mono font-bold text-white tracking-tighter">
                {current + 1}
                <span className="text-stone-600 text-xl mx-0.5">/</span>
                {objects.length}
              </span>
            </div>
          </div>

          <Card className="bg-stone-900/40 border-white/5 backdrop-blur-xl relative overflow-hidden rounded-3xl group transition-all hover:border-amber-500/20 border-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="px-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em]">
                  Current Objective
                </span>
              </div>
              <p className="text-2xl text-stone-100 leading-snug font-serif italic selection:bg-amber-500/40">
                &ldquo;{objects[current].clue}&rdquo;
              </p>
            </CardContent>
          </Card>

          <div className="mt-auto">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-stone-400 text-sm italic">
              <Info className="w-5 h-5 text-blue-400 shrink-0" />
              Click the hidden items in the workshop to advance your research
              quest.
            </div>
          </div>
        </div>

        {/* Right Column: Game Board */}
        <div className="lg:col-span-8">
          <div className="relative group/board">
            <div className="absolute -inset-4 bg-linear-to-br from-amber-500/5 to-blue-500/5 rounded-[2.5rem] blur-2xl opacity-50 group-hover/board:opacity-100 transition-opacity duration-700" />

            <div className="relative aspect-4/3 w-full rounded-4xl overflow-hidden border-12 border-stone-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] bg-stone-900 group/board-inner">
              <img
                src="/game-image.png"
                alt="Workshop View"
                className="w-full h-full object-cover transition-transform duration-2000 ease-out group-hover/board-inner:scale-105"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

              <TooltipProvider>
                <div className="absolute inset-0">
                  {objects.map((obj) => (
                    <Tooltip key={obj.id}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleClick(obj)}
                          disabled={
                            foundIds.includes(obj.id) &&
                            obj.id !== objects[current].id
                          }
                          className={`absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                            ${
                              foundIds.includes(obj.id)
                                ? "bg-emerald-500/20 border-emerald-500/50 cursor-default opacity-80 backdrop-blur-sm"
                                : "bg-transparent border-transparent hover:bg-amber-400/20 hover:border-amber-400/40 hover:scale-125 group-hover/board-inner:border-white/5"
                            }`}
                          style={{ top: `${obj.y}%`, left: `${obj.x}%` }}
                        >
                          {foundIds.includes(obj.id) ? (
                            <div className="animate-in fade-in zoom-in duration-500">
                              <Trophy className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            </div>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20 opacity-0 group-hover/board-inner:opacity-100 transition-opacity" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-stone-900 border-white/10 text-stone-200 font-serif italic py-1 px-3">
                        {foundIds.includes(obj.id)
                          ? obj.name
                          : "Strange Artifact"}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>

              {message && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div
                    className={`px-16 py-8 rounded-[3rem] border-4 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in slide-in-from-bottom-12 duration-500 flex flex-col items-center gap-6 min-w-90
                    ${
                      message.includes("Success")
                        ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-100"
                        : "bg-red-950/90 border-red-500/50 text-red-100"
                    }`}
                  >
                    <div className="p-3 rounded-full bg-white/5 border border-white/10">
                      {message.includes("Success") ? (
                        <Trophy className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                      ) : (
                        <Target className="w-12 h-12 text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]" />
                      )}
                    </div>
                    <span className="text-2xl font-serif font-bold tracking-widest uppercase italic text-center drop-shadow-md">
                      {message}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 flex flex-wrap gap-3 justify-center">
              {objects.map((obj, i) => (
                <Badge
                  key={obj.id}
                  variant={foundIds.includes(obj.id) ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all
                    ${
                      foundIds.includes(obj.id)
                        ? "bg-amber-500 text-stone-950 shadow-[0_5px_15px_-5px_rgba(245,158,11,0.4)]"
                        : "bg-stone-900/30 border-white/5 text-stone-600"
                    }`}
                >
                  {foundIds.includes(obj.id)
                    ? obj.name
                    : `Object #${String(i + 1).padStart(2, "0")}`}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[calc(100%-4rem)] sm:max-w-150! md:max-w-200! xl:max-w-300! sm:w-full p-0 overflow-hidden bg-background border border-border shadow-lg rounded-xl">
          <DialogHeader className="relative z-10 p-4 border-b border-border bg-muted/50 flex flex-row items-center justify-between backdrop-blur-sm">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Newspaper className="w-5 h-5 text-primary-foreground" />
              </div>
              The Innovation Gazette
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 w-full h-[70dvh] relative z-10 bg-transparent flex flex-col">
            <div className="flex-1 overflow-auto">
              {selectedModule && (
                <iframe
                  src={selectedModule}
                  className="w-full h-full border-none"
                  title="Innovation Gazette Content"
                />
              )}
            </div>

            <div className="p-4 border-t border-border bg-muted/50 backdrop-blur-md flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4 text-muted-foreground text-xs italic">
                <BookOpen className="w-4 h-4" />
                Innovation Gazette
              </div>
              <Button
                onClick={() => setIsModalOpen(false)}
                className="px-8 h-10 rounded-lg"
              >
                Close Archive
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
