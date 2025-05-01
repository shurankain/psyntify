import { getProgram } from "../utils/solana";
import { derivePlantPda } from "../utils/derivePda";
import { SystemProgram } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

export const createPlantOnChain = async (
  wallet: anchor.Wallet,
  name: string,
  description: string,
  imageUrl: string
) => {
  const program = getProgram(wallet);
  const [plantPda] = derivePlantPda(wallet.publicKey, name, program.programId);

  await program.methods
    .createPlant(name, description, imageUrl)
    .accounts({
      plant: plantPda,
      authority: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

  return plantPda;
};
