'use client'

import Chonger from "@/components/chonger/Chonger";
import PageTitle from "@/components/page-title/PageTitle";

const UnusedComponents = () => {
    return <div className="page">
        <PageTitle title="Chonger" />
        <section className="mb-8">
            <Chonger />
        </section>
    </div>
}

export default UnusedComponents;