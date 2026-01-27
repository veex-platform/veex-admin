import { Header } from "@/components/shared/Header";

export const dynamic = "force-dynamic";

interface Campaign {
    id: string;
    name: string;
    fleet_id: string;
    version: string;
    status: string;
    created_at: string;
}

async function getCampaigns(): Promise<Campaign[]> {
    const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://registry.veexplatform.com/api/v1";

    try {
        const res = await fetch(`${registryUrl}/admin/ota/campaigns`, {
            next: { revalidate: 30 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch campaigns");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching campaigns:", error);
        return [];
    }
}

export default async function OTAPage() {
    const campaigns = await getCampaigns();

    return (
        <div>
            <Header
                title="OTA Campaigns"
                description="Manage over-the-air firmware updates"
            />

            <div className="p-8">
                <div className="space-y-4">
                    {campaigns.length === 0 ? (
                        <div className="glass rounded-lg p-8 text-center">
                            <p className="text-slate-400">No OTA campaigns yet</p>
                        </div>
                    ) : (
                        campaigns.map((campaign: Campaign) => (
                            <div key={campaign.id} className="glass rounded-lg p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                                        <p className="mt-1 text-sm text-slate-400">
                                            Fleet: {campaign.fleet_id} • Version: {campaign.version}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400">
                                            {campaign.status || "Pending"}
                                        </span>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {campaign.created_at}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
