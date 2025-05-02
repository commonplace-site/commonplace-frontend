import PageTitle from "@/components/page-title/PageTitle";
import { AirVent } from "lucide-react";
import Bubbles from "@/components/bubbles/Bubbles";

const bubbleData = [
    { id: '1', label: 'Room 127', colorFrom: '#492E7B', colorTo: '#332975', border: '#493680', href: '/' },
    { id: '2', label: 'i+1 Radio', colorFrom: '#2C5A9E', colorTo: '#1F3D68', border: '#28477A', href: '/i1-radio' },
    { id: '3', label: 'i+1 Media', colorFrom: '#2B7C6B', colorTo: '#1E5F58', border: '#265855', href: '/i1-media' },
    { id: '4', label: 'Shadowbank', colorFrom: '#8B5E3C', colorTo: '#5A3A21', border: '#6D4F30', href: '/shadowbank' },
];

export default function Shadowbank() {
    return (
        <div className="page">
            <PageTitle title="Garden" returnPage="Dashboard" returnPageHref="/" icon={<AirVent size={22} />} subtitle="A journey within, beyond liner paths" />
            <Bubbles bubbles={bubbleData} />
        </div>
    );
}