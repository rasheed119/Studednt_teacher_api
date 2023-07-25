import express from "express";
import getteachers, {
  add_student_to_teacher,
  addteacher,
  assignedstudent,
  assignstudent,
  find_remove_student,
  getteacherbyid,
  remove_student,
} from "../Controllers/teachers.js";
import {
  deletestudentbyid,
  getstudentbyid,
} from "../Controllers/Student controller.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  const teachers = await getteachers();
  res.status(200).json({ data: teachers });
});

//To get teachers data by their id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const get_teacher = await getteacherbyid(id);
    if (!get_teacher) {
      return res
        .status(500)
        .json({ data: "No Teachers data Found the given id" });
    }
    res.status(200).json({ data: get_teacher });
  } catch (error) {
    res.status(500).json({ Error: error.message });
    console.log(error.message);
  }
});
//To add teachers data
router.post("/add", async (req, res) => {
  try {
    const teacher_data = req.body;
    if (
      !teacher_data.name ||
      !teacher_data.qualification ||
      !teacher_data.gender
    ) {
      return res
        .status(500)
        .json({ data: "Please provide the proper data to add" });
    }
    const add_teacher = await addteacher(teacher_data);
    res
      .status(200)
      .json({ data: add_teacher, message: "Teacher added Successfully" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
    console.log(error.message);
  }
});
//To assign a student to the mentor and to remove student data from the student list
router.post("/assignstudent", async (req, res) => {
  try {
    const id = req.body;
    const teacher_data = await getteacherbyid(id.teacher_id);
    const student_data = await getstudentbyid(id.student_id);
    if (!student_data || !teacher_data) {
      res.status(500).json({ message: "Please provide proper id" });
    }
    const result = await assignstudent(id.teacher_id, student_data);
    await deletestudentbyid(id.student_id);
    res.status(200).json({
      result,
      message: `${student_data.name} is assigned to ${teacher_data.name} Successfully`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
//To assign a student from one mentor to another mentor
router.post("/changementor", async (req, res) => {
  try {
    const { teacher_name, new_teacher_name, student_name } = req.body;
    const find_removed_student = await find_remove_student(
      teacher_name,
      student_name
    );
    if (
      !find_removed_student.students ||
      find_removed_student.students.length === 0
    ) {
      return {
        error: `Student '${student_name}' not found in the teacher '${teacher_name}' list.`,
      };
    }
    const removed_student = find_removed_student.students[0];
    await remove_student(teacher_name, student_name);
    await add_student_to_teacher(new_teacher_name, removed_student);
    res.json({
      message: `Student ${student_name} is assigned to ${new_teacher_name} Successfully`,
    });
  } catch (error) {
    console.log(error.message);
  }
});

export const teachers_router = router;
