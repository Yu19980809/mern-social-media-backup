import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/PostsRoute.js';
import userRoutes from './routes/UserRoute.js';

// config
dotenv.config();

// init app
const app = express();

// middleware
app.use( bodyParser.json( { limit: '30mb', extend: true } ) );
app.use( bodyParser.urlencoded( { limit: '30mb', extended: true } ) );
app.use( cors() );

// routes
app.use( '/api/v1/posts', postRoutes );
app.use( '/api/v1/user', userRoutes );

// mongodb
const connectDB = async ( url, port ) => {
  mongoose.set( 'strictQuery', true );
  await mongoose.connect( url )
  console.log( 'Connected to mongodb' );
  app.listen( port, () => {
    console.log( `Server has started on port ${ port }` )
  } )
}

connectDB( process.env.MONGODB_URI, process.env.PORT || 5000 );
