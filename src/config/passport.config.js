import passport from 'passport';
import passportLocal from 'passport-local';
import userModel from '../services/db/models/user.model.js';
import { createHash, isValidPassword } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import { ExtractJwt } from 'passport-jwt'; // Importa ExtractJwt
import jwtStrategy from 'passport-jwt';
import { PRIVATE_KEY } from '../utils.js';

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;
const localStrategy = passportLocal.Strategy;
const adminemail = 'adminCoder@coder.com';
const adminpass = 'adminCod3r123';

const initializePassport = () => {

// Estrategia de obtener Token JWT por Cookie:
passport.use('jwt', new JwtStrategy(
    {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        console.log("Entrando a passport Strategy con JWT.");
        try {
            console.log("JWT obtenido del payload");
            console.log(jwt_payload);
            return done(null, jwt_payload.user);
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }
));

//                PASSPORT CON GITHUB
    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.53828c08064ef6d3',
            clientSecret: '8785fc685c21c33faa3f1b793c2263a15070b690',
            callbackUrl: 'http://localhost:9090/api/sessions/githubcallback'
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Profile obtenido del usuario: ");
            console.log(profile);
            try {
                const user = await userModel.findOne({ email: profile._json.email })
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + profile._json.email);
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        age: 18,
                        email: profile._json.email,
                        password: '',
                        loggedBy: "GitHub"
                    }
                    const result = await userModel.create(newUser)
                    done(null, result)
                }
                else {
                    return done(null, user)
                }
            } catch (error) {
                return done(error)
            }
        }));

//                   PASSPORT LOCAL
    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { first_name, last_name, age } = req.body;
            try {
                const exists = await userModel.findOne({ email: username });
                if (exists) {
                    return done(null, false, { message: 'Usuario ya existe' });
                }
                const user = {
                    first_name,
                    last_name,
                    email: username,
                    age,
                    password: createHash(password)
                };
                const result = await userModel.create(user);
                return done(null, result);
            } catch (error) {
                return done(error);
            }
        }
    ));
    
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                if (username === adminemail && password === adminpass) {
                    const adminUser = {
                        first_name: "Admin",
                        last_name: "Admin",
                        email: adminemail,
                        age: 0,
                        role: 'admin'
                    };
                    return done(null, adminUser);
                }
                const user = await userModel.findOne({ email: username });
                if (!user) {
                    return done(null, false, { message: 'Credenciales incorrectas' });
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false, { message: 'Credenciales incorrectas' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));
    
    passport.serializeUser((user, done) => {
        if (user.role !== 'admin') {
            done(null, user._id);
        } else {
            done(null, 'admin');
        }
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            if (id === 'admin') {
                const adminUser = {
                    first_name: "Admin",
                    last_name: "Admin",
                    email: adminemail,
                    age: 0,
                    role: 'admin'
                };
                done(null, adminUser);
            } else {
                let user = await userModel.findById(id);
                done(null, user);
            }
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
};

const cookieExtractor = req => {
    let token = null;
    console.log("Entrando a Cookie Extractor");
    if (req && req.cookies) {
        console.log("Cookies presentes: ");
        console.log(req.cookies);
        token = req.cookies['jwtCookieToken']
        console.log("Token obtenido desde Cookie:");
        console.log(token);
    }
    return token;
}

export default initializePassport;

