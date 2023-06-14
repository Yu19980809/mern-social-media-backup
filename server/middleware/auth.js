import jwt from 'jsonwebtoken';

const auth = async ( req, res, next ) => {
  try {
    const token = req.headers.authorization.split( ' ' )[1];
    const isCustomAuth = token.length < 500;
    let decodeData

    // The socond params is the secret for jwt encryption and decryption
    if ( token && isCustomAuth ) {
      decodeData = jwt.verify( token, 'test' );
      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.decode( token );
      req.userId = decodeData?.sub;
    }

    next();
  } catch (error) {
    console.log( error );
  }
}

export default auth;
