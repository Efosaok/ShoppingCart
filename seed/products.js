const mongoose = require("mongoose");
const Product = require("../models/appproduct.js");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://efosaokpugie:swampious88@ds143231.mlab.com:43231/shoppp");

const products = [
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879250/images_2_pnbqci.jpg",
		title : "Beats HeadSet",
		description : "Fancy Pink Headset by loraglario",
		price : 20
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494878603/double3_original_200sq_nso5fv.jpg",
		title : "Armani lit up canvas",
		description : "Litted up canvas ,latest in the industry",
		price : 15
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879232/images_9_rye9y1.jpg",
		title : "versace shoes",
		description : "Office Shoes,versace ",
		price : 17
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879221/images_10_lybyig.jpg",
		title : "alamanio laces",
		description : "Brown soft lacers",
		price : 20
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879173/images_11_yyd5dn.jpg",
		title : "TOSHIBA E9",
		description : "Windows 8 mini pc",
		price : 120
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879153/images_1_zym7uq.jpg",
		title : "HUAWEI Pad",
		description : "New Huawei Pad3",
		price :90
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879137/images_13_kjbi1b.jpg",
		title : "Iphone Pouch",
		description : "Xiangou Pouch for Iphone",
		price : 10
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879136/download_2_pt0dot.jpg",
		title : "HP storm",
		description : "Fairly-used PC",
		price : 100
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879109/images_fkrisf.png",
		title : "Iphone 7",
		description : "Tainted black Iphone 7",
		price : 1000
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879090/download_3_wxqmxb.jpg",
		title : "Dell Inspiron",
		description : "Fairly-used DELL pc",
		price : 70
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494878721/images_8_echqwz.jpg",
		title : "Zhang Loafers",
		description : "Premium Zhang Shoes",
		price : 28
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494878694/images_7_ysboef.jpg",
		title : "sacks litt",
		description : "Litted Shoes",
		price : 52
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494872532/images_5_wkjfip.jpg",
		title : "LOSCH hats",
		description : "Get hats for winter",
		price : 20
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494872261/images_4_hzc2lj.jpg",
		title : "Sweaters by Rose",
		description : "Fancy Sweaters",
		price : 30
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494871883/headset_iorlih.jpg",
		title : "beats by DRE",
		description : "White limited v Beats",
		price : 40
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494871673/images_3_l0wzxe.jpg",
		title : "Zippy gadgets",
		description : "Iphone 7 stickers by zippy",
		price : 10
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494871460/download_1_pmt7iz.jpg",
		title : "Fifa 17",
		description : "By EA SPORTS",
		price : 25
	}),

	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494871883/headset_iorlih.jpg",
		title : "beats by DRE",
		description : "White limited v Beats",
		price : 40
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494878694/images_7_ysboef.jpg",
		title : "sacks litt",
		description : "Litted Shoes",
		price : 52	

	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494879250/images_2_pnbqci.jpg",
		title : "Beats HeadSet",
		description : "Fancy Pink Headset",
		price : 20
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494871460/download_1_pmt7iz.jpg",
		title : "Fifa 17",
		description : "By EA SPORTS",
		price : 25
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494871673/images_3_l0wzxe.jpg",
		title : "Zippy gadgets",
		description : "Iphone 7 stickers by zippy",
		price : 10
	}),
	new Product({
		imagePath : "http://res.cloudinary.com/dn93xk5ni/image/upload/v1494872532/images_5_wkjfip.jpg",
		title : "LOSCH hats",
		description : "Get hats for winter",
		price : 20
	})

];
//appending the datas in our mongoDB
let counter = 0
for(i=0;i < products.length;i++){
	products[i].save((err,result)=>{
		counter++;
		if(counter === products.length){
			exit()
		}
	})
}
//disconect from the database
let exit = ()=>{
	mongoose.disconnect();
};