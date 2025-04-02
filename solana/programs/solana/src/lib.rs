use anchor_lang::prelude::*;

declare_id!("tc2nMdnvzB5u4DMLffoQa3cYu6Z4mPJ8jkxpHNZCpki");

#[program]
pub mod solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
