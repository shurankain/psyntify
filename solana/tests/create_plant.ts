import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { assert } from "chai";

describe("create_plant", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Solana as Program<any>;

  it("should create a plant account", async () => {
    const name = "myplant";
    const description = "This is a test plant";
    const imageUrl = "https://example.com/image.png";

    // Derive PDA for the plant account
    const [plantPda] = await PublicKey.findProgramAddress(
      [
        Buffer.from("plant"),
        provider.wallet.publicKey.toBuffer(),
        Buffer.from(name),
      ],
      program.programId
    );

    await program.methods
      .createPlant(name, description, imageUrl)
      .accounts({
        plant: plantPda,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    // Fetch the account and check the data
    const plantAccount = await program.account["plant"].fetch(plantPda);
    assert.equal(plantAccount.owner.toBase58(), provider.wallet.publicKey.toBase58());
    assert.equal(plantAccount.name, name);
    assert.equal(plantAccount.description, description);
    assert.equal(plantAccount.imageUrl, imageUrl);
  });
});
