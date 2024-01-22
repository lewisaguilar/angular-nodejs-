import { Request , Response } from "express"; 
import { Client } from "../models/client";
import bcrypt from 'bcrypt';

///////////////////// get - Buscar todos los clientes //////////
export const getClient = async (req: Request, res: Response) => {
   const listClient = await Client.findAll();

   res.json(listClient)
}

/////////////////  get - Buscar clientes por ID ////////////
export const getClientId = async (req: Request, res: Response) => {
    
   const {id} = req.params;
   const client  = await Client.findByPk(id);
   if ( client ) {
      res.json(client);
    } else {
          res.status(404).json({ 
           msg: `No existe un cliente con el id ${id}`
          });      
     }   
 }

 ////////////////////delete
export const deleteClient = async (req: Request, res: Response) => {
    
   const {id} = req.params;
   const client = await Client.findByPk(id);
   
      if ( !client ) {
       
         return res.status(404).json({ 
           msg: 'No existe un cliente con el id ' + id 
      });   
   }
   await client.destroy();
   res.json( client );
   
     
 }   

 ///////////////////// post  ingresar///////
 export const newclient  = async (req: Request, res: Response) => {

   const { username, password, correo } = req.body;
   
   // Validamos si el usuario ya existe en la base de datos
   const clien = await Client.findOne({ where: { username: username } });

   if(clien) {
      return res.status(400).json({
           msg: `Ya existe un usuario con el nombre ${username}`
       })
   } 

   const hashedPassword = await bcrypt.hash(password, 10);
   
   try {
       // Guardarmos usuario en la base de datos
       await Client.create({
           username: username,
           password: hashedPassword,
           correo:   correo
       })
   
       res.json({
           msg: `Usuario ${username} creado exitosamente!`
       })
   } catch (error) {
       res.status(400).json({
           msg: 'Upps ocurrio un error',
           error
       })
   }
 }

 ////------------ put  ---atualizar 
 export const putClient  = async (req: Request, res: Response) => {
        
   const { id } = req.params;
   const { body } = req;
   try {
       const client = await Client.findByPk( id );
       if ( !client ) {
          return res.status(404).json({ 
            msg: 'No existe un usuario con el id ' + id 
     });
    }   

       await client.update( body );
        res.json( client );
    
   } catch (error) {
       console.log(error);
       res.status(500).json({
       msg: 'Hable con el administrador'
      })
   } 

}  







