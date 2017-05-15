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
     ack.accept()
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
