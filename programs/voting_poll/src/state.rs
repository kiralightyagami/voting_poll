use anchor_lang::prelude::*;

#[account]
pub struct VotingPoll {
    pub yes_votes: u64,
    pub no_votes: u64,
}

impl VotingPoll {
    pub const LEN: usize = 8 + 8 + 8; // discriminator + yes_votes + no_votes
}

