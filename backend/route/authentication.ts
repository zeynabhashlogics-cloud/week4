/*import express from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const router = express.Router();

const adapter = new PrismaPg ({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({adapter});

router.post("/registeration",async(req,res)=>
{
    try{
        const {name ,password , email}= req.body;

        if (!name  || !email || !password)
    {
        return res.status(400).json({
            message :"name , password and email are required ",
        });
    }
const emailvalidity= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailvalidity.test(email))
    {
return res.status(400).json({
    message : "valid email is needed",
});
    }
    if ()
 }

})*/

