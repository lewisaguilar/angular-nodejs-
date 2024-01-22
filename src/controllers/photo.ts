import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
import { Photo, IPhoto } from '../models/photo';

// Models
//import Photo, { IPhoto } from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.findAll();
    return res.json(photos);
};

export async function createPhoto(req: Request, res: Response) {
    const { title, description } = req.body;
   
    try {
        // Guardarmos usuario en la base de datos
        await Photo.create({
            title: title,
            description: description,
            imagePath:req.file.path
        })
    
        res.json({
            msg: `Usuario ${title} creado exitosamente!`
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
   
};

export async function getPhoto(req: Request, res: Response) {
   const { id } = req.params;
   const photo  = await Photo.findByPk(id);
 if ( photo ) {
    res.json(photo);
   }else {
     res.status(404).json({ 
     msg: `No existe una photo con el id ${id}`
      });      
   }   
}

export async function updatePhoto(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
  try {
      const photo  = await Photo.findByPk( id );
      if ( !photo ) {
       return res.status(404).json({ 
       msg: 'No existe una photo con el id ' + id 
  });
 }   
    await photo.update( body );
     res.json( photo );
 
} catch (error) {
    console.log(error);
    res.status(500).json({
    msg: 'Hable con el administrador'
   })
  } 
}  

export async function deletePhoto(req: Request, res: Response) {
    const { id } = req.params;
   try {
        const photo  = await Photo.findByPk( id );
        if ( !photo ) {
         return res.status(404).json({ 
         msg: 'No existe una photo con el id ' + id 
    });
   }   
   await photo.destroy();
   await fs.unlink(path.resolve(photo.imagePath));
   res.json({ message: 'Deleted photo' });  
  
  } catch (error) {
      console.log(error);
      res.status(500).json({
      msg: 'Hable con el administrador'
     })
    } 
}