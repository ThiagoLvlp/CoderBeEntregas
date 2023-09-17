import { Router } from 'express';
import passport from 'passport';
import initializePassport from '../config/passport.config.js';
import Product from '../models/productsmodel.js';

const router = Router();
initializePassport();

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/users");
});

router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    console.log("Registrando nuevo usuario.");
    res.status(201).send({ status: "success", message: "Usuario creado con extito." })

})

router.post("/login", passport.authenticate("login", { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    console.log("User found to login:"); 
    const user = req.user;
    console.log(user);
    if (!user) return res.status(401).send({ status: "error", error: "credenciales incorrectas" });
    try {
        const products = await Product.find(); 
        console.log(products); 
        req.session.products = products; 
        console.log(req.session.products);
    } catch (error) {
        console.error('Error al recuperar los productos:', error);
        res.status(500).send('Error interno del servidor');
        return;
    }
    
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
    };

    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});





router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});


export default router;

