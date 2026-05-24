type Props = {
  visible?: boolean;
};

export function Watermark({
  visible = true,
}: Props) {
  if (!visible) return null;

  return (
    <div className="
      absolute
      bottom-3
      right-3
      z-50
      pointer-events-none
      select-none
      rounded-md
      bg-black/40
      px-2
      py-1
      text-xs
      text-white/80
      backdrop-blur-sm
    ">
      Powered by Configraph
    </div>
  );
}