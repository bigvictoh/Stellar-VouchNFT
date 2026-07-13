use axum::{
    extract::{Json, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use std::time::{SystemTime, UNIX_EPOCH};
use tower_http::cors::CorsLayer;
use tracing::{error, info};

pub struct AppState {
    vouches: Mutex<Vec<VouchRecord>>,
    next_vouch_id: Mutex<u32>,
}

#[derive(Debug, Serialize, Clone)]
pub struct VouchRecord {
    pub vouch_id: String,
    pub wallet_address: String,
    pub skill: String,
    pub issuer: String,
    pub metadata_uri: String,
    pub issue_date: String,
    pub status: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct VerifyVouchRequest {
    pub wallet_address: String,
    pub github_username: Option<String>,
    pub skill: String,
    pub metadata_uri: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct VerifyVouchResponse {
    pub vouch_id: String,
    pub status: String,
    pub message: String,
}

#[derive(Debug, Serialize)]
pub struct ListVouchesResponse {
    pub vouches: Vec<VouchRecord>,
}

#[derive(Debug, Serialize)]
pub struct VouchStatusResponse {
    pub vouch_id: String,
    pub status: String,
    pub message: String,
}

async fn health_check() -> impl IntoResponse {
    info!("Health check endpoint called");
    (StatusCode::OK, "VouchNFT Backend is running ✓")
}

async fn verify_vouch(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<VerifyVouchRequest>,
) -> Result<(StatusCode, Json<VerifyVouchResponse>), (StatusCode, String)> {
    info!(
        wallet = %payload.wallet_address,
        skill = %payload.skill,
        "Verify vouch request received"
    );

    if payload.wallet_address.trim().is_empty() || payload.skill.trim().is_empty() {
        error!("Invalid input: wallet_address or skill is empty");
        return Err((
            StatusCode::BAD_REQUEST,
            "wallet_address and skill are required".to_string(),
        ));
    }

    if let Some(github_username) = &payload.github_username {
        info!("Verifying GitHub identity for: {}", github_username);
    }

    let vouch_id = {
        let mut next_id = state.next_vouch_id.lock().unwrap();
        let id = *next_id;
        *next_id += 1;
        format!("vouch-{}", id)
    };

    let issue_date = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|duration| duration.as_secs())
        .unwrap_or_default()
        .to_string();

    let record = VouchRecord {
        vouch_id: vouch_id.clone(),
        wallet_address: payload.wallet_address.clone(),
        skill: payload.skill.clone(),
        issuer: "VouchNFT Issuer".to_string(),
        metadata_uri: payload
            .metadata_uri
            .clone()
            .unwrap_or_else(|| "ipfs://todo-metadata".to_string()),
        issue_date,
        status: "pending".to_string(),
    };

    {
        let mut vouches = state.vouches.lock().unwrap();
        vouches.push(record);
    }

    let response = VerifyVouchResponse {
        vouch_id: vouch_id.clone(),
        status: "pending".to_string(),
        message: format!(
            "Vouch request received for {} with skill {}.",
            payload.wallet_address, payload.skill
        ),
    };

    info!("Verify vouch request accepted: {}", vouch_id);
    Ok((StatusCode::ACCEPTED, Json(response)))
}

#[derive(Debug, Deserialize)]
pub struct QueryVouchRequest {
    pub vouch_id: String,
}

async fn query_vouch_status(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<QueryVouchRequest>,
) -> impl IntoResponse {
    info!("Query vouch status request for: {}", payload.vouch_id);

    let vouches = state.vouches.lock().unwrap();
    let response = vouches
        .iter()
        .find(|v| v.vouch_id == payload.vouch_id)
        .map(|record| VouchStatusResponse {
            vouch_id: record.vouch_id.clone(),
            status: record.status.clone(),
            message: format!(
                "Vouch for {} is currently {}.",
                record.wallet_address, record.status
            ),
        })
        .unwrap_or(VouchStatusResponse {
            vouch_id: payload.vouch_id.clone(),
            status: "unknown".to_string(),
            message: "No matching vouch found.".to_string(),
        });

    (StatusCode::OK, Json(response))
}

#[derive(Debug, Deserialize)]
pub struct ListVouchesRequest {
    pub wallet_address: String,
}

async fn list_vouches(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<ListVouchesRequest>,
) -> impl IntoResponse {
    info!("List vouches request for: {}", payload.wallet_address);

    let vouches = state.vouches.lock().unwrap();
    let wallet_vouches: Vec<VouchRecord> = vouches
        .iter()
        .filter(|v| v.wallet_address == payload.wallet_address)
        .cloned()
        .collect();

    (StatusCode::OK, Json(ListVouchesResponse {
        vouches: wallet_vouches,
    }))
}

fn app(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/health", get(health_check))
        .route("/verify-vouch", post(verify_vouch))
        .route("/vouch/status", post(query_vouch_status))
        .route("/vouches", post(list_vouches))
        .layer(CorsLayer::permissive())
        .with_state(state)
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .init();

    info!("Starting VouchNFT Backend Server");

    let port = std::env::var("BACKEND_PORT").unwrap_or_else(|_| "3001".to_string());
    let bind_address = format!("127.0.0.1:{}", port);

    let app_state = Arc::new(AppState {
        vouches: Mutex::new(Vec::new()),
        next_vouch_id: Mutex::new(1),
    });

    let app = app(app_state);

    let listener = tokio::net::TcpListener::bind(&bind_address)
        .await
        .unwrap_or_else(|err| panic!("Failed to bind to {}: {}", bind_address, err));

    info!("Server listening on http://{}", bind_address);

    axum::serve(listener, app)
        .await
        .expect("Server error");
}

#[cfg(test)]
mod tests {
    use super::*;

    // TODO: Implement backend tests
    // Test scenarios:
    // - Health check endpoint
    // - Verify vouch request validation
    // - GitHub identity verification
    // - Smart contract integration
    // - Error handling and edge cases
    // - Rate limiting
}
