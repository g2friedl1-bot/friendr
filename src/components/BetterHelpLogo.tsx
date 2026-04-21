export default function BetterHelpLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Speech bubble body */}
      <rect x="2" y="4" width="40" height="30" rx="8" fill="#5C6BC0" />
      {/* Bubble tail */}
      <path d="M10 34 L6 44 L20 34Z" fill="#5C6BC0" />
      {/* "bh" text mark */}
      <text
        x="22"
        y="25"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        bh
      </text>
    </svg>
  );
}
