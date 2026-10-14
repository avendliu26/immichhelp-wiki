// HTTP observations narrow the next check; they do not establish file loss or a root cause.
export const requestEvidenceOptions = [
  { value: 'unknown', label: 'Not checked — use the symptom guide' },
  { value: '401', label: '401 — authentication required' },
  { value: '403', label: '403 — request refused' },
  { value: '404', label: '404 — resource not found' },
  { value: '429', label: '429 — too many requests' },
  { value: '5xx', label: '5xx — server or gateway error' },
  { value: 'network', label: 'No HTTP response — connection or browser error' },
  { value: '2xx', label: '2xx — response received, image still unusable' },
  { value: 'other', label: 'Another status or unexpected redirect' },
] as const;

export type RequestEvidence = typeof requestEvidenceOptions[number]['value'];

type RequestGuidance = { title: string; nextCheck: string; caution: string };

export const requestGuidance: Record<Exclude<RequestEvidence, 'unknown'>, RequestGuidance> = {
  '401': {
    title: 'Check the session before storage',
    nextCheck: 'Open the intended server web app and sign in again with an account allowed to view this asset. Retry that same image request. If a proxy adds authentication, compare its access log with the Immich log.',
    caution: 'An authentication response does not establish whether an original file exists. Keep authentication enabled.',
  },
  '403': {
    title: 'Check which layer refused access',
    nextCheck: 'Confirm the account can access this asset and review proxy access rules. Match the request time to logs to identify which layer refused it.',
    caution: 'An HTTP refusal is not evidence of filesystem permissions. Do not change disk ownership or disable access controls based on this status.',
  },
  '404': {
    title: 'Distinguish the request path from the file path',
    nextCheck: 'Reopen the asset from the current web app instead of a saved image URL. If you already have trusted local access, compare the same request locally and publicly, then match its time to server and proxy logs.',
    caution: 'A 404 does not prove an original was deleted. Check storage only when the matching log or integrity finding identifies a file path. Immich requires a domain root, not an /immich subpath.',
  },
  '429': {
    title: 'Pause repeated requests',
    nextCheck: 'Wait for Retry-After when the response provides it. Stop repeated reloads and identify the rate-limiting layer in the matching logs before retesting once.',
    caution: 'A request limit is not evidence of damaged media. Do not launch more processing jobs to address it.',
  },
  '5xx': {
    title: 'Match the response to service logs',
    nextCheck: 'At the same time as the failing request, inspect server and proxy logs and service state. Record the exact code; a 500, 502, 503 or 504 can point to different checks.',
    caution: 'The status alone cannot distinguish a storage error, unavailable upstream or timeout. Preserve the first relevant error before restarting services.',
  },
  network: {
    title: 'Establish a connection first',
    nextCheck: 'Record the browser error. Check the intended hostname, network/VPN, DNS and TLS certificate. Compare another trusted client or an already configured local route.',
    caution: 'No HTTP response is not a missing-file finding. Do not bypass certificate validation, disable browser security or expose a new public port as a test.',
  },
  '2xx': {
    title: 'Check what the response actually contains',
    nextCheck: 'Inspect the content type and response body locally: is it the expected image, a sign-in page or another response? Compare one known-good asset. If the response is media but cannot display, inspect the matching decoder and thumbnail-job errors.',
    caution: 'A successful HTTP status does not prove the response contains a usable image or that the original is intact. Do not upload private response bodies to a public issue.',
  },
  other: {
    title: 'Capture the exact response before choosing a repair',
    nextCheck: 'Record the exact status and request time. Inspect any redirect destination privately and compare the request with server and proxy logs. Confirm you selected the image GET or original-download request, not an upload or unrelated API call.',
    caution: 'Do not apply upload-size fixes to an image download without matching evidence. Redact tokens and private URLs before sharing details.',
  },
};
