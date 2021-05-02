const config = require("../config"),
    utils = require("./utils"),
    CheckAuth = require("./auth/CheckAuth"),
    morgan = require("morgan");

module.exports.load = async (client) => {

    /* Init express app */

    const express = require("express"),
        bodyParser = require("body-parser"),
        session = require("express-session"),
        path = require("path"),
        app = express();

    /* Routers */
    const mainRouter = require("./routes/index"),
        guildManager = require("./routes/guild"),
        apiRouter = require("./routes/discord"),
        paymentManager = require("./routes/payment"),
        voteRouter = require("./routes/vote");

    /* App configuration */
    app
        .use(morgan("common"))
        // Body parser (for post method)
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        // Set the engine to html (for ejs template)
        .engine("html", require("ejs").renderFile)
        .set("view engine", "ejs")
        // Set the css and js folder to ./public
        .use(express.static(path.join(__dirname, "/public")))
        // Set the ejs templates to ./views
        .set("views", path.join(__dirname, "/views"))
        // Set the dashboard port
        .set("port", config.port)
        // Set the express session password and configuration
        .use(session({ secret: config.pswd, resave: false, saveUninitialized: false }))
        // Multi languages support
        .use(async function (req, res, next){
            req.client = client;
            req.user = req.session.user;
            req.locale = req.user ? (req.user.locale === "fr" ? "fr-FR" : "en-US") : "en-US";
            if (req.user && req.url !== "/") req.userInfos = await utils.fetchUser(req.user, req.client);
            if (req.user){
                req.translate = req.client.translations.get(req.locale);
                const results = await client.shard.broadcastEval(`
            let guild = this.guilds.cache.get("638685268777500672");
            if(guild){
                let member = guild.members.cache.get('${req.user.id}');
                if(member){
                    true;
                }
            }`);
                req.member = results.some((r) => r);
            }
            next();
        })
        .use("/payment", paymentManager)
        .use("/manage", guildManager)
        .use("/api", apiRouter)
        .use("/vote", voteRouter)
        .use("/", mainRouter)
        .use(CheckAuth, function (req, res){
            if (!req.user) return res.redirect("/login");
            res.status(404).render("404", {
                user: req.userInfos,
                currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
                locale: req.locale || "en-US",
                translate: req.translate
            });
        })
        .use(CheckAuth, function (err, req, res) {
            if (!req.user) return res.redirect("/login");
            console.log(err);
            res.status(500).render("500", {
                user: req.userInfos,
                currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
                locale: req.locale || "en-US",
                translate: req.translate
            });
        });

    // Listen
    app.listen(app.get("port"), () => {
        console.log("ManageInvite dashboard is listening on port "+app.get("port"));
    });

    client.spawned = true;

};