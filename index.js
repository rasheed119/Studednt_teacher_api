import express from "express";
import  dotenv  from "dotenv";
import router from "./Router/Students.js";
import { teachers_router } from "./Router/teachers.js";

const app = express();

dotenv.config()

const PORT = process.env.PORT || 5000 ;

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({ Task : "Mentor and Student Assigning with Database" })
})

app.use("/students",router);
app.use("/teachers",teachers_router)

app.listen(PORT,()=>console.log(`Server Started Successfully at port ${PORT}`));