/**
 * Backend API client utilities for VouchNFT.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export interface Vouch {
  id: string;
  skill: string;
  issuer: string;
  issueDate: string;
  metadataUri: string;
}

interface ListVouchesResponse {
  vouches: Vouch[];
}

export interface VerifyVouchRequest {
  wallet_address: string;
  github_username?: string;
  skill: string;
  metadata_uri?: string;
}

export interface VerifyVouchResponse {
  vouch_id: string;
  status: string;
  message: string;
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = new URL(endpoint, API_BASE_URL).toString();

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${body}`);
  }

  return (await response.json()) as T;
}

export async function verifyVouch(
  request: VerifyVouchRequest
): Promise<VerifyVouchResponse> {
  return apiRequest<VerifyVouchResponse>("/verify-vouch", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function getVouchStatus(vouchId: string): Promise<any> {
  return apiRequest(`/vouch/status`, {
    method: "POST",
    body: JSON.stringify({ vouch_id: vouchId }),
  });
}

export async function listVouches(walletAddress: string): Promise<ListVouchesResponse> {
  return apiRequest<ListVouchesResponse>("/vouches", {
    method: "POST",
    body: JSON.stringify({ wallet_address: walletAddress }),
  });
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
