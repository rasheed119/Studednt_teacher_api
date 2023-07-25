import express from "express";
import getstudents, { addstudent, getstudentbyid } from "../Controllers/Student controller.js";


const router = express.Router();

router.get("/all",async(req,res)=>{
    const student = await getstudents();
    res.status(200).json({data : student});
})

router.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const get_student = await getstudentbyid(id);
        if(!get_student){
            return res.status(500).json({data : "User Not Found"})
        }
        res.status(200).json({data : get_student});
    } catch (error) {
        res.status(500).json({Error : error.message});
        console.log(error.message);
    }
})

router.post("/add",async(req,res)=>{

    try {
        const student_data = req.body;
        if(!student_data.name || !student_data.batch || !student_data.qualification || !student_data.gender){
            return res.status(500).json({data : "Please Provide proper details to add"})
        }
        const add_student = await addstudent(student_data);
        res.status(200).json({data : add_student,message : "Student Added Successfully"})
    } catch (error) {
        res.status(400).json({message : error.message});
    }
})

export default router;