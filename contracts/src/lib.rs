#![no_std]

use soroban_sdk::{contract, contractimpl, log, symbol_short, Env, Symbol, Vec};

/// TODO: Implement proper NFT metadata storage structure
/// This should include fields like:
/// - owner: Address
/// - skill_category: String
/// - issuer: Address
/// - issue_date: u64
/// - metadata_uri: String

#[contract]
pub struct SoulboundVouchNFT;

#[contractimpl]
impl SoulboundVouchNFT {
    /// Initialize the contract with an admin address
    /// 
    /// # Arguments
    /// * `env` - The Soroban environment
    /// * `admin` - The administrator address that can issue vouches
    /// 
    /// # TODO
    /// - Store admin in contract data
    /// - Initialize any required state variables
    pub fn init(env: Env, admin: soroban_sdk::Address) {
        log!(
            &env,
            "VouchNFT: Initialized contract with admin: {}",
            admin
        );
        // TODO: Implement contract initialization
        // env.storage().persistent().set(&symbol_short!("admin"), &admin);
    }

    /// Mint a new Soulbound NFT (Vouch)
    /// 
    /// This function creates a new non-transferable NFT vouching for a user's skill.
    /// The NFT is bound to a specific address and cannot be transferred.
    /// 
    /// # Arguments
    /// * `env` - The Soroban environment
    /// * `to` - The address receiving the vouch (NFT owner)
    /// * `skill` - The skill being vouched for (e.g., "Rust Programming", "DevOps")
    /// * `metadata_uri` - URI pointing to detailed metadata (IPFS, HTTP, etc.)
    /// 
    /// # Returns
    /// * `u32` - The ID of the newly minted NFT
    /// 
    /// # TODO
    /// - Verify caller is authorized to mint (check admin/issuer)
    /// - Store NFT metadata in contract state
    /// - Track NFT ownership in a map
    /// - Emit an event for NFT minting
    /// - Implement duplicate prevention (one vouch per skill per issuer)
    pub fn mint_vouch(
        env: Env,
        to: soroban_sdk::Address,
        skill: soroban_sdk::String,
        metadata_uri: soroban_sdk::String,
    ) -> u32 {
        log!(
            &env,
            "VouchNFT: Minting vouch for {} in skill: {}",
            to,
            skill
        );

        // TODO: Validate inputs
        // TODO: Increment NFT counter
        // TODO: Store NFT metadata

        let nft_id = 1; // Placeholder
        nft_id
    }

    /// Query vouch details by NFT ID
    /// 
    /// Retrieves the metadata and details of a specific vouch NFT.
    /// 
    /// # Arguments
    /// * `env` - The Soroban environment
    /// * `nft_id` - The ID of the NFT to query
    /// 
    /// # Returns
    /// * `Vec<soroban_sdk::String>` - NFT metadata fields (owner, skill, issuer, etc.)
    /// 
    /// # TODO
    /// - Return structured NFT data (consider using a struct)
    /// - Handle case where NFT doesn't exist
    pub fn get_vouch(env: Env, nft_id: u32) -> Vec<soroban_sdk::String> {
        log!(&env, "VouchNFT: Querying vouch with ID: {}", nft_id);

        // TODO: Retrieve and return NFT metadata
        let result: Vec<soroban_sdk::String> = Vec::new(&env);
        result
    }

    /// Query all vouches for a specific address
    /// 
    /// Returns a list of all Soulbound NFTs owned by an address.
    /// 
    /// # Arguments
    /// * `env` - The Soroban environment
    /// * `owner` - The address to query
    /// 
    /// # Returns
    /// * `Vec<u32>` - List of NFT IDs owned by the address
    /// 
    /// # TODO
    /// - Implement efficient indexing to find vouches by owner
    pub fn get_vouches_for_owner(env: Env, owner: soroban_sdk::Address) -> Vec<u32> {
        log!(&env, "VouchNFT: Querying vouches for owner: {}", owner);

        // TODO: Query and return all NFTs owned by address
        let result: Vec<u32> = Vec::new(&env);
        result
    }

    /// DISABLED: Soulbound NFTs cannot be transferred
    /// 
    /// This function intentionally always fails to enforce the Soulbound property.
    /// NFTs issued as professional vouches must remain permanently bound to the recipient.
    /// 
    /// # Arguments
    /// * `env` - The Soroban environment
    /// * `nft_id` - The ID of the NFT (not used)
    /// * `from` - The sender address (not used)
    /// * `to` - The recipient address (not used)
    /// 
    /// # Panics
    /// Always panics with "VouchNFT: Soulbound NFTs cannot be transferred"
    pub fn transfer(
        env: Env,
        _nft_id: u32,
        _from: soroban_sdk::Address,
        _to: soroban_sdk::Address,
    ) {
        // Soulbound NFTs are permanently bound to their recipient
        // Transfers are not allowed under any circumstances
        log!(&env, "VouchNFT: Transfer attempted but is disabled for Soulbound NFTs");
        panic!("VouchNFT: Soulbound NFTs cannot be transferred");
    }

    /// Check if an NFT is Soulbound (always true for this contract)
    /// 
    /// # Arguments
    /// * `env` - The Soroban environment
    /// * `nft_id` - The ID of the NFT
    /// 
    /// # Returns
    /// * `bool` - Always returns true
    pub fn is_soulbound(env: Env, nft_id: u32) -> bool {
        log!(
            &env,
            "VouchNFT: Checking Soulbound status for NFT: {}",
            nft_id
        );
        true // All NFTs in this contract are Soulbound
    }

    /// Burn/revoke a vouch (admin only)
    /// 
    /// Allows the issuer or admin to revoke a vouch that was issued in error.
    /// 
    /// # Arguments
    /// * `env` - The Soroban environment
    /// * `nft_id` - The ID of the NFT to burn
    /// 
    /// # TODO
    /// - Verify caller is authorized (admin or issuer)
    /// - Remove NFT from storage
    /// - Emit revocation event
    pub fn revoke_vouch(env: Env, nft_id: u32) {
        log!(&env, "VouchNFT: Revoking vouch with ID: {}", nft_id);

        // TODO: Implement revocation logic
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::testutils::Address as TestAddress;

    // TODO: Implement comprehensive test suite
    // Test scenarios:
    // - Successful minting of a vouch
    // - Preventing transfers (verify panic)
    // - Querying vouch data
    // - Revoking vouches
    // - Authorization checks
    // - Edge cases (invalid inputs, duplicate vouches, etc.)
}
