module.exports = {
    token:          "XXXXXXXXXXX",
    shardCount:     2,
    /* Status */
    statusWebhook: {
        id: "XXXXXXXXXXX",
        token: "XXXXXXXXXXX"
    },
    /* Logs */
    addLogs:        "XXXXXXXXXXX",
    removeLogs:     "XXXXXXXXXXX",
    dashLogs:       "XXXXXXXXXXX",
    statsLogs:      "XXXXXXXXXXX",
    premiumLogs:    "XXXXXXXXXXX",
    voteLogs:       "XXXXXXXXXXX",
    /* Dashboard */
    secret:         "XXXXXXXXXXX",
    baseURL:        "XXXXXXXXXXX",
    port:           3100,
    pswd:           "XXXXXXXXXXX",
    failureURL:     "https://docs.manage-invite.xyz",
    /* Other */
    discord:        "XXXXXXXXXXX",
    prefix:         "+",
    owners: [ "XXXXXXXXXXX", "XXXXXXXXXXX" ],
    modRole:        "XXXXXXXXXXX",
    premiumRole:    "XXXXXXXXXXX",
    supportServer:  "XXXXXXXXXXX",
    sentryDSN:      "XXXXXXXXXXX",
    /* Top.gg */
    topToken: "XXXXXXXXXXX",
    topAuth: "XXXXXXXXXXX",
    /* Database */
    postgres: {
        user: "",
        host: "localhost",
        database: "manage_invite",
        password: "",
        port: 5432
    },
    redis: {
        user: ""
    },
    /* PayPal */
    paypal: {
        mode: "sandbox",
        live: {
            email: "XXXXXXXXXXX",
            returnURL: "https://dash.manage-invite.xyz/payment/callback",
            cancelURL: "https://dash.manage-invite.xyz/selector",
            ipnURL: "https://dash.manage-invite.xyz/payment/ipn",
            formURL: "https://www.paypal.com/cgi-bin/webscr",
            fetchURL: "https://ipnpb.paypal.com/cgi-bin/webscr?cmd=_notify-validate",
            ptdToken: "XXXXXXXXXXX"
        },
        sandbox: {
            email: "XXXXXXXXXXX",
            returnURL: "http://localhost:3100/payment/callback",
            cancelURL: "http://localhost:3100/",
            ipnURL: "http://ngork.io/payment/ipn",
            formURL: "https://www.sandbox.paypal.com/cgi-bin/webscr",
            fetchURL: "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr?cmd=_notify-validate",
            pdtToken: "XXXXXXXXXXX"
        }
    }
};