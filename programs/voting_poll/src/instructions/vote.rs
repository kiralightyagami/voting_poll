use anchor_lang::prelude::*;
use crate::state::VotingPoll;

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub voting_poll: Account<'info, VotingPoll>,
}

pub fn vote_yes(ctx: Context<Vote>) -> Result<()> {
    let poll = &mut ctx.accounts.voting_poll;
    poll.yes_votes += 1;
    msg!("Yes vote recorded. Total yes votes: {}", poll.yes_votes);
    Ok(())
}

pub fn vote_no(ctx: Context<Vote>) -> Result<()> {
    let poll = &mut ctx.accounts.voting_poll;
    poll.no_votes += 1;
    msg!("No vote recorded. Total no votes: {}", poll.no_votes);
    Ok(())
}

