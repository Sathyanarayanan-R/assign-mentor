const router = require('express').Router();

const Mentor = require('../models/mentor');
const Student = require('../models/student');

router.route("/create").post((req, res) => {

    const name = req.body.name;
    const stream = req.body.stream;
    const availability = req.body.availability;

    const newMentor = new Mentor({
        name,
        stream,
        availability
    });

    newMentor.save()
        .then(() => res.status(200).json({message: "Mentor Created Successfully!"}))
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });

});

router.route("/:id/addstudent").post((req, res) => {

    const mentorId = req.params.id;
    const studentId = req.body.studentid;

    Student.findById(studentId)
        .then(student => {
            if (student.mentorid == undefined) {
                student.mentorid = mentorId;

                student.save()
                    .then(() => {
                        res.status(200).json({message: `Assigned a Mentor for Student ${student.name}`});
                        return;
                    });
            } else {
                res.status(409).json({ message: `Student ${student.name} is already assigned with Mentor. Hence, Please assign to some other student who is not assigned with mentor yet / Please change the Mentor for particular student by choosing that student` });
                return;
            }
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });

});

router.get("/", (req, res) => {

    Mentor.find()
        .then(mentors => res.status(200).json(mentors))
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });

});

router.get("/:id/listallstudents", (req, res) => {

    const mentorStudents = [];

    Mentor.findById(req.params.id)
        .then((mentor) => {
            mentorStudents.push({ "Mentor Name": mentor.name });

            Student.find()
                .then((students) => {
                    students.forEach(student => {
                        if (student.mentorid == req.params.id) {
                            mentorStudents.push(student);
                        }
                    });
                    if (mentorStudents.length > 0)
                        res.status(200).json(mentorStudents);
                    else
                        res.status(200).json({ message: "No Student is assigned to given mentor." });
                })
                .catch(err => {
                    res.status(400).json('Error: ' + err);
                });
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });

});

module.exports = router;

