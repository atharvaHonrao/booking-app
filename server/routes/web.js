import express from 'express'
const router = express.Router();
import UserControls from '../controlers/userControlls.js'

router.post('/register', UserControls.register)
router.get('/register', UserControls.login)



// router.get('/', UserControls.home)
// router.post('/', UserControls.homepost)

// router.get('/home', UserControls.homepage)

// router.get('/register', UserControls.home)

// router.get('/login', UserControls.loginpage)

// router.post('/login', UserControls.userlogin)

// router.get('/upload', UserControls.upload)

export default router