import color from 'colors';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator'

//MODEL
import { User } from '../models/user';

//REGISTRATION
export const handleReg = async (req, res) => {
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
}

//LOGIN
export const handleLogin = async (req, res) => {
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
}

//LOGOUT
export const logOut = async (req, res) => {
    try {
        req.session.destroy(() => {
            console.log('out')
            res.redirect('/')
        })
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
}