import { Request, Response } from "express"
import User from "../models/users.model"
import  { generateRandomNumber, generateRandomString} from "../helpers/generate"
import md5 from "md5";


export const register = async (req: Request, res: Response) => {
    req.body.password=md5(req.body.password);
    
    const existEmail= await User.findOne({
        email: req.body.email,
        deleted: false
    });
    
    if(existEmail){
        res.json({
            code: 200,
            message: "Email đã tồn tại"
        })
    } else{
        const user=new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            token: generateRandomString(30)
        })
        await user.save();

        const token= user.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "Tạo tài khoản thành công",
            token: token
        })
    }
};

export const login = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = md5(req.body.password);

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if(!user){
        res.json({
            code: 400,
            message:"Email không tồn tại"
        });
        return;
    }
    if(password !== user.password){
        res.json({
            code: 400,
            message:"Password sai"
        });
        return;
    }

    const token: string= user.token;

    res.cookie("token", token);
    res.json({
        code: 200,
        message:"Đăng nhập thành công",
        token: token
    });
}

export const detail = async(req: Request, res: Response) => {
    
    res.json({
        code: 200,
        message: "Thành công!",
        info: req["user"]
    })
}