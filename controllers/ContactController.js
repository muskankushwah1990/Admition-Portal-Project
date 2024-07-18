const ContactModel = require('../models/contact');

class ContactController{

    static contactInsert = async(req,res)=>{
        try{

            const {first_name,last_name,email,message} = req.body;
            
            if(first_name && last_name && email){
               
                const result = new ContactModel({
                    first_name:first_name,
                    last_name:last_name,
                    email:email,
                    message:message,
                    user_id: req.Udata.id
                })

                const contactdata = await result.save();
               
                if (contactdata) {
                    req.flash('success','Message saved successfully');
                    res.redirect('/contact')
                }else{
                    req.flash("error", "Message not saved.");
                    res.redirect("/contact");
                }
              
            }else{
                req.flash('error','all fields are required');
                res.redirect('/contact');
            }
           
        }catch(error){
            console.log(error);
        }
    }

    static contactView = async(req,res)=>{
        try{
            const {name,image,email,id} = req.Udata;

            const contacts = await ContactModel.find({user_id:id})
          
            res.render('contact-view',{name:name,image:image,email:email,contacts:contacts});
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = ContactController;