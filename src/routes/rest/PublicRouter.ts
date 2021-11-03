import { Router } from "express";
import cache from "../../utils/Cache";
import { publicController } from "../../controllers/rest/PublicController";

const router = Router();

router.get("/", cache.route(), publicController.indexAction);

export default router;
