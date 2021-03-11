import express from 'express';
import { getOrigins, postOrigin } from '../controllers';

const router = express.Router();

router.get('/origins', getOrigins);
router.post('/origins', postOrigin);

export default router;
