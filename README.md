# Implementation	

We’ve written a mock implementation in javascript using NodeJs, JsonWebTokens & sockets. This also serves as a good visual representation of the protocol over the network. Other advantage of using NodeJS would be the non-blocking IO.
	
`Network:` We developed some REST APIs & used sockets(socket.io) for nodes to communicate. Anyone could join the quorum (channel), as it is decentralized. For simplicity purposes we kept the same public key for every node, so that they could decode the JSON Web Token & verify the signature and send the message by encoding it with the private key.

`Node:` Each node would creates its own copy of the log. Newer messages would be added to the appropriate slot.

`Quorum & quorum slice:` Quorum selection is pretty unclear, but we try to do it over reputation of a node (e.g. NYU rather than our node). New nodes can join the network & create their own quorum slice from whom they trust.

`Slot:` Each node would create its own copy of the log. Newer messages would be added to the appropriate slot.


## Getting started

Pre-requisite: npm/node installed

1. `npm install`
2. `nodemon index`
3. Visit localhost:8081 or localhost:PORT specified in the local environment


## Working

1. Every node can join by visiting `localhost:8081` & entering it's nodename for simplicity (De-centralized)
2. Each newcoming node can create its own quorum splice by selecting reputable nodes
3. Nodes send messages over sockets in our implementation
4. `add` command from any CA will issue a request to all other nodes in Quorum to reply & reach a consensus
5. `yes` would mean they agree & `no` would mean they disagree on the issuance of certificate
6. If enough votes are seen in a splice other nodes agree too & the statement is ratified
7. If there's a blocking state the network tries to neutralize the statement
8. If all goes well we get to a result, whether to issue the certificate or not by looking at the ratified message