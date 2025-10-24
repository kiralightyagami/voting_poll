use anchor_lang::prelude::*;

pub mod state;
pub mod instructions;

use instructions::*;

declare_id!("Gs7ZMdCHqWFZZqmqentcXdt6ipH427CceCSQ7HyyAQxX");

#[program]
pub mod voting_poll {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        instructions::initialize::initialize(ctx)
    }

    pub fn vote_yes(ctx: Context<Vote>) -> Result<()> {
        instructions::vote::vote_yes(ctx)
    }

    pub fn vote_no(ctx: Context<Vote>) -> Result<()> {
        instructions::vote::vote_no(ctx)
    }
}
