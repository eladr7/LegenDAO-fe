const NET_ERRORS = [
    "invalid/keplr",
    "invalid/keplr/signer",
    "invalid/keplr/signer/accounts",
    "invalid/net/urls",
    "invalid/net/rpc/url",
    "invalid/net/rest/url",
    "invalid/chain/id",
    "failed/keplr/get/key",
] as const;

export type TNetError = typeof NET_ERRORS[number];
