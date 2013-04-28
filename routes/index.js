/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'BOT for btc-e.com' });
};