import { PublicKey } from "@solana/web3.js";

export const derivePlantPda = (
  walletPubkey: PublicKey,
  name: string,
  programId: PublicKey
): [PublicKey, number] => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("plant"),
      walletPubkey.toBuffer(),
      Buffer.from(name),
    ],
    programId
  );
};
