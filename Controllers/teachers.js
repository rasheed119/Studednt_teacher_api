import { client, objectId } from "../db.js";
import { ObjectId } from "mongodb";

export default function getteachers() {
  return client.db("stdbtask").collection("teachers").find({}).toArray();
}

export function getteacherbyid(id) {
  return client
    .db("stdbtask")
    .collection("teachers")
    .findOne({ _id: new objectId(id) });
}

export function assignstudent(id, student_data) {
  return client
    .db("stdbtask")
    .collection("teachers")
    .updateOne(
      { _id: new objectId(id) },
      { $push: { students: student_data } }
    );
}

export function assignedstudent(teacher_id, student_id) {
  return client
    .db("stdbtask")
    .collection("teachers")
    .findOneAndUpdate(
      { _id: ObjectId(teacher_id) },
      { $pull: { students: ObjectId(student_id) } }
    );
}

export function find_remove_student(teacher_name, student_name) {
  return client
    .db("stdbtask")
    .collection("teachers")
    .findOne(
      { name: teacher_name },
      { projection: { students: { $elemMatch: { name: student_name } } } }
    );
}

export function remove_student(teacher_name, student_name) {
  return client
    .db("stdbtask")
    .collection("teachers")
    .updateOne(
      { name: teacher_name },
      { $pull: { students: { name: student_name } } }
    );
}

export function add_student_to_teacher(teacher_name, student_data) {
  return client
    .db("stdbtask")
    .collection("teachers")
    .findOneAndUpdate(
      { name: teacher_name },
      { $push: { students: student_data } }
    );
}

export function addteacher(teacher_data) {
  return client.db("stdbtask").collection("teachers").insertOne(teacher_data);
}
