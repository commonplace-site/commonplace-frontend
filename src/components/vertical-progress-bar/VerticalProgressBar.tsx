type ProgressBarProps = {
  progress: number;
};

export default function VerticalProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="flex flex-col items-center justify-end h-full min-h-[120px]">
      <div className="relative h-full w-6 bg-[#E8F4FC] rounded-xl flex items-end overflow-hidden border border-[#B6DCF6] shadow-sm">
        <div
          className="absolute bottom-0 left-0 w-full bg-[#51A7E8] rounded-b-xl transition-all duration-300"
          style={{ height: `${progress}%` }}
        />
      </div>
      <span className="mt-2 text-base font-bold text-[#51A7E8] tracking-tight">{progress}%</span>
    </div>
  );
}