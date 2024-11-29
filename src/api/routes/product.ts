import { Router } from "express";
import { checkSchema } from "express-validator";
import { product_Schema } from "../utils/validationSchema";
import * as productController from "../controller/productController";
import { isOwnerOrAdmin } from "../middleware";
import multer from "multer";
import path from "path";
const router: Router = Router();

const FILE_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
} as const;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE[file.mimetype as keyof typeof FILE_TYPE];
        let uploadError: Error | null = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        const uploadPath = path.join(process.cwd(), 'public', 'uploads'); // Đường dẫn từ thư mục gốc
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const filename = file.originalname.split(' ').join('-');

        if (!Object.keys(FILE_TYPE).includes(file.mimetype)) {
            return cb(new Error('Unsupported file type'), '');
        }

        const extension = FILE_TYPE[file.mimetype as keyof typeof FILE_TYPE];

        cb(null, `${filename}${Date.now()}.${extension}`);
    }
})

const uploadOptions = multer({ storage: storage })


router.get("/", productController.getAll_Product);
router.get("/:id", productController.getProductById);
router.post("/", isOwnerOrAdmin, uploadOptions.single('image'), checkSchema(product_Schema), productController.addProduct);
router.put("/:id", isOwnerOrAdmin, checkSchema(product_Schema), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/get/count", productController.countProduct);
router.get("/featured/:count", productController.productsFeatured);

export default router;
