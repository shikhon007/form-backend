import AppDataSource from "../config/app.config";
import User from "../entity/user.entity";
import { ICreateUser } from "../types/user.interface";
import {Service} from "typedi";

@Service()
export default class UserService {

    constructor() {}
    async create(data: ICreateUser) : Promise<User> {
        let newUser: User = await AppDataSource.getRepository(User).create(data);
        return await AppDataSource.getRepository(User).save(newUser);
    }

    async get(): Promise<User[]>{
       return await AppDataSource.getRepository(User).find();
    }

}