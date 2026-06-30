import supabase from "../config/supabase.js";

// Ambil semua produk
export const getProducts = async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories(name),
      profiles(full_name)
    `);

  if (error) {
    return res.status(400).json(error);
  }

  res.json(data);
};

// Ambil produk berdasarkan ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories(name),
      profiles(full_name)
    `)
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json(error);
  }

  res.json(data);
};

// Tambah produk
export const createProduct = async (req, res) => {
  const {
    category_id,
    name,
    description,
    price,
    stock,
    image_url
  } = req.body;

  const { data, error } = await supabase
    .from("products")
    .insert({
      seller_id: req.user.id,
      category_id,
      name,
      description,
      price,
      stock,
      image_url
    })
    .select();

  if (error) {
    return res.status(400).json(error);
  }

  res.status(201).json(data);
};

// Update Produk
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    category_id,
    name,
    description,
    price,
    stock,
    image_url
  } = req.body;

  const { data, error } = await supabase
    .from("products")
    .update({
      category_id,
      name,
      description,
      price,
      stock,
      image_url
    })
    .eq("id", id)
    .eq("seller_id", req.user.id)
    .select();

  if (error) {
    return res.status(400).json(error);
  }

  res.json(data);
};

// Hapus Produk
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .eq("seller_id", req.user.id);

  if (error) {
    return res.status(400).json(error);
  }

  res.json({
    success: true,
    message: "Produk berhasil dihapus"
  });
};