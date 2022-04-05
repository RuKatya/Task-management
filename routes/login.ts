import { Router } from 'express';
const router = Router();
import color from 'colors';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'
//MODEL
import { User } from '../models/user';
// KEYS
const keys = require('../keys/index')

const { validationResult } = require('express-validator')
const { registerValidators, loginValidators } = require('../utils/validators')


//NODEMAILER
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: keys.EMAIL_USER,
//         pass: keys.EMAIL_PASS
//     }
// })

// function sendRegMail(mail, name, password) {
//     return {
//         from: keys._FROM,
//         to: mail,
//         subject: "Seccess Registration",
//         html: `<h1>Welcome ${name}</h1><p>Youre password is ${password}</p>`
//     }
// }

//LOGIN
router.post('/login', loginValidators, async (req: any, res: any) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const condidate = await User.findOne({ email })

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('loginError', errors.array()[0].msg)
            return res.status(422).redirect('/')
        }

        if (condidate) {
            try {
                const areSame = await bcrypt.compare(password, condidate.password)

                if (areSame) {
                    req.session.user = condidate
                    req.session.isAuthenticates = true

                    req.session.save(err => {
                        if (err) {
                            throw err
                        }
                        console.log(`get in ${email}`)
                        // res.redirect('/auth/success')
                    })
                } else {
                    req.flash('loginError', 'Wrong password')
                    console.log(`the pass wrong`)
                    res.redirect('/')
                }
            } catch (error) {
                console.log(color.bgRed.black(error))
            }
        } else {
            req.flash('loginError', 'User not exist')
            console.log(`user not exist`)
            res.redirect('/')
        }
    } catch (error) {
        console.log(color.bgRed.black(error))
    }
})


//REGISTRATION
router.post('/regist', registerValidators, async (req: any, res: any) => {
    try {
        const { email, password, repeat, name } = req.body
        console.log(email, password, repeat, name)
        const condidate = await User.findOne({ email })

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('registError', errors.array()[0].msg)
            console.log(errors.array()[0].msg)
            return res.status(422).redirect('/')
        }

        if (condidate) {
            try {
                req.flash('registError', 'User exist')
                console.log('user exist')
                res.redirect('/')
            } catch (error) {
                console.log(color.bgRed.black(error))
            }
        } else {
            if (password === repeat) {
                const hashpassword = await bcrypt.hash(password, 10)

                const user = new User({
                    email, name, password: hashpassword, tasks: { items: [] }
                })

                try {
                    await user.save()
                    console.log('reg user')
                    // transporter.sendMail(sendRegMail(user.emil, user.name, user.password), (error, info) => {
                    // if (error) {
                    //     console.log(error);
                    // } else {
                    //     console.log('Email sent: ' + info.response);
                    // }
                    // })
                    res.render('page/regSuccess', {
                        title: "Success",
                        user
                    })
                } catch (error) {
                    console.log(color.bgRed.black(error))
                }
            } else {
                console.log(`the pass and repeat is not the same`)
            }
        }
    } catch (error) {
        console.log(color.bgRed.black(error))
    }
})

router.get('/success', (req: any, res: any) => {
    res.render('page/regSuccess', {
        title: "Success"
    })
})

module.exports = router;
