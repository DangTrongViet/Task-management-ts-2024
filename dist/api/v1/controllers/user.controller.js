"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.login = exports.register = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const generate_1 = require("../helpers/generate");
const md5_1 = __importDefault(require("md5"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = (0, md5_1.default)(req.body.password);
    const existEmail = yield users_model_1.default.findOne({
        email: req.body.email,
        deleted: false
    });
    if (existEmail) {
        res.json({
            code: 200,
            message: "Email đã tồn tại"
        });
    }
    else {
        const user = new users_model_1.default({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            token: (0, generate_1.generateRandomString)(30)
        });
        yield user.save();
        const token = user.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "Tạo tài khoản thành công",
            token: token
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = (0, md5_1.default)(req.body.password);
    const user = yield users_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại"
        });
        return;
    }
    if (password !== user.password) {
        res.json({
            code: 400,
            message: "Password sai"
        });
        return;
    }
    const token = user.token;
    res.cookie("token", token);
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: token
    });
});
exports.login = login;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        code: 200,
        message: "Thành công!",
        info: req["user"]
    });
});
exports.detail = detail;
