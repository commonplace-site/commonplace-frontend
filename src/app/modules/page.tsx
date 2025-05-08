import PageTitle from "@/components/common/page-title/PageTitle";
import { Library } from "lucide-react";
import Bubbles from "@/components/features/bubbles/Bubbles";

const bubbleData = [
    //{ id: '1', label: 'i+1 Radio', colorFrom: '#492E7B', colorTo: '#332975', border: '#493680', href: '/i1-radio' },
    { id: '2', label: 'Language Test', colorFrom: '#2C5A9E', colorTo: '#1F3D68', border: '#28477A', href: '/language-test' },
    //{ id: '3', label: 'i+1 Media', colorFrom: '#2B7C6B', colorTo: '#1E5F58', border: '#265855', href: '/i1-media' },
    { id: '4', label: 'Speaking Practice', colorFrom: '#8B5E3C', colorTo: '#5A3A21', border: '#6D4F30', href: '/speaking-practice' },
    //{ id: '5', label: 'Language Lab', colorFrom: '#3A506B', colorTo: '#5BC0BE', border: '#2D3E53', href: '/language-lab' },
];

export default function Modules() {
    return (
        <div className="page">
            <PageTitle title="Modules" returnPage="Dashboard" returnPageHref="/" icon={<Library size={22} />} subtitle="A journey within, beyond liner paths" />
            <Bubbles bubbles={bubbleData} />
        </div>
    );
}
