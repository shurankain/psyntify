import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./idl.json"; // backend/solana/target/idl/solana.json renamed as idl

const programId = new PublicKey("tc2nMdnvzB5u4DMLffoQa3cYu6Z4mPJ8jkxpHNZCpki");
const network = "http://localhost:8899"; // RPC URL
const connection = new Connection(network, "confirmed");

export const getProgram = (wallet: anchor.Wallet) => {
  const provider = new anchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "confirmed",
  });

  return new anchor.Program(idl as anchor.Idl, programId, provider);
};
