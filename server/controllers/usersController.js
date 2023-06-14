import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const signIn = async ( req, res ) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne( { email } );
    if ( !existingUser ) return res.status( 404 ).json( { message: "User does't exist." } );

    const isPsswordCorrect = bcrypt.compare( password, existingUser.password );
    if ( !isPsswordCorrect ) return res.status( 400 ).json( { message: 'Invalid credentials.' } );

    // The socond params is the secret for jwt encryption and decryption
    const token = jwt.sign( { email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' } );
    res.status( 200 ).json( { result: existingUser, token } );
  } catch (error) {
    res.status( 500 ).send( error );
  }
};

const signUp = async ( req, res ) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    if ( password !== confirmPassword ) return res.status( 400 ).json( { message: "Passwords don't match." } );

    const existingUser = await User.findOne( { email } );
    if ( existingUser ) return res.status( 400 ).json( { message: 'User already exists.' } );

    const hashedPassword = await bcrypt.hash( password, 12 );
    const newUser = await User.create( { email, password: hashedPassword, name: `${ firstName } ${ lastName }` } );
    // The socond params is the secret for jwt encryption and decryption
    const token = jwt.sign( { email: newUser.email, id: newUser._id }, 'test', { expiresIn: '1h' } );
    res.status( 200 ).json( { result: newUser, token } );
  } catch (error) {
    res.status( 500 ).send( error );
  }
};

export { signIn, signUp };
