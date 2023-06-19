import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as JwtStrategy, ExtractJwt} from "passport-jwt";
import {createHash, isCorrect} from "../utils.js";
import githubService from "passport-github2";
import {CartsService, UsersService} from "../dao/repositories/index.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";



const transport = nodemailer.createTransport({
  service: "gmail",
  port: 5087,
  auth: {
    user: "jesubes@gmail.com",
    pass: "pabsrnzqnaerhpps",
  },
});



const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }
  return token;
};



const recoverExtractor = (req) => {
  let token = null;
  if (req && req.params) {
    token = req.params.token;
    jwt.verify(
      token,
      "coderSecret",
      {maxAge: 1000 * 60},
      function (err, decoded) {
        if (err) return err;
        token = decoded;
      }
    );
  }
  return token;
};



const initPassport = () => {


  passport.use("jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderSecret",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload, {
            message: "Mensaje de prueba para probar los errores personalizados",
          });
        } catch (error) {
          return done(error, false, {message: "Mensaje de ERROR de prueba"});
        }
      }
    )
  );



  passport.use("recover",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([recoverExtractor]),
        secretOrKey: "coderSecret",
        passReqToCallback: true,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload, {
            message: "Mensaje de prueba para probar los errores personalizados",
          });
        } catch (error) {
          return done(error, false, {message: "Mensaje de ERROR de prueba"});
        }
      }
    )
  );



  passport.use("github",
    new githubService(
      {
        clientID: "Iv1.685415c5dac6b4dc",
        clientSecret: "9474d0df884ab5952a23890561a7a0508fd176d0",
        callbackURL: "http://localhost:8080/api/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const getUser = await UsersService.getBy({
            email: profile._json.email,
          });
          if (getUser.error && getUser.statusCode === 500) return done(getUser);

          if (getUser.error && getUser.statusCode === 404) {
            const newUser = {
              firstName: profile._json.name,
              lastName: "",
              email: profile._json.email,
              password: "",
            };

            const postResponse = await UsersService.post(newUser);
            if (postResponse.error) return done(postResponse);

            await transport.sendMail({
              from: "jesubes@gmail.com",
              to: `${email}`,
              subject: "Aviso sobre registro en coderCommerce",
              text: `Usuario registrado correctamente con Github.`,
            });

            return done(null, postResponse.payload);
          }
          const user = getUser.payload;
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );



  passport.use("register",
    new LocalStrategy(
      {passReqToCallback: true, usernameField: "email"},
      async (req, email, password, done) => {
        const {firstName, lastName, age} = req.body;
        try {
          const getUser = await UsersService.getBy({email});
          if (!getUser.error) {
            return done(null, false, {message: "The user already exist"});
          }

          if (getUser.error && getUser.statusCode === 500) return done(getUser);

          const newUser = {
            firstName,
            lastName,
            age,
            cartId: undefined,
            email,
            password: createHash(password),
            role: "user",
            documents: [],
            lastConnection: "",
          };

          await transport.sendMail({
            from: "jesubes@gmail.com",
            to: `${email}`,
            subject: "Aviso sobre registro en coderCommerce",
            text: `Usuario registrado correctamente. \n Credenciales: Email: ${email} Password: ${password}`,
          });

          const postResponse = await UsersService.post(newUser);
          if (postResponse.error) return done(postResponse);

          return done(null, postResponse.payload, {
            message: "User created successfully",
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );



  passport.use( "login",
    new LocalStrategy(
      {usernameField: "email", session: false},
      async (email, password, done) => {
        try {
          if (
            email === "adminCoder@coder.com" &&
            password === "adminCod3r123"
          ) {
            const postCartResponse = await CartsService.post();
            if (postCartResponse.error) return done(postCartResponse);

            const cartId =
              postCartResponse.payload._id || postCartResponse.payload.id;
            const user = {
              firstName: "Coder",
              lastName: "Admin",
              age: 999,
              email,
              password,
              cartId,
              role: "admin",
              documents: [],
              lastConnection: new Date().toLocaleString(),
            };
            return done(null, user);
          }

          const getUser = await UsersService.getBy({email});
          if (getUser.error && getUser.statusCode === 500) return done(getUser);
          if (getUser.error && getUser.statusCode === 404)
            return done(null, false, {message: "Email not registered"});
          const user = getUser.payload;

          if (!isCorrect(user, password))
            return done(null, false, {
              message: "Incorrect password",
            });

          const postCartResponse = await CartsService.post();
          if (postCartResponse.error) return done(postCartResponse);

          const cartId =
            postCartResponse.payload._id || postCartResponse.payload.id;
          const lastConnection = new Date().toLocaleString();

          user.cartId = cartId;
          user.lastConnection = lastConnection;

          const updateUserResponse = await UsersService.putBy(
            {email},
            {cartId, lastConnection}
          );
          if (updateUserResponse.error) return done(updateUserResponse);

          await transport.sendMail({
            from: "jesubes@gmail.com",
            to: `${email}`,
            subject: "Aviso de inicio de sesion",
            text: `Una persona ha iniciado sesion en su cuenta, si no ha sido usted le recomendamos cambiar la contraseña - ${new Date().toLocaleString()}`,
          });

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );



  passport.serializeUser((user, done) => {
    done(null, user._id || user.id);
  });



  passport.deserializeUser(async (id, done) => {
    const getResponse = await UsersService.getBy({id});
    if (getResponse.error) return done(getResponse);
    const user = getResponse.payload;
    done(null, user);
  });

};

export default initPassport;
