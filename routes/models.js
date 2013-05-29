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



