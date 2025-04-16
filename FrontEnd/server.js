import express from "express"
import mongoose from "mongoose"
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// MongoDB Connection
mongoose.connect(process.env.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// Mongoose Schema and Model
const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

const Item = mongoose.model('Item', ItemSchema);
// CREATE
app.post('/items', async (req, res) => {
    const obj = new Item(req.body);
    await obj.save();
    res.send("scuess postd");
});

// READ ALL
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});
// READ ONE
app.get('/items/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.send(item);
});

// UPDATE
app.put('/items/:id', async (req, res) => {
    console.log(req.params.id)
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(item);
});
// DELETE
app.delete('/items/:id', async (req, res) => {
    
    await Item.findByIdAndDelete(req.params.id);
    res.send({ message: 'Item deleted' });
});
// Start Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

