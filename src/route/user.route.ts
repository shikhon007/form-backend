import express, { Router,Request,Response } from "express";
import User from "../entity/user.entity";
import UserService from "../services/user.service";
import {Container} from "typedi";
import { wrap } from "../middleware/wraps.middle";
const router:Router = express.Router();


router.get('/',async(req:Request,res: Response) => {
     const userService: UserService = Container.get(UserService);
     const allUser: User[] = await userService.get();

     return res.status(200).json({
          message: "Request Successfull",
          data: allUser
     })
})

router.post("/",wrap(async(req: Request,res: Response) => {
     const userService: UserService = Container.get(UserService);
     const newUser: User = await userService.create(req.body);
     return res.status(201).json({
          message: "Successfully Created",
          data: newUser
     })
}));

router.post("/login",(req: Request,res: Response) => {
     const userService: UserService = Container.get(UserService);
     
})


export default router;