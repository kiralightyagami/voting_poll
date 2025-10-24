import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VotingPoll } from "../target/types/voting_poll";
import { expect } from "chai";

describe("voting contract", () => {
  
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.VotingPoll as Program<VotingPoll>;
  const provider = anchor.AnchorProvider.env();
  
  
  const votingPollAccount = anchor.web3.Keypair.generate();

  it("Initializes a voting poll", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        votingPoll: votingPollAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([votingPollAccount])
      .rpc();
    
    console.log("Initialize transaction signature:", tx);

    
    const account = await program.account.votingPoll.fetch(votingPollAccount.publicKey);
    expect(account.yesVotes.toNumber()).to.equal(0);
    expect(account.noVotes.toNumber()).to.equal(0);
    console.log("Voting poll initialized - Yes:", account.yesVotes.toNumber(), "No:", account.noVotes.toNumber());
  });

  it("Casts a yes vote", async () => {
    const tx = await program.methods
      .voteYes()
      .accounts({
        votingPoll: votingPollAccount.publicKey,
      })
      .rpc();
    
    console.log("Vote yes transaction signature:", tx);

   
    const account = await program.account.votingPoll.fetch(votingPollAccount.publicKey);
    expect(account.yesVotes.toNumber()).to.equal(1);
    expect(account.noVotes.toNumber()).to.equal(0);
    console.log("After yes vote - Yes:", account.yesVotes.toNumber(), "No:", account.noVotes.toNumber());
  });

  it("Casts a no vote", async () => {
    const tx = await program.methods
      .voteNo()
      .accounts({
        votingPoll: votingPollAccount.publicKey,
      })
      .rpc();
    
    console.log("Vote no transaction signature:", tx);

    
    const account = await program.account.votingPoll.fetch(votingPollAccount.publicKey);
    expect(account.yesVotes.toNumber()).to.equal(1);
    expect(account.noVotes.toNumber()).to.equal(1);
    console.log("After no vote - Yes:", account.yesVotes.toNumber(), "No:", account.noVotes.toNumber());
  });

  it("Casts another yes vote", async () => {
    const tx = await program.methods
      .voteYes()
      .accounts({
        votingPoll: votingPollAccount.publicKey,
      })
      .rpc();
    
    console.log("Vote yes transaction signature:", tx);

   
    const account = await program.account.votingPoll.fetch(votingPollAccount.publicKey);
    expect(account.yesVotes.toNumber()).to.equal(2);
    expect(account.noVotes.toNumber()).to.equal(1);
    console.log("After second yes vote - Yes:", account.yesVotes.toNumber(), "No:", account.noVotes.toNumber());
  });
});
