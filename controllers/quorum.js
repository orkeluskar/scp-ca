let quorumSlice = require('../constants/quorumSlice');
let quorum = require('../constants/rootCAs');

exports.createSlice =  function(req, res){
    // if slice in memory includes the given slice, then dont add
    console.log(req.body);

    if (quorumSlice[req.body.nodeName] == undefined){
        quorumSlice[req.body.nodeName] = req.body.val;

        console.log(quorumSlice);

        return res.send({
            error: false,
            message: "added to the slice"
        });

    }
    else{
        console.log(quorumSlice);
        return res.send({
            error: true,
            message: "already in a slice"
        })
    }
}

// display all the CAs in quorum
exports.veiwQuorum = function(req, res){
    res.send(quorum);
}


