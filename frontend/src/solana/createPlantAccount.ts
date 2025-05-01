import { getProgram } from "../utils/solana";
import { derivePlantPda } from "../utils/derivePda";
import { SystemProgram } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

// Limits must match the Rust program's MAX_NAME_LEN etc.
const MAX_NAME_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 256;
const MAX_IMAGE_URL_LENGTH = 200;

export const createPlantOnChain = async (
  wallet: anchor.Wallet,
  name: string,
  description: string,
  imageUrl: string
) => {
  if (name.length > MAX_NAME_LENGTH) {
    throw new Error(`Name is too long. Max ${MAX_NAME_LENGTH} characters.`);
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    throw new Error(`Description is too long. Max ${MAX_DESCRIPTION_LENGTH} characters.`);
  }
  if (imageUrl.length > MAX_IMAGE_URL_LENGTH) {
    throw new Error(`Image URL is too long. Max ${MAX_IMAGE_URL_LENGTH} characters.`);
  }

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
