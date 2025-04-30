import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(res,file,cb)=> {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage});

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);



export default foodRouter;

// mongodb+srv://durgeshsinghchauhan974:<db_password>@cluster0.o1hpt.mongodb.net/?