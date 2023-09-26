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




export default router;


