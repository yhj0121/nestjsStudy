import {Router} from "express"
import {Cat,CatType} from "../model"
import { createCat,
  deleteCat,
  readAllcat,
  readCat,
  updateCat,
  updatePartialCat,} from "../service/catsService"
const router = Router()
//라우터 서비스 센터
router.get('/cats', readAllcat);
router.get('/cats/:id', readCat);
router.post('/cats', createCat);
router.put('/cats/:id', updateCat);
router.patch('/cats/:id', updatePartialCat);
router.delete('/cats/:id', deleteCat);
export default router;