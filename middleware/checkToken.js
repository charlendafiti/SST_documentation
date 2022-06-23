function checkToken(req, res, next){
    // if(req.headers.token == 'c186c30450a61d9b3ac71748ac9b866bb477e945'){
    //     next();
    // } else {
    //     res.status(401).send({error: true, message: 'Unauthorized'});
    // }
    next();
}

module.exports = checkToken;