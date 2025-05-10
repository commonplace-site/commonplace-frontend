'use client'

import { useUserStore } from "@/store/useUserStore"

const AvatarCircle = () => {
    const currentUser = useUserStore((store) => store.currentUser);
    return <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#9B87F5] text-white text-indigo-700 font-bold text-xl select-none">
        {currentUser?.username?.[0]?.toUpperCase() || "U"}
    </div>
}

export default AvatarCircle;