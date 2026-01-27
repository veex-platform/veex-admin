export function Header({ title, description }: { title: string; description?: string }) {
    return (
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <div className="px-8 py-6">
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-slate-400">{description}</p>
                )}
            </div>
        </div>
    );
}
