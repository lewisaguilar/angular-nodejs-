import { Router } from 'express';
import { newclient, getClient, getClientId, putClient, deleteClient } from '../controllers/client'; 


const router = Router();

router.get('/' ,  getClient);
router.post('/', newclient);
router.get('/:id', getClientId);
router.put('/:id', putClient);
router.delete('/:id', deleteClient);


export default router;