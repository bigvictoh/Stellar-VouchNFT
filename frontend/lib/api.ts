/**
 * Backend API client utilities
 * 
 * # TODO
 * - Implement proper error handling
 * - Add request/response logging
 * - Add retry logic
 * - Implement rate limiting
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

/**
 * Generic API request wrapper
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(endpoint, API_BASE_URL).toString();
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error);
    throw error;
  }
}

/**
 * Verify and mint a vouch NFT
 * 
 * # TODO
 * - Add request validation
 * - Add timeout handling
 */
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

export async function verifyVouch(
  request: VerifyVouchRequest
): Promise<VerifyVouchResponse> {
  return apiRequest<VerifyVouchResponse>("/verify-vouch", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/**
 * Query vouch status
 * 
 * # TODO
 * - Complete implementation
 */
export async function getVouchStatus(vouchId: string): Promise<any> {
  return apiRequest(`/vouch/status`, {
    method: "POST",
    body: JSON.stringify({ vouch_id: vouchId }),
  });
}

/**
 * List all vouches for a wallet
 * 
 * # TODO
 * - Complete implementation
 */
export async function listVouches(walletAddress: string): Promise<any> {
  return apiRequest(`/vouches`, {
    method: "POST",
    body: JSON.stringify({ wallet_address: walletAddress }),
  });
}

/**
 * Health check endpoint
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
