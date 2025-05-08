import { JSX } from "react"

const StepNavigation = ({ page, setPage, totalPages }: { page: number, setPage: (page: number) => void, totalPages: number }): JSX.Element => {
    return <section className="flex items-center justify-center gap-4 mt-4">
        <button
            className="commonplace-button"
            disabled={page <= 1}
            style={{
                cursor: page <= 1 ? "not-allowed" : "pointer",
                opacity: page <= 1 ? 0.5 : 1,
            }}
            onClick={() => setPage(page - 1)}
        >
            Previous
        </button>

        <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
                <span
                    key={index}
                    className={`w-3 h-3 rounded-full ${page === index + 1 ? "bg-[#8EA5FF]" : "bg-[#6F6892]"} `}
                />
            ))}
        </div>

        <button
            className="commonplace-button"
            disabled={page >= totalPages}
            style={{
                cursor: page >= totalPages ? "not-allowed" : "pointer",
                opacity: page >= totalPages ? 0.5 : 1,
            }}
            onClick={() => setPage(page + 1)}
        >
            Next
        </button>
    </section>
}

export default StepNavigation;