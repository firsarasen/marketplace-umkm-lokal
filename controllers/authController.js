import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, full_name, phone, address } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const user = data.user;

    await supabase.from("profiles").insert({
      id: user.id,
      full_name,
      phone,
      address,
      role: "buyer",
    });

    res.status(201).json({
      success: true,
      message: "Register berhasil. Silakan cek email untuk verifikasi.",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    const token = jwt.sign(
      {
        id: data.user.id,
        email: data.user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

export const profile = async (req, res) => {

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", req.user.id)
    .single();

  if (error) {
    return res.status(404).json(error);
  }

  res.json(data);

};