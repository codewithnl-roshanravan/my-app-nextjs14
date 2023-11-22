import { getSession } from "next-auth/react";

import Order from "../../../models/order";
import Product from "../../../models/product";
import User from "../../../models/user";

import db from "../../../utils/db";

async function handler(req, res) {
  const session = getSession({ req });

  if (!session || (session && !session.user.isAdmin)) {
    return res.send("Signin required");
  }

  await db.connect();

  const ordersCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();

  res.send([{ ordersCount, productsCount, usersCount }]);
}

export default handler;
