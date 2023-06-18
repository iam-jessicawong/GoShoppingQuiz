import { Op } from "sequelize";

const findAll = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await req.context.models.users.findOne({ where: { username: username } });
    if(!user) return res.status(400).send(`sorry, user with username ${username} is not exist`);

    const order = await req.context.models.orders.findAll({
      where: { user_id: user.user_id },
      include: {
        model: req.context.models.order_line_item,
        as: "order_line_items",
        include: {
          model: req.context.models.products,
          as: "prod",
          attributes: ["name", "stock", "price"]
        }
      }
    });

    return res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

const createOrder = async (req, res) => {
  let {username} = req.body;
  try {
    username = username.trim();
    if (!username) return res.status(400).send("invalid input! username is required");

    const user = await req.context.models.users.findOne({ where: { username: username } });
    if(!user) return res.status(400).send(`sorry, user with username ${username} is not exist`);

    const cart = await req.context.models.cart.findOne({
      where: {
        cart: { [Op.contains]: [user.user_id] },
      },
    });

    if(!cart) return res.status(400).send("there's nothing to order, your cart is empty");
    
    let totalprice = cart.cart.reduce((prev, curr) => prev + parseInt(curr[3]), 0);
    let resData = {};

    let orderOpen = await req.context.models.orders.findOne({
      where: {
        user_id: user.user_id,
        status: "OPEN"
      }
    });

    if (!orderOpen) {
      orderOpen = await req.context.models.orders.create({
        user_id: user.user_id,
        totalprice: totalprice
      });
  
      const newOrderItems = cart.cart.map(item => {
        return {
          prod_id: item[1],
          qty: parseInt(item[2]),
          subtotal: parseInt(item[3]),
          order_id: orderOpen.order_id
        }
      });
      
      const order_line_item = await req.context.models.order_line_item.bulkCreate(newOrderItems, { validate: true });
      resData = {orderOpen, order_line_item}
    } else {
      await orderOpen.update({ totalprice: orderOpen.totalprice + totalprice });
      const newOrderItems = cart.cart.map(item => {
        return {
          prod_id: item[1],
          qty: parseInt(item[2]),
          subtotal: parseInt(item[3]),
          order_id: orderOpen.order_id
        }
      });

      const order_line_item = await newOrderItems.map(async (item) => {
        const order_item = await req.context.models.order_line_item.findOne({ where: { order_id: item.order_id, prod_id: item.prod_id } });
        if(order_item) {
          const updated = await order_item.update({
            qty: order_item.qty + item.qty,
            subtotal: order_item.subtotal + item.subtotal
          });
          return updated;
        } else {
          const created = await req.context.models.order_line_item.create(item);
          return created;
        }
      });
      resData = {orderOpen, order_line_item};
    }

    await req.context.models.cart.destroy({
      where: {
        id: cart.id,
      }
    });

    await req.context.models.item_product.destroy({
      where: {
        user_id: user.user_id
      }
    });

    return res.send({
      message: "order created",
      data: resData
    });

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const closeOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await req.context.models.orders.findOne(
      { where: { order_no: id } }
    );

    if (!order) return res.status(404).send(`order with no ${id} is not exist`);
    if (order.status !== "OPEN") return res.status(400).send(`you can't close order that already ${order.status}`);

    order.status = "CLOSED";
    await order.save({ fields: ["status"] });

    return res.send({
      message: "order closed",
      order
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await req.context.models.orders.findOne(
      { where: { order_no: id } }
    );

    if (!order) return res.status(404).send(`order with no ${id} is not exist`);
    if (order.status !== "OPEN") return res.status(400).send(`you can't cancel order that already ${order.status}`);

    const order_items = await req.context.models.order_line_item.findAll({
      where: { order_id: order.order_id}
    });

    order.status = "CANCELLED";
    await order.save({ fields: ["status"] });

    order_items.forEach(async (item) => {
      const product = await req.context.models.products.findOne({
        where: { prod_id: item.prod_id },
      });
      await product.update({stock: product.stock + item.qty});
    });

    return res.send({
      message: "order cancelled",
      order
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export default {
  createOrder,
  closeOrder,
  cancelOrder,
  findAll
};
