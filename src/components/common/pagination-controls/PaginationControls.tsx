interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationControls = ({ currentPage, totalPages, onPageChange }: Props) => {
    const safePage = Math.max(currentPage, 0);
    const safeTotal = Math.max(totalPages, 0);

    return (
        <div className="flex justify-end items-center h-full gap-2">
            <button
                className="commonplace-button"
                disabled={safePage <= 1}
                onClick={() => onPageChange(safePage - 1)}
            >
                Prev
            </button>
            <span className="text-description text-sm">
                Page {safeTotal === 0 ? 0 : safePage} of {safeTotal}
            </span>
            <button
                className="commonplace-button"
                disabled={safePage >= safeTotal}
                onClick={() => onPageChange(safePage + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default PaginationControls;