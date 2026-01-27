import { Header } from "@/components/shared/Header";

async function getDevices() {
    const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://registry.veexplatform.com/api/v1";

    try {
        const res = await fetch(`${registryUrl}/admin/devices`, {
            next: { revalidate: 30 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch devices");
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching devices:", error);
        return [];
    }
}

export default async function DevicesPage() {
    const devices = await getDevices();

    return (
        <div>
            <Header
                title="Devices"
                description="Manage and monitor all registered industrial devices"
            />

            <div className="p-8">
                <div className="glass rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Device ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Version
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Last Seen
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {devices.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                        No devices registered yet
                                    </td>
                                </tr>
                            ) : (
                                devices.map((device: any) => (
                                    <tr key={device.id} className="hover:bg-slate-800/30">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-white">
                                            {device.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {device.version || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {device.last_seen || "Never"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400">
                                                Online
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
