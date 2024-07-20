const Shoes = require('../models/Shoes');

// Get all shoes
exports.getAllShoes = async (req, res) => {
  try {
    const shoes = await Shoes.find();
    res.status(200).json(shoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a shoe by ID
exports.getShoeById = async (req, res) => {
  try {
    const shoe = await Shoes.findById(req.params.id);
    if (!shoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json(shoe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Create a new shoe
exports.createShoe = async (req, res) => {
  try {
    const sizes = Array.isArray(req.body.sizes) ? req.body.sizes : req.body.sizes.split(',').map(size => parseFloat(size.trim())).filter(size => !isNaN(size));

    const newShoe = new Shoes({
      title: req.body.title,
      text: req.body.text,
      // img field will be handled by the default value if not provided
      price: req.body.price,
      sizes: sizes,
      rating: req.body.rating,
      color: req.body.color,
      shadow: req.body.shadow
    });

    await newShoe.save();
    res.status(201).json(newShoe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a shoe
exports.updateShoe = async (req, res) => {
  try {
    const updatedShoe = await Shoes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedShoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json(updatedShoe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a shoe
exports.deleteShoe = async (req, res) => {
  try {
    const shoe = await Shoes.findByIdAndDelete(req.params.id);
    if (!shoe) return res.status(404).json({ message: 'Shoe not found' });
    res.status(200).json({ message: 'Shoe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
