import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { expect } from "chai";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;
  const provider = anchor.AnchorProvider.env();
  
  // Generate a new keypair for the counter account
  const counterAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        counter: counterAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([counterAccount])
      .rpc();
    
    console.log("Initialize transaction signature:", tx);

    // Fetch the counter account
    const account = await program.account.counter.fetch(counterAccount.publicKey);
    expect(account.count.toNumber()).to.equal(0);
    console.log("Counter initialized with count:", account.count.toNumber());
  });

  it("Increments the counter", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counterAccount.publicKey,
      })
      .rpc();
    
    console.log("Increment transaction signature:", tx);

    // Fetch the counter account
    const account = await program.account.counter.fetch(counterAccount.publicKey);
    expect(account.count.toNumber()).to.equal(1);
    console.log("Counter incremented to:", account.count.toNumber());
  });

  it("Increments the counter again", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counterAccount.publicKey,
      })
      .rpc();
    
    console.log("Second increment transaction signature:", tx);

    // Fetch the counter account
    const account = await program.account.counter.fetch(counterAccount.publicKey);
    expect(account.count.toNumber()).to.equal(2);
    console.log("Counter incremented to:", account.count.toNumber());
  });
});
