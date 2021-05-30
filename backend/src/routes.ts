import { Router } from "express"
import multer from "multer"

import uploadConfig from "./config/upload"
import OrphanagesController from "./controllers/OrphanagesController"

const routes = Router()
const upload = multer(uploadConfig)

routes.get("/orphanages", OrphanagesController.index)

routes.get("/orphanages/:id", OrphanagesController.show)

routes.use(upload.array("images"))

routes.post("/orphanages", OrphanagesController.create)



export default routes