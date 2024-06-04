import { cardSize } from "./paper-card";

export default function PlaceholderCard({
  size = "sm",
}: {
  size?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <div
      style={{
        width: `${cardSize[size]}px`,
        height: `${cardSize[size] * 1.3}px`,
      }}
      className="w-full bg-white shadow-md rounded-lg overflow-hidden"
    >
      <div className="animate-pulse">
        <div className="h-80 bg-gray-200 mb-10"></div>
        <div className="p-4">
          <div className="w-80 h-4 bg-gray-200 mb-2"></div>
          <div className="w-64 h-4 bg-gray-200 mb-2"></div>
        </div>
      </div>
    </div>
  );
}
