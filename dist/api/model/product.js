"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.default.Schema.Types.String,
        require: true
    },
    description: {
        type: mongoose_1.default.Schema.Types.String,
        require: true
    },
    richDescription: {
        type: mongoose_1.default.Schema.Types.String,
        default: ''
    },
    image: {
        type: mongoose_1.default.Schema.Types.String,
        default: ''
    },
    images: [{
            type: String
        }],
    brand: {
        type: mongoose_1.default.Schema.Types.String,
        default: ''
    },
    price: {
        type: mongoose_1.default.Schema.Types.Number,
        default: 0
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    countInStock: {
        type: mongoose_1.default.Schema.Types.Number,
        require: true,
        min: 0,
        max: 250
    },
    rating: {
        type: mongoose_1.default.Schema.Types.Number,
        default: 0
    },
    isFeatured: {
        type: mongoose_1.default.Schema.Types.Boolean,
        default: false
    },
    dateCreated: {
        type: mongoose_1.default.Schema.Types.Date,
        default: Date.now()
    }
});
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
productSchema.set('toJSON', {
    virtuals: true
});
exports.Product = mongoose_1.default.model("product", productSchema);
