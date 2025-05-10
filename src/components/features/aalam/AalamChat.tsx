'use client'

import AvatarCircle from "@/components/common/user/AvatarCircle";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { RefreshCcw, Copy, Send } from "lucide-react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
    id: string;
    user: string;
    message: string;
};


export default function AalamChat() {
    const [messages, setMessages] = useState<Message[]>([{
        id: uuidv4(),
        user: "aalam",
        message: "Hello, I'm Aalam!",
    }]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const currentUser = useUserStore((store) => store.currentUser);
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (!inputMessage.trim()) return;

        const newMessage: Message = {
            id: uuidv4(),
            user: currentUser?.username || "anonymous",
            message: inputMessage.trim(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }, 0);
          
        setInputMessage("");

        handleAnswer();
    };

    const handleAnswer = () => {
        const reply: Message = {
            id: uuidv4(),
            user: "aalam",
            message: "Hello, I'm Aalam!",
        };

        setMessages((prev) => [...prev, reply]);
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
          }, 0);
          
    };

    return (
        <div className="w-full text-white">
            <div className="subtitle">Chat with Aalam</div>
            <div className="container flex flex-col justify-between h-[450px] overflow-hidden">
                <div className="flex w-full items-center">
                    <div className="ml-auto flex gap-2 mb-2">
                        <button onClick={() => setMessages([])} className="cursor-pointer text-white/60 hover:text-white">
                            <RefreshCcw size={16} />
                        </button>
                        <button className="cursor-pointer text-white/60 hover:text-white">
                            <Copy size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-2">
                    {messages.map(({ id, user, message }) => {
                        const isUser = user !== "aalam";
                        return (
                            <div key={id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${isUser
                                            ? "bg-blue-500 text-white rounded-br-none"
                                            : "bg-[#2B1A55] text-white rounded-bl-none"
                                            }`}
                                    >
                                        {message}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        );
                    })}
                    <div ref={bottomRef} />
                </div>


                <div className="p-4 border-t border-[#2B1A55] flex items-center gap-2">
                    <AvatarCircle />
                    <input
                        type="text"
                        value={inputMessage}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && inputMessage.trim()) handleSend();
                        }}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 bg-black/80 text-white rounded-md border border-[#322945] placeholder:text-[#8E82A1] focus:outline-none"
                    />
                    <Button
                        onClick={handleSend}
                        className="cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md transition"
                    >
                        <Send size={16} />
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}
