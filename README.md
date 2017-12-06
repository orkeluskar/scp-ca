# Implementation	

We’ve written a mock implementation in javascript using NodeJs, JsonWebTokens & sockets. This also serves as a good visual representation of the protocol over the network. Other advantage of using NodeJS would be the non-blocking IO.
	
`Network:` We developed some REST APIs & used sockets(socket.io) for nodes to communicate. Anyone could join the quorum (channel), as it is decentralized. For sanity purposes we kept the same public key for every node, so that they could decode the JSON Web Token & verify the signature and send the message by encoding it with the private key.

`Node:` Each node would creates its own copy of the log. Newer messages would be added to the appropriate slot.

`Quorum & quorum slice:` Quorum selection is pretty unclear, but we try to do it over reputation of a node (e.g. NYU rather than our node). New nodes can join the network & create their own quorum slice from whom they trust.

`Messages`: 