import {fileURLToPath} from "url";
import {dirname} from "path";
import multer from "multer";
import bcrypt from "bcrypt";
import passport from "passport";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const route = routeOf[file.fieldname];
    cb(null, __dirname + `\\public\\${route}`);
  },
  filename: function (req, file, cb) {
    const fileExtension =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(
      null,
      `${req.user?.email || Date.now().toLocaleString()}-${
        file.fieldname
      }.${fileExtension}`
    );
  },
});


export const uploader = multer({storage});

export const getFiles = uploader.fields([
  {name: "identification", maxCount: 1},
  {name: "proofOfAddress", maxCount: 1},
  {name: "proofOfAccountStatus", maxCount: 1},
]);


export const passportCallback = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (info) info.toString();
      if (!user) {
        return res.send({error: info.message ? info.message : info.toString()});
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};


export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isCorrect = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const routeOf = {
  identification: "documents",
  proofOfAddress: "documents",
  proofOfAccountStatus: "documents",
  profilePicture: "profiles",
  productImage: "products",
};

export default __dirname;

