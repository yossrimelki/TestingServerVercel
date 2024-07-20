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
exports.createShoe = async (req, res) => {
  // Ensure req.body.sizes exists and is a string, otherwise default to an empty array
  const sizesString = req.body.sizes || ''; // Default to an empty string if sizes is not provided

  // Prepare the shoe data
  const shoeData = {
    title: req.body.title || 'Untitled', // Provide a default value if title is missing
    text: req.body.text || 'No description', // Provide a default value if text is missing
    price: req.body.price || 0, // Provide a default value if price is missing
    sizes: sizesString.split(',').map(size => parseFloat(size.trim())).filter(size => !isNaN(size)), // Convert sizes string to an array of numbers
    rating: req.body.rating || 0, // Provide a default value if rating is missing
    color: req.body.color || 'Unknown', // Provide a default value if color is missing
    shadow: req.body.shadow || 'None' // Provide a default value if shadow is missing
  };

  // Include the img field only if it's present in the request
  if (req.file && req.file.path) {
    shoeData.img = req.file.path; // Save the path of the uploaded image
  }

  // Create a new shoe instance
  const shoe = new Shoes(shoeData);

  try {
    const newShoe = await shoe.save();
    res.status(201).json(newShoe);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ message: error.message });
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
