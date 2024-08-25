import { nanoid } from 'nanoid';
import URL from '../models/url.model.mjs';

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'URL is Required'});

    const shortID = nanoid();
    // console.log(shortID);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy: req.user._id
    });

    // in response rendering html and returning the shortened id also
    return res.render("home.view.ejs",{ id: shortID });

    // for responding json
    // return res.json({ id: shortID});
};

async function handleGetAnalytics(req,res){
    const shortID = req.prams.shortID;
    const result = await URL.findOne({
        shortID
    });
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    });
};

export {
    handleGenerateNewShortURL,
    handleGetAnalytics
};