var smtp = require('smtp-protocol');

var MailParser = require("mailparser").MailParser;
var mailparser = new MailParser();


var Domain = ['nobey.cn', 'youngon.cn']
var server = smtp.createServer({
  domain: 'nobey.cn'
}, function(req) {
  req.on('greeting', function(to, ack) {
    ack.accept();
  });

  req.on('from', function(to, ack) {
    if (to == '' || to == 'undefined') ack.reject()
    ack.accept();

  });

  req.on('to', function(to, ack) {
    console.log(req.from + '-->' + to);
    var domain = to.split('@')[1] || Domain[0];
    if (Domain.indexOf(domain.toLowerCase())===-1) ack.accept()
    else ack.reject()
  });

  req.on('message', function(stream, ack) {
      mailparser.on("end", function(mail_object) {
        console.log(mail_object)
      })
      stream.pipe(mailparser);
    ack.accept();
  });

});
server.listen(25);
