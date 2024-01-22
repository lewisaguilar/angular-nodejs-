import express, { Application } from 'express'; 
import cors from 'cors'; 
import path from 'path';
import routesClient  from '../routers/client';
import routesUser  from '../routers/user';
import { Client } from './client';
import { User } from './user';
import morgan from 'morgan' 
import indexRoutes from '../routers/photo'
import { Photo } from './photo';
import multer from 'multer';

class Server {
    private app: Application;
    private port: string;
     
 
    constructor () {
        this.app = express();
        this.port = process.env.PORT || '3000';  
        this.dbConnect();
        this.middlewares();
        this.routes();
       
    } 

    listen() {
       this.app.listen(this.port, ()=> {
        console.log('Aplicacion corriendo por el puerto', this.port);
       })        
    }

    middlewares() {
       
       //Parseo del body
       this.app.use(express.json());
       //
       this.app.use(cors()); 
        //
       this.app.use(morgan('dev'));

        // this folders for this application will be used to store public file image
        this.app.use('/uploads', express.static(path.resolve('uploads')));
     
     }

    routes() {
         
          this.app.use('/api/client' , routesClient)   
          this.app.use('/api/users', routesUser);  
          this.app.use('/api', indexRoutes);
          

    }
      async dbConnect() {
        try {
          await Client.sync();
          await User.sync();
          await Photo.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;