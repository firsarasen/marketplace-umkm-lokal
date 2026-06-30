import supabase from "../config/supabase.js";

// GET semua kategori
export const getCategories = async (req, res) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return res.status(400).json(error);
  }

  res.json(data);
};

// GET kategori berdasarkan ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json(error);
  }

  res.json(data);
};

// POST kategori
export const createCategory = async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("categories")
    .insert({ name })
    .select();

  if (error) {
    return res.status(400).json(error);
  }

  res.status(201).json(data);
};

// PUT kategori
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { data, error } = await supabase
    .from("categories")
    .update({ name })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(400).json(error);
  }

  res.json(data);
};

// DELETE kategori
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(400).json(error);
  }

  res.json({
    success: true,
    message: "Kategori berhasil dihapus"
  });
};