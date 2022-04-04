import { Router } from 'express';
const router = Router();
import flash from 'connect-flash';

//COLORS
import color from 'colors'

router.get('/', async (req, res) => {
    try {
        res.render('index', {
            title: 'Home Page',
            HomePage: true,
            registError: flash('registError'),
            loginError: flash('loginError')
        })
    } catch (err) {
        console.log(color.bgRed.black(err))
    }
})

module.exports = router;