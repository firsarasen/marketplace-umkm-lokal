import supabase from "../config/supabase.js";

// Membuat Order
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const buyer_id = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Keranjang kosong"
      });
    }

    let total = 0;
    const detailItems = [];

    for (const item of items) {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", item.product_id)
        .single();

      if (error || !product) {
        return res.status(404).json({
          message: "Produk tidak ditemukan"
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} stok tidak cukup`
        });
      }

      const subtotal = product.price * item.quantity;

      total += subtotal;

      detailItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });
    }

    const { data: order } = await supabase
      .from("orders")
      .insert({
        buyer_id,
        total,
        status: "pending"
      })
      .select()
      .single();

    for (const item of detailItems) {

      await supabase
        .from("order_details")
        .insert({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal
        });

      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.product_id)
        .single();

      await supabase
        .from("products")
        .update({
          stock: product.stock - item.quantity
        })
        .eq("id", item.product_id);
    }

    res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat",
      order
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

export const getOrders = async (req, res) => {

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_details(
        *,
        products(name,image_url)
      )
    `)
    .eq("buyer_id", req.user.id);

  if (error) {
    return res.status(400).json(error);
  }

  res.json(data);

};

export const getOrderById = async (req, res) => {

  const { id } = req.params;

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_details(
        *,
        products(name,image_url)
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json(error);
  }

  res.json(data);

};

export const updateStatus = async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .update({
      status
    })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(400).json(error);
  }

  res.json(data);

};

export const deleteOrder = async (req, res) => {

  const { id } = req.params;

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(400).json(error);
  }

  res.json({
    success: true,
    message: "Order berhasil dihapus"
  });

};