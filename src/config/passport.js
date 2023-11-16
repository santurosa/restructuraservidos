import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import { userModel } from "../models/users.js";
import Cart from "../dao/db/carts.js"
import { createHash, isValidPassword } from "../utils.js";
import config from "./config.js";

const LocalStrategy = local.Strategy;
const cartManager = new Cart();

const admin = {
    _id: "123",
    first_name: "Admin",
    last_name: "Coder",
    email: config.adminName,
    age: null,
    password: config.adminPassword,
    role: "admin"
}

const initializePassport = () => {
    passport.use("register", new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body
        try {
            if (email === admin.email) return done(null, false, { message: "User exist" });
            const user = await userModel.findOne({ email: username.toLocaleLowerCase() });
            if (user) return done(null, false, { message: "User exist" });
            const cart = await cartManager.createCart();
            const newUser = { first_name, last_name, email: email.toLowerCase(), age, password: createHash(password), cart: cart._id, role }
            const result = await userModel.create(newUser);
            done(null, result);
        } catch (error) {
            throw done("Error al crear el usuario: " + error);
        }
    }
    ));

    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            if (username === admin.email && password === admin.password) {
                const user = admin;
                return done(null, user);
            }
            const user = await userModel.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: "User doesn't exist"});
            }
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            throw done(error);
        }
    }))
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.81081089c45b38d4",
        clientSecret: "07e1bf386ed8a0c2dc85046c3f8ce459d55a64d6",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email });
            if (!user) {
                const cart = await cartManager.createCart()
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    age: null,
                    cart: cart._id,
                    password: "",
                    role: "user"
                }
                const result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            throw done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    })
}

export default initializePassport;