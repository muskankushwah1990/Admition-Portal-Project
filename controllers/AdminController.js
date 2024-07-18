const CourseModel = require('../models/course')
const nodemailer = require('nodemailer')

class AdminController {

    static display = async (req, res) => {
        try {
            const { name, email, image, id } = req.Udata
            const course = await CourseModel.find()
            res.render('admin/display', { n: name, i: image, c: course , msg:req.flash('success')})

        } catch (error) {
            console.log(error)

        }
    }

    static updateStatus = async (req, res) => {
        try {
        //    console.log(req.body)
        const update = await CourseModel.findByIdAndUpdate(req.params.id, {
            status: req.body.status,
            comment:req.body.comment
        })
        req.flash('success', 'Status update successfully !')
        res.redirect('/admin/display')

        } catch (error) {
            console.log(error)

        }
    }

   
    static sendEmail = async (name,email,status,comment,course) => {
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
                subject: ` ${course} course ${status}`, // Subject line
                text: "heelo", // plain text body
                html: `<b>${name}</b> ${course} Course <b>${status}</b>  Successful <br>
                <b> Comment for Admin</b>${comment}
                `, // html body
            });
    }

  
}

module.exports = AdminController;