const CourseModel = require('../models/course')
const nodemailer = require('nodemailer')

class CourseController {

    static courseInsert = async (req, res) => {
        try {
            //console.log(req.body)
            const { name, email, phone, dob, address, gender, education, course } = req.body
            const result = new CourseModel({
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                address: address,
                gender: gender,
                education: education,
                course: course,
                user_id: req.Udata.id
            })
            await result.save()
            res.redirect('/courseDisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static courseDisplay = async (req, res) => {
        try {
            const { name, email, image, id } = req.Udata
            const course = await CourseModel.find({ user_id: id })
            // console.log(course);    
            res.render('course/display', { n: name, i: image, c: course })
            //console.log(req.body)

        } catch (error) {
            console.log(error)
        }
    }

    
    static courseView = async (req, res) => {
        try {
            const { name, image, id } = req.Udata
            console.log(req.params.id)
            const courseview = await CourseModel.findById(req.params.id)
            // console.log(courseview);
            res.render('course/view', { n: name, i: image, c: courseview })
        }
        catch (error) {
            console.log(error);
        }
    }

    static courseEdit = async (req, res) => {
        try {
            const { name, image, email, id } = req.Udata
            const courseview = await CourseModel.findById(req.params.id)
            //console.log(courseview);
            res.render('course/edit', { n: name, i: image, e: email, c: courseview })
        }
        catch (error) {
            console.log(error);
        }
    }

    static courseUpdate = async (req, res) => {
        try {
            const { name, email, phone, dob, address, gender, education, course } = req.body
            const courseview = await CourseModel.findByIdAndUpdate(req.params.id, {
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                address: address,
                gender: gender,
                education: education,
                course: course,
            })

            res.redirect('/courseDisplay')
        }
        catch (error) {
            console.log(error);
        }
    }

    
    static courseDelete = async (req, res) => {
        try {
            const { name, image, id } = req.Udata
            await CourseModel.findByIdAndDelete(req.params.id)
            res.redirect('/courseDisplay');
        } catch (error) {
            console.log(error);
        }
    }

    static sendEmail = async (name, email, course) => {
        // console.log(name,email,status,comment)
        // connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "mkkushwah376@gmail.com",
                pass: "xhvqxmdjojyohesq",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: ` Course Insert`, // Subject line
            text: "heelo", // plain text body
            html: `<b>${name}</b>  <b>${course}</b> Course Successful Insert! <br>
            `, // html body
        });
    }


}
module.exports = CourseController