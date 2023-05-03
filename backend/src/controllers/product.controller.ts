import { Request, Response } from "express";
import { IProduct, Product } from "../models";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products: IProduct[] = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product: IProduct = new Product(req.body);
    const result: IProduct = await product.save();
    res.status(201).json({ body: req.body, data: result });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send("Internal server error");
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product: IProduct | null = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    const updatedProduct: IProduct = Object.assign(product, req.body);
    const result: IProduct = await updatedProduct.save();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result: IProduct | null = await Product.findByIdAndDelete(
      req.params.id
    );
    if (!result) {
      res.status(404).send("Product not found");
    } else {
      res.status(204).json({ success: true });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
