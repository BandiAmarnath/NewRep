import express from "express"
import mongoose from "mongoose"
// import AB from './schema/user.js'
import product from './schema/product.js'

const app=express();
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(express.json());

mongoose.connect('mongodb+srv://bandiamarnath767:Amar1234@cluster1.a6a6z2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
.then(()=>{
    console.log("COnnected to mongoDB")
})
.catch((err) => {
    console.log("Unsucessfull Connection", err)
})

app.get("/students/info",function(req,res){
    res.send("this is about page");
});

// mongoose.Schema=new S

app.get("/",function(req,res){
    res.send("<h1>This is  home page</h1>");
});

// app.post("/", async (req,res)=>{
//    const{ name,age}=req.body;
//     const newUser = User({name, age})
//     await newUser.save();
//     res.send("data recived")
//     // console.log(name+" "+roll)
//});
app.post("/", async (req,res)=>{
    console.log("in post route")
    const{ productname,prodprice}=req.body;
    console.log("req.body", req.body)
     const newprod = product({productname, prodprice})
     await newprod.save();
     res.send("data recived")
     // console.log(name+" "+roll)
 });


app.put("/", async(req, res) => {
    var { productname, prodprice } = req.body;
    //productname=productname+"Ramaa";
    //console.log("PUT Request: " + productname + " " + prodprice);
    const updatedProduct = await Product.findOneAndUpdate(
        { prodprice: prodprice }, // Find the product by prodprice (or another identifier)
        { productname: productname }, // Update the product name
        { new: true } // Return the updated document
    );

    res.send("Data Updated Succesfully");
});

// app.delete("/", (req, res) => {
//     var { name, roll } = req.body;
//     name="";
//     console.log("DELETE Request: " + name +" " + roll);
//     res.send("Data deleted successfully!");
// });

app.listen(5000,function(){
    console.log("server running port 5000");
});

// mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2")
