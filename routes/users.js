import express from 'express';
const router = express.Router();
import controller from '../controllers/users';
import checkToken from '../utils/tokenMiddleware';

/* GET users listing. */
router.get('/', checkToken, (req, res, next) => {
  controller.getAll(req, res, next);
});
router.post('/login', (req, res, next) => {
  controller.login(req, res, next);
});


export default router;
