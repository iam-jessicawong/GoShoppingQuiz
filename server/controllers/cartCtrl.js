const addToCart = (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export default {
  addToCart,
}
