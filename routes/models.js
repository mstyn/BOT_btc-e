/**
 * Created with JetBrains WebStorm.
 * User: freezs
 * Date: 29.05.13
 * Time: 19:46
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose')
    , bcrypt = require('bcrypt')
;
var Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , SALT_WORK_FACTOR = 10
;
var DB = mongoose.connect('mongodb://mstyn:mstyn04@linus.mongohq.com:10050/my01');

var TickerSchema = new Schema ({
    createDate: {type: Date, default: Date.now()}
    , high: {type: Number, default: 0}
    , low: {type: Number, default: 0}
    , avg: {type: Number, default: 0}
    , vol: {type: Number, default: 0}
    , vol_cur: {type: Number, default: 0}
    , last: {type: Number, default: 0}
    , buy: {type: Number, default: 0}
    , sell: {type: Number, default: 0}
    , server_time: {type: Number, default: 0}
});

exports.Ticker = DB.model('Ticker', TickerSchema);

