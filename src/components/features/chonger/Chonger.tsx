"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChongerStore } from "@/store/useChongerStore";

function WordWithTooltip({ char, ignoredChars }: { char: string; ignoredChars: string[] }) {
    if (ignoredChars.includes(char)) return <span>{char}</span>;
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span className="cursor-pointer fill-[#DFE7FF] text-[#a2b5eb] underline underline-offset-4 hover:text-indigo-700 text-xl mr-1">
                    {char}
                </span>
            </TooltipTrigger>
            <TooltipContent>
                <div className="font-bold mb-1 text-center text-2xl">{char}</div>
                <div>Character info (stub)</div>
            </TooltipContent>
        </Tooltip>
    );
}

export default function Chonger() {
    const [input, setInput] = useState("");
    const [showResults, setShowResults] = useState(true);
    const [showGrammar, setShowGrammar] = useState(true);
    const [showIPlusOne, setShowIPlusOne] = useState(true);

    const sentences = useChongerStore((store) => store.sentences);
    const ignoredChars = useChongerStore((store) => store.ignoredChars);

    const handleTransform = () => {
        if (input.trim()) setShowResults(true);
    };

    return (
        <div className="w-full">
            <h4 className="subtitle">Linguistic Patterns</h4>
            <div className="container">
                <div className="w-full space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                        <Input
                            type="text"
                            placeholder="Enter a sentence..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            className="w-full sm:w-1/2 text-lg"
                        />
                        <Button
                            onClick={handleTransform}
                            disabled={!input.trim()}
                            className="px-6 py-2 rounded-xl"
                        >
                            View Similar Sentence
                        </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 w-full">
                        <label className="flex items-center space-x-2">
                            <Checkbox
                                checked={showGrammar}
                                onCheckedChange={val => setShowGrammar(!!val)}
                            />
                            <span className="dark:fill-[#DFE7FF] dark:text-[#a2b5eb]">Show Grammar Focus</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <Checkbox
                                checked={showIPlusOne}
                                onCheckedChange={val => setShowIPlusOne(!!val)}
                            />
                            <span className="dark:fill-[#DFE7FF] dark:text-[#a2b5eb]">Apply i+1 Vocabulary</span>
                        </label>
                    </div>
                </div>
                {showResults && (
                    <TooltipProvider>
                        <div className="mt-8">
                            <h2 className="subtitle">Similar Sentences</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                {sentences.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="border dark:border-[#323378] dark:bg-[#271A4F] rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition flex flex-col"
                                    >
                                        <div className="flex flex-wrap items-center mb-2">
                                            {item.sentence.split("").map((char, charIdx) => (
                                                <WordWithTooltip key={charIdx} char={char} ignoredChars={ignoredChars} />
                                            ))}
                                        </div>
                                        {item.note && (
                                            <div className="text-sm dark:fill-[#DFE7FF] dark:text-[#a2b5eb] text-gray-500 mb-2">{item.note}</div>
                                        )}
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {item.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="inline-block text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full border border-indigo-200"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {showGrammar && item.grammar && (
                                            <div className="flex items-start gap-2 bg-indigo-50 border-l-4 border-indigo-400 rounded-lg px-3 py-2 text-indigo-900 text-sm shadow-sm mt-auto">
                                                <span className="font-semibold">Grammar focus:</span>
                                                <span>{item.grammar}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {showIPlusOne && (
                                <div className="mt-8">
                                    <h2 className="subtitle">i+1 Sentences</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                        {sentences.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="border dark:border-[#323378] dark:bg-[#271A4F] rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition flex flex-col"
                                            >
                                                <div className="flex flex-wrap items-center mb-2">
                                                    {item.iPlusOne.split("").map((char, charIdx) => (
                                                        <WordWithTooltip key={charIdx} char={char} ignoredChars={ignoredChars} />
                                                    ))}
                                                </div>
                                                {item.note && (
                                                    <div className="text-sm dark:fill-[#DFE7FF] dark:text-[#a2b5eb] text-gray-500 mb-2">{item.note}</div>
                                                )}
                                                {showGrammar && item.iPlusOneGrammar && (
                                                    <div className="flex items-start gap-2 bg-indigo-50 border-l-4 border-indigo-400 rounded-lg px-3 py-2 text-indigo-900 text-sm shadow-sm mt-auto">
                                                        <span className="font-semibold">Grammar focus:</span>
                                                        <span>{item.iPlusOneGrammar}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </TooltipProvider>
                )}
            </div>
        </div>
    );
}