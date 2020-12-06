const {
    date,
    education
} = require("../../lib/utils");

const Student = require("../models/student");

module.exports = {
    index(req, res) {
        Student.all(function(students) {

            return res.render('students/index', { students });
        });        
    },
    create(req, res) {
        Student.teachersSelectOptions(function(options) {
            return res.render('students/create', { teacherOptions: options });
        });       
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill out all fields in the form!");
            }
        }

        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`);
        });
    },
    show(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found!");

            student.birth_date = date(student.birth_date).birthDay;
            student.education_level = education(student.education_level);            
            student.created_at = date(student.created_at).format;

            return res.render("students/show", { student });
        });
    },
    edit(req, res) {
        Student.find(req.params.id, function(student) {
            if(!student) return res.send("Student not found!");

            student.birth_date = date(student.birth_date).iso;
            student.education_level = education(student.education_level); 
            
            Student.teachersSelectOptions(function(options) {
                return res.render('students/edit', { student, teacherOptions: options });
            });
        });
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill out all fields in the form!");
            }
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`);
        });
    },
    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`);
        });
    }
}