// IMPORTANDO BIBLIOTECAS ---------------------------------------------------------------------------------------------
const express = require("express");
const nunjucks = require("nunjucks");
const App = express();

// CONFIGURANDO NUNJUCKS MIDDLEWARE PARA TEMPLATES --------------------------------------------------------------------
nunjucks.configure("src/app/views", {
    autoescape: true,
    express: App,
    watch: true
});

// MIDDLEWARES --------------------------------------------------------------------------------------------------------
const checkQueryMiddleware = (req, res, next) => {
    if (req.query.age === undefined || req.query.age === "" || req.query.age === null || isNaN(req.query.age))
        res.redirect("/");
    else
        return next();
};

// CONFIGURANDO  EXPRESS ----------------------------------------------------------------------------------------------
App.use(express.urlencoded({ extended: false }));
App.set("view engine", "njk");

// ROTAS --------------------------------------------------------------------------------------------------------------
App.get("/", (req, res) => {
    return res.render("home/index", { res: "Olá Mundo" });
});
App.post("/check", (req, res) => {
    if (req.body.age >= 18)
        res.redirect("/major?age=" + req.body.age);
    else
        res.redirect("/minor?age=" + req.body.age);
});
App.get("/major", checkQueryMiddleware, (req, res) => {
    return res.render("major/index", { age: req.query.age });
});
App.get("/minor", checkQueryMiddleware, (req, res) => {
    return res.render("minor/index", { age: req.query.age });
});

// INICIANDO SERVIDOR NA PORTA 3000 -----------------------------------------------------------------------------------
App.listen(3000);
