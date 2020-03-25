import express from 'express';
import controller from '../controllers/claims';
const router = express.Router();

/* GET home page. */
router.get('/meta', (req, res, next) => {
  controller.getUserClaimMeta(req, res, next);
});

export default router;
