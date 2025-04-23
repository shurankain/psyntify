use anchor_lang::prelude::*;

declare_id!("tc2nMdnvzB5u4DMLffoQa3cYu6Z4mPJ8jkxpHNZCpki");

#[program]
pub mod solana {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", _ctx.program_id);
        Ok(())
    }

    pub fn create_plant(
        ctx: Context<CreatePlant>,
        name: String,
        description: String,
        image_url: String,
    ) -> Result<()> {
        let plant = &mut ctx.accounts.plant;
        plant.owner = ctx.accounts.authority.key();
        plant.name = name;
        plant.description = description;
        plant.image_url = image_url;
        plant.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreatePlant<'info> {
    #[account(init, payer = authority, space = 8 + Plant::MAX_SIZE, seeds = [b"plant", authority.key().as_ref(), name.as_bytes()], bump)]
    pub plant: Account<'info, Plant>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Plant {
    pub owner: Pubkey,
    pub name: String,
    pub description: String,
    pub image_url: String,
    pub created_at: i64,
}

impl Plant {
    pub const MAX_SIZE: usize = 
        32 + // owner
        4 + 50 + // name (max 50 bytes)
        4 + 256 + // description (max 256 bytes)
        4 + 200 + // image_url (max 200 bytes)
        8; // created_at
}
