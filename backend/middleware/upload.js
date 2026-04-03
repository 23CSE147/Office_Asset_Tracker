const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/");

},

filename:(req,file,cb)=>{

const unique=

Date.now()+

path.extname(file.originalname);

cb(null,unique);

}

});

const fileFilter=(req,file,cb)=>{

if(file.mimetype.startsWith("image")){

cb(null,true);

}else{

cb(new Error("Only Images Allowed"));

}

};

const upload=multer({

storage,

fileFilter

});

module.exports=upload;