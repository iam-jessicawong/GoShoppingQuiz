const createOrder = (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const closeOrder = (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
  
};

const cancelOrder = (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }

};

export default {
  createOrder,
  closeOrder,
  cancelOrder
};
