export type NotifyCatPayload = {
	id: string;
	discoveredAt?: string;
	discoveredDate?: string;
	[key: string]: unknown;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9988";

export async function notifyCatDetected(payload: NotifyCatPayload) {
	const url = `${API_BASE}/cat/detact-cat/${encodeURIComponent(payload.id)}`;

	// Use POST to be explicit about state change; include payload in body
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});

	if (!res.ok) {
		const text = await res.text().catch(() => "<no body>");
		const err = new Error(`notifyCatDetected failed: ${res.status} ${text}`);
		// attach response for debugging in a typed manner
		type BackendError = Error & { status?: number; body?: string };
		const berr = err as BackendError;
		berr.status = res.status;
		berr.body = text;
		throw berr;
	}

	return res.json().catch(() => null);
}

const catService = { notifyCatDetected };
export default catService;
