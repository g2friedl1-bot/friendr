type UserCardProps = {
  name: string;
  quote: string;
  avatar?: string;
};

export default function UserCard({ name, quote }: UserCardProps) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-violet-900/40 border border-violet-700/50 hover:border-fuchsia-500/50 transition-colors">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg">
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white mb-1">{name}</p>
        <p className="text-sm text-violet-200/90 italic">&ldquo;{quote}&rdquo;</p>
      </div>
    </div>
  );
}
