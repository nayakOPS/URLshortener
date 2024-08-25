// url.route.mjs
import express from 'express';
import { handleGenerateNewShortURL,handleGetAnalytics } from '../controllers/url.controller.mjs';

const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortID', handleGetAnalytics);

export default router;