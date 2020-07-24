const hbs = require('hbs');
require('dotenv/config');

hbs.registerHelper('toUrl', (slug) => {
    return `${process.env.SERVER}/${slug}`;
})