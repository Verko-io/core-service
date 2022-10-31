export enum EnumWalletType {
  NonCustodial = 0,
  SemiCustodial = 1,
  Custodial = 2,
}

export namespace Verko.Signer {
  export enum EnumBlockchainType {
    Elrond = 1,
    Solana = 2,
    //eth
    Etherium = 3,
    //eth
    Binance = 4,
    //eth
    Polygon = 5,
  }

  export enum EnumTokenType {
    FT = 0,
    SFT = 1,
    NFT = 2,
    NATIVE = 3,
  }

  export enum EnumTransactionStatus {
    Init = 0,
    Pending = 1,
    Fail = 2,
    Success = 3,
    Rollback = 4,
  }

  export enum EnumTransactionOperationType {
    LocalTokenTransfer = 0,
    ChainTokenTransfer = 1,
  }

  export enum EnumTransactionType {
    TOKEN_TRANSFER = 0,
    NATIVE_TARNSFER = 1,
    NFT_TRNSFER = 2,
    CONTRACT_CALL = 3,
  }
}
