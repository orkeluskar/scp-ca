const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))


const jwt = require('jsonwebtoken');
var path = require('path');

const PORT = process.env.port || 8081;

//quorum router
const quorum = require('./routes/quorum');

//importing constants
let rootCA = require('./constants/rootCAs');
let quorumSlice = require('./constants/quorumSlice');

app.get("/", function(req, res){
    res.sendFile(__dirname +  '/index.html');
});

app.use('/', quorum);

let votes = [];


io.on('connection', function(socket){ 
    console.log(quorumSlice);
    socket.on('chat message', function(msg){
        console.log(votes, rootCA);
        if (rootCA.includes(msg.nodeName)){
            if (msg.msg == "add"){
                io.emit('chat message', {
                    nodeName: "NEW MESSAGE",
                    msg: msg.nodeName + " want to a add new Certificate. Agree by replying with 'yes' & disagree by saying 'no'"
                });
            }

         if (msg.msg == "yes" || msg.msg == "no"){
            if (!(votes.includes(msg.nodeName))){
                votes.push(msg.nodeName);
            }

            if (votes.length == rootCA.length){
                if ((votes.length / rootCA.length) < 0.5){
                    io.emit('chat message', {
                        nodeName: "RESULT",
                        msg: "Certificate was declined"
                    });
                }
            }
            
            if ((votes.length / rootCA.length) > 0.5){
                console.log("selected");
                votes = [];
                io.emit('chat message', {
                    nodeName: "RESULT",
                    msg: "Certificate was added"
                });
            }
            
        }
    }
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(PORT, function(req, res){
    console.log("Stellar instance started on port: " + PORT);
});
