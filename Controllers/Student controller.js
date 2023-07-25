import { client, objectId } from "../db.js";

export default function getstudents(){
    return client
    .db("stdbtask")
    .collection("students")
    .find()
    .toArray()
}

export function getstudentbyid(id){
    return client
    .db("stdbtask")
    .collection("students")
    .findOne({_id : new objectId(id)});
}

export function deletestudentbyid(id){
    return client
    .db("stdbtask")
    .collection("students")
    .deleteOne({_id : new objectId(id)});
}

export function addstudent(student_data){
    return client
    .db("stdbtask")
    .collection("students")
    .insertOne(student_data)
}
