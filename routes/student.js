const router = require('express').Router();

const Student = require('../models/student');

router.route("/create").post((req, res) => {

    const name = req.body.name;
    const batch = req.body.batch;
    const age = req.body.age;

    const newStudent = new Student({
        name,
        batch,
        age
    });

    newStudent.save()
        .then(() => res.status(200).json("Student Created Successfully!"))
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });

});

router.route("/:id/addmentor").put((req, res) => {

    const studentId = req.params.id;
    const mentorId = req.body.mentorid;

    Student.findByIdAndUpdate(studentId)
        .then(student => {

            student.mentorid = mentorId;

            student.save()
                .then(() => res.status(200).json(`Assigned/Updated a Mentor for Student ${student.name}`))
                .catch(err => {
                    res.status(400).json('Error: ' + err);
                });

        }).catch(err => {
            res.status(400).json('Error: ' + err);
        });

});

router.get("/", (req, res) => {

    Student.find()
        .then(students => res.status(200).json(students))
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });

});

router.get("/nomentor", (req, res) => {

    Student.find()
        .then(students => {

            let noMentorStudents = [];

            students.forEach(student => {
                if (student.mentorid == undefined) {
                    noMentorStudents.push(student);
                }
            });

            if (noMentorStudents.length > 0) {
                res.status(200).json(noMentorStudents);
            } else {
                res.status(200).json({ message: "All students are assigned with Mentors" });
            }

        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });

});

module.exports = router;