import { Header } from "@/components/shared/Header";

async function getFleets() {
    const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://registry.veexplatform.com/api/v1";

    try {
        const res = await fetch(`${registryUrl}/admin/fleets`, {
            next: { revalidate: 30 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch fleets");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching fleets:", error);
        return [];
    }
}

export default async function FleetsPage() {
    const fleets = await getFleets();

    return (
        <div>
            <Header
                title="Fleets"
                description="Organize and manage device groups"
            />

            <div className="p-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {fleets.length === 0 ? (
                        <div className="col-span-full glass rounded-lg p-8 text-center">
                            <p className="text-slate-400">No fleets created yet</p>
                        </div>
                    ) : (
                        fleets.map((fleet: any) => (
                            <div key={fleet.id} className="glass rounded-lg p-6 hover:border-blue-500/50 cursor-pointer">
                                <h3 className="text-lg font-semibold text-white">{fleet.name}</h3>
                                <p className="mt-2 text-sm text-slate-400">{fleet.description || "No description"}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        {fleet.device_count || 0} devices
                                    </span>
                                    <span className="text-xs text-slate-600">
                                        ID: {fleet.id}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
