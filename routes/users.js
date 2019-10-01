import express from 'express';
const router = express.Router();
import controller from '../controllers/users';

/* GET users listing. */
router.get('/', (req, res, next) => {
  controller.getAll(req, res, next);
});
router.post('/login', (req, res, next) => {
  controller.login(req, res, next);
});


export default router;
