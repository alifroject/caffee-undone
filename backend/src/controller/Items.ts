import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import Items from '../models/ItemModels';
import fs from "fs"

export const getItems = async (req: Request, res: Response) => {
  try {
   const response = await Items.findAll();
      res.json(response)
   
  } catch (error) {
    console.log((error as Error).message);
    res.status(500).json({msg: "Internal Server Error"})
  }
}

export const createItems = async (req: Request, res: Response) => {
    const { itemName, category, price } = req.body;

    // Cek apakah req.files dan req.files.file ada
    if (!req.files || !req.files.file) {
        return res.status(400).json({ msg: "File upload is missing or incorrect" });
    }

    const file = req.files.file as UploadedFile;

    // Cek apakah file dan file.data ada
    if (!file || !file.data) {
        return res.status(400).json({ msg: "File data is missing" });
    }

    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image type" });

    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./src/public/image/${fileName}`, async (err) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ msg: err.message });
        }

        try {
            await Items.create({
                name: itemName,
                category: category,
                price: price,
                image: fileName,
                url: url,
                available: true // Set ketersediaan produk ke true saat dibuat
            });
            res.status(201).json({ msg: "Product Created Successfully" });
        } catch (error) {
            console.log((error as Error).message);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    });
};



export const updateItem = async (req: Request, res: Response) => {
    try {
     const item = await Items.findOne({
        where: {
            itemId: req.params.id
        }
     });

     if(!item) return res.status(404).json({msg: "Data produk tidak ditemukkan"});

     let fileName = item.image;


     if(req.files && req.files.file) {
        const file = req.files.file as UploadedFile;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" });
            if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

            const filepath = `./src/public/image/${item.image}`;
            fs.unlinkSync(filepath);
            file.mv(`./public/image/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: "Error uploading image" });
            });
     }

     const { name, category, price, available, } = req.body;
     const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;


     
     await Items.update({
        name: name,
        category: category,
        price: price,
        image: fileName,
        url: url,
        available
     }, {
        where: {
            itemId: item.itemId
        }
     });

     res.status(200).json({msg: "Produk berhasil diperbarui"});


    } catch (err) {
       console.log((err as Error).message);
       res.status(500).json({msg: "Internal server error"})
    }
}

export const deleteItem = async(req: Request, res: Response)=>{
    const item = await Items.findOne({
        where:{
            itemId : req.params.id
        }
    });
    if(!item) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./src/public/image/${item.image}`;
        fs.unlinkSync(filepath);
        await Items.destroy({
            where:{
                itemId : req.params.id
            }
        });
        res.status(200).json({msg: "Product Deleted Successfuly"});
    } catch (error) {
        console.log(( error as Error).message);
    }
};
