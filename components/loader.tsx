import { LuLoader2 } from "react-icons/lu";

function Loader({
  size = 80,
  color = "primary",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <LuLoader2 size={size} className={"animate-spin " + "text-" + color} />
  );
}

export default Loader;
