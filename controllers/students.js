const fs = require('fs');
const data = require("../data.json");
const { date, education } = require("../utils");
const Intl =require('intl');

// Index
exports.index = function(req, res) {

    const students = []

    for (let student of data.students) {

        students.push({
        ...student,
        grade: education(student.grade)
        })
    }

    return res.render("students/index", { students });
}

// Create
exports.create =  function(req, res) {
    return res.render("students/create");
}

// Post
exports.post = function(req, res) {    
    const keys = Object.keys(req.body);

    for (key of keys) {
       if (req.body[key] == "") {
           return res.send("Please fill out all fields in the form!");
       } 
    }    

    birth = Date.parse(req.body.birth);
    const created_at = Date.now();
    
    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
        id = lastStudent.id + 1;
    }

    data.students.push({
        id,       
        ...req.body,        
        birth,        
        created_at        
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!");
        }        

        return res.redirect("/students");
    });    
}

// Show
exports.show = function(req, res) {
    const { id } = req.params 

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    });

    if (!foundStudent) {
        return res.send("student not found");
    }

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        grade: education(foundStudent.grade),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at)
    }

    return res.render("students/show", { student });
}

// Edit
exports.edit = function(req, res) {
    const { id } = req.params 

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    });
    
    if (!foundStudent) {
        return res.send("student not found");
    } 

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso,
        grade: education(foundStudent.grade)        
    }   
    return res.render('students/edit', { student })
}

// Update
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0;

    const foundStudent = data.students.find(function(student, foundIndex) {
        if (id == student.id) {
            index = foundIndex;
            return true
        }
    });

    if (!foundStudent) {
        return res.send("student not found!");
    }

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),        
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write error!");
        }

        return res.redirect(`/students/${id}`);
    })
}

// Delete 
exports.delete = function(req, res) {
    const { id } = req.body;

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id;
    })

    data.students = filteredStudents;

    fs.writeFile('data.json',JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect('/students');
    });
}