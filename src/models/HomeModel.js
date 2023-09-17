const mongoose = require('mongoose');

const HomeSchema  = new mongoose.Schema({
    titulo: { type: String, required: true },
    nome: String
});

const HomeModel = mongoose.model('Home', HomeSchema);
