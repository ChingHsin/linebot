var rp = require('request-promise');

exports.justReply = function justReply(req, res) {

    const promises = req.body.events.map(event => {

        var msg = event.message.text;
        var reply_token = event.replyToken;

        var options = {
            method: 'POST',
            uri: "https://api.line.me/v2/bot/message/reply",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization": " Bearer " + "BYyyeyqo7G4kP+06iDlpxajHID3/g12QX8QPvoy1ED9XnOXY6Rx+8MTN3BEwIWqTf+g5U40+C7ge7K5P4KYhgdt1vvTucL9IFtEEShiY5wse9K4IyEaxw2hbnMlDe8g1owPUmnLCWN1+6xZl62Dj+QdB04t89/1O/w1cDnyilFU="
            },
            json: true,
            body: {
              replyToken: reply_token,
              messages:[
                {
                  "type":"text",
                  "text":msg
                }
              ]
            }
        };

        return rp(options)
        .then(function (response) {
            console.log("Success : " + response);
        }).catch(function (err) {
            console.log("Error : " + err);
        });

    });

    Promise
    .all(promises)
    .then(() => res.json({success: true}));

};
