import { Router } from 'express';
const router = Router();

//COLORS
import color from 'colors'


router.get('/', async (req: any, res: any) => {
    try {
        res.render('index', {
            title: 'Home Page',
            HomePage: true,
            registError: req.flash('registError'),
            loginError: req.flash('loginError')
        })
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

module.exports = router;