use anchor_lang::prelude::*;
use crate::state::VotingPoll;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = VotingPoll::LEN)]
    pub voting_poll: Account<'info, VotingPoll>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
    let poll = &mut ctx.accounts.voting_poll;
    poll.yes_votes = 0;
    poll.no_votes = 0;
    msg!("Voting poll initialized with yes: {}, no: {}", poll.yes_votes, poll.no_votes);
    Ok(())
}

