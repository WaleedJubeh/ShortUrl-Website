const router = require('express').Router();
const yup = require('yup');
const { nanoid } = require('nanoid');
const Url = require('../db/modules/url');
require('dotenv/config');

let stringValidator = yup.object().shape({
    slug: yup.string().required(),
    url: yup.string().trim().url().required(),
});

router.get('/', function (req, res) {
    let error = req.cookies.error;
    console.log(error);
    res.clearCookie("error");
    res.render('index', { url: req.query.slug , error});
})

router.post('/url', async (req, res, next) => {
    try {
        const { url } = req.body;
        const slug = nanoid(5).toLocaleLowerCase();
        let urlObject = {
            url,
            slug,
        };
        await stringValidator.validate(urlObject);
        let newUrl = new Url(urlObject);
        await newUrl.save();
        res.redirect(`/?slug=${slug}`);
    } catch (error) {
        console.log(error.message);
        next(error);
    }

});
router.use((error, req, res, next) => {
    console.log('Im here',req.cookies);
    res.cookie("error", error.message);
    res.redirect('/');
})
router.get('/404', function (req, res) {
    res.render('404');
});

router.get('/:slug', async (req, res) => {
    const slug = req.params.slug;
    let urlObj = await Url.findOne({ slug });
    if (urlObj)
        res.redirect(urlObj.url);
    else
        res.redirect('/404')
});


module.exports = router;