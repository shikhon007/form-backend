import 'reflect-metadata';
import express, { Application,Request,Response, NextFunction } from "express";
import cors from "cors";
import AppDataSource from "./config/app.config";
import { appConfig } from "./config/app.config";
import userRouter from "./route/user.route";

const app: Application = express();

(async function(){
  
  await AppDataSource.initialize();
  console.log("connected to the postgres database");




process.on("uncaughtException",(err:any) => {
    console.log("uncaught exception",err.message);
    process.exit(1);
 })

 process.on("unhandledRejection",(err:any) => {
   console.log("unhandle rejection",err.message);
   process.exit(1);
 })


 
  


  app.use(express.json());
  app.use(cors({
     origin: appConfig.corsOrigin
  }))

  app.use("/api/user",userRouter);

  app.use((err: Error,req:Request,res: Response,next: NextFunction) => {
        console.log(err);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
            reason: err.message
        });
  })



  app.listen(appConfig.port,() => console.log(`listening to the port ${appConfig.port}`))
})()