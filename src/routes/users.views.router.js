import { Router } from "express";
import productsSchema from '../models/productsmodel.js';
import { authToken } from '../utils.js';
import passport from "passport";


const router = Router();

router.get('/',
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        res.render('profile', { user: req.user })
    }
)

//router.get("/", authToken, (req, res) => {
//    res.render("profile", {
//        user: req.user
//    });
// });

router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/register", (req, res) => {
    res.render('register');
});

router.get("/products", async (req, res) => {
    try {
        const products = await productsSchema.find();
        res.render('products', {
            user: req.session.admin,
            products: products
        });
    } catch (error) {
        console.error("Error al obtener productos: " + error);
        res.status(500).send("Error al obtener productos");
    }
});



export default router;


