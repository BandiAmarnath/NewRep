const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Amar', {
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
    const item = new Item(req.body);
    await item.save();
    res.send(item);
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
