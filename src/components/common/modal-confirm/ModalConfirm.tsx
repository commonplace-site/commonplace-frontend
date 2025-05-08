import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ModalConfirm({
    open,
    onClose,
    onConfirm,
    title = "Are you sure?",
    description = "",
    confirmLabel = "Confirm",
    children,
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmLabel?: string;
    children?: React.ReactNode;
}) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1533] border border-[#322945] p-6 text-white rounded-md shadow-xl modal">
                <DialogHeader>
                    <DialogTitle className="title">{title}</DialogTitle>
                </DialogHeader>

                <div className="mt-2">
                    {children ?? <p className="text-description">{description}</p>}
                </div>

                <DialogFooter className="gap-3 mt-6">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="commonplace-button"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="commonplace-button"
                    >
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
