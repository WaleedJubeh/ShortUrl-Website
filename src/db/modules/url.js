const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UrlSchema = new Schema({
    url: {
        type: String,
        required:true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    }
});

const Url = mongoose.model('url', UrlSchema);
module.exports = Url;