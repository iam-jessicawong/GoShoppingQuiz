import { Op } from "sequelize";

const addToCart = async (req, res) => {
  const data = req.body;
  
  try {
    // check user input
    data.username = data.username.trim();
    if (!data.username || !data.prod_id || !data.qty) return res.status(400).send("invalid input! username, prod_id and qty is required");
    data.qty = parseInt(data.qty);
    if (isNaN(data.qty) || data.qty < 1 ) return res.status(400).send("invalid qty! input 1 or more");

    // check user
    const user = await req.context.models.users.findOne({ where: { username: data.username } });
    if(!user) return res.status(400).send(`sorry, user with username ${data.username} is not exist`);

    // check product
    const product = await req.context.models.products.findOne({ where: {prod_id: data.prod_id } });
    if(!product) return res.status(400).send(`product with id ${prod_id} is not exist`);
    
    if(product.stock === 0) return res.send("Stok sudah habis");
    if(product.stock < data.qty) return res.send(`sorry this product only ${product.stock} left`);

    const subtotal = product.price * data.qty;
    let item_product = await req.context.models.item_product.findOne({
      where: { prod_id: data.prod_id, user_id: user.user_id }
    });

    if(item_product) {
      item_product.qty += data.qty;
      item_product.subtotal += subtotal;
      item_product.save({ fields: ["subtotal", "qty"] });
    } else {
      item_product = await req.context.models.item_product.create({
        prod_id: data.prod_id,
        qty: data.qty,
        subtotal: subtotal,
        user_id: user.user_id
      });
    }

    const cart = await req.context.models.cart.findOne({
      where: {
        cart: { [Op.contains]: [user.user_id] },
      },
    });

    const cartData = Object.values(item_product.dataValues);
    if(!cart) {
      await req.context.models.cart.create({ cart: [cartData] });
    } else {
      const updateCart = cart.cart;
      const index = updateCart.findIndex((item) => item.includes(data.prod_id));

      if (index !== -1) {
        updateCart[index] = cartData
      } else {
        updateCart.push(cartData);
      }

      await req.context.models.cart.update(
        { cart: updateCart },
        { where: { id: cart.id }
      });
    }

    product.stock -= data.qty;
    await product.save({ fields: ["stock"] });

    return res.send({
      message: "product added to cart"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const findCart = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await req.context.models.users.findOne({ where: { username: username.trim() } });
    const cart = await req.context.models.item_product.findAll({
      where: {
        user_id: user.user_id
      },
      include: {
        model: req.context.models.products,
        as: "prod",
        attributes: ["name", "stock", "price"]
      }
    });
    
    res.send(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

export default {
  addToCart,
  findCart
}
