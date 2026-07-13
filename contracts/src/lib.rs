#![no_std]

use soroban_sdk::{contract, contractimpl, log, symbol_short, Address, Env, Map, String, Vec};

#[contract]
pub struct SoulboundVouchNFT;

#[contractimpl]
impl SoulboundVouchNFT {
    pub fn init(env: Env, admin: Address) {
        let storage = env.storage().persistent();
        storage.set(&symbol_short!("admin"), &admin);
        storage.set(&symbol_short!("counter"), &0u32);
        storage.set(&symbol_short!("owners"), &Map::<u32, Address>::new(&env));
        storage.set(&symbol_short!("skills"), &Map::<u32, String>::new(&env));
        storage.set(&symbol_short!("metadata"), &Map::<u32, String>::new(&env));
        storage.set(&symbol_short!("owner_vouches"), &Map::<Address, Vec<u32>>::new(&env));

        log!(&env, "VouchNFT: Initialized contract with admin: {}", admin);
    }

    pub fn mint_vouch(
        env: Env,
        to: Address,
        skill: String,
        metadata_uri: String,
    ) -> u32 {
        let storage = env.storage().persistent();
        let admin: Address = storage
            .get(&symbol_short!("admin"))
            .expect("contract must be initialized with admin");

        let invoker = env.invoker();
        if invoker != admin {
            panic!("VouchNFT: caller is not authorized to mint vouches");
        }

        if skill.len() == 0 {
            panic!("VouchNFT: skill cannot be empty");
        }

        let mut counter: u32 = storage.get(&symbol_short!("counter")).unwrap_or(0);
        counter = counter.saturating_add(1);
        storage.set(&symbol_short!("counter"), &counter);

        let mut owners: Map<u32, Address> = storage
            .get(&symbol_short!("owners"))
            .unwrap_or(Map::new(&env));
        let mut skills: Map<u32, String> = storage
            .get(&symbol_short!("skills"))
            .unwrap_or(Map::new(&env));
        let mut metadata: Map<u32, String> = storage
            .get(&symbol_short!("metadata"))
            .unwrap_or(Map::new(&env));
        let mut owner_vouches: Map<Address, Vec<u32>> = storage
            .get(&symbol_short!("owner_vouches"))
            .unwrap_or(Map::new(&env));

        owners.set(counter, to.clone());
        skills.set(counter, skill.clone());
        metadata.set(counter, metadata_uri.clone());

        let mut owned_vouches = owner_vouches
            .get(to.clone())
            .unwrap_or_else(|| Vec::new(&env));
        owned_vouches.push_back(counter);
        owner_vouches.set(to.clone(), owned_vouches);

        storage.set(&symbol_short!("owners"), &owners);
        storage.set(&symbol_short!("skills"), &skills);
        storage.set(&symbol_short!("metadata"), &metadata);
        storage.set(&symbol_short!("owner_vouches"), &owner_vouches);

        log!(&env, "VouchNFT: Minted vouch {} for {}", counter, to);
        counter
    }

    pub fn get_vouch(env: Env, nft_id: u32) -> Vec<String> {
        let storage = env.storage().persistent();
        let owners: Map<u32, Address> = storage
            .get(&symbol_short!("owners"))
            .unwrap_or(Map::new(&env));
        let skills: Map<u32, String> = storage
            .get(&symbol_short!("skills"))
            .unwrap_or(Map::new(&env));
        let metadata: Map<u32, String> = storage
            .get(&symbol_short!("metadata"))
            .unwrap_or(Map::new(&env));

        let owner = owners
            .get(nft_id)
            .expect("vouch not found for provided id");
        let skill = skills
            .get(nft_id)
            .expect("skill not found for provided vouch id");
        let metadata_uri = metadata
            .get(nft_id)
            .expect("metadata not found for provided vouch id");

        let mut result = Vec::new(&env);
        result.push_back(owner.to_string());
        result.push_back(skill);
        result.push_back(metadata_uri);
        result
    }

    pub fn get_vouches_for_owner(env: Env, owner: Address) -> Vec<u32> {
        let storage = env.storage().persistent();
        let owner_vouches: Map<Address, Vec<u32>> = storage
            .get(&symbol_short!("owner_vouches"))
            .unwrap_or(Map::new(&env));

        owner_vouches.get(owner).unwrap_or_else(|| Vec::new(&env))
    }

    pub fn transfer(
        env: Env,
        _nft_id: u32,
        _from: Address,
        _to: Address,
    ) {
        log!(&env, "VouchNFT: Transfer attempted but is disabled for Soulbound NFTs");
        panic!("VouchNFT: Soulbound NFTs cannot be transferred");
    }

    pub fn is_soulbound(_env: Env, _nft_id: u32) -> bool {
        true
    }

    pub fn revoke_vouch(env: Env, nft_id: u32) {
        let storage = env.storage().persistent();
        let mut owners: Map<u32, Address> = storage
            .get(&symbol_short!("owners"))
            .unwrap_or(Map::new(&env));
        let owner = owners
            .get(nft_id)
            .expect("vouch not found for provided id");

        let mut owner_vouches: Map<Address, Vec<u32>> = storage
            .get(&symbol_short!("owner_vouches"))
            .unwrap_or(Map::new(&env));
        let mut owned = owner_vouches
            .get(owner.clone())
            .unwrap_or_else(|| Vec::new(&env));

        let filtered = owned
            .into_iter()
            .filter(|id| *id != nft_id)
            .collect::<Vec<u32>>();
        owner_vouches.set(owner.clone(), filtered);

        owners.remove(nft_id);
        storage.set(&symbol_short!("owners"), &owners);
        storage.set(&symbol_short!("owner_vouches"), &owner_vouches);

        log!(&env, "VouchNFT: Revoked vouch id {}", nft_id);
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::testutils::{Address as TestAddress, Ledger};

    #[test]
    fn test_init_and_mint_vouch() {
        let env = Env::default();
        env.ledger().set(Ledger {
            scp_info: Default::default(),
            timestamp: 0,
            protocol_version: 1,
            sequence_number: 1,
            network_passphrase: "Test Network".into(),
        });

        let admin = TestAddress::random(&env);
        SoulboundVouchNFTClient::new(&env, &env.current_contract()).init(&admin);

        let owner = TestAddress::random(&env);
        let skill = String::from_slice(&env, "Rust Programming");
        let metadata_uri = String::from_slice(&env, "ipfs://example");

        let vouch_id = SoulboundVouchNFTClient::new(&env, &env.current_contract())
            .mint_vouch(&owner.clone().into(), &skill, &metadata_uri);

        assert_eq!(vouch_id, 1);
    }
}
