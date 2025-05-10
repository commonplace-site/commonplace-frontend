import PageTitle from "@/components/common/page-title/PageTitle";
import AalamChat from "@/components/features/aalam/AalamChat";
import { Brain } from "lucide-react";

const Aalam = () => {
    return <div className="page">
        <PageTitle title="Aalam Interaction" icon={<Brain size={22} />} returnPage="Dashboard" returnPageHref="/" subtitle="Engage in reflective conversations with Aalam, your AI" />
        <section>
            <AalamChat />
        </section>
    </div>
}

export default Aalam;