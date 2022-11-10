import React, {useEffect, useState} from 'react';
import {
  CathegorysResponse,
  Producto,
  productsResponse,
  CategoriaFull,
} from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';
import {Asset} from 'react-native-image-picker';

interface productsProps {
  products: Producto[] | undefined;
  cathegorys: CategoriaFull[] | undefined;
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<void>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImg: (id: string, data: any) => Promise<void>;
  loadCathegorys: () => Promise<void>;
  error: string;
  clearError: (err?: string) => void;
}

export const ProductsCtx = React.createContext({} as productsProps);

export const ProductsCtxProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [cathegorys, setCathegorys] = useState<CategoriaFull[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loader = async () => {
      await loadProducts();
      await loadCathegorys();
    };
    loader();
  }, []);

  const loadProducts = async () => {
    try {
      const resp = await cafeApi.get<productsResponse>('/productos?limite=50');
      setProducts(resp.data.productos);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const addProduct = async (categoryId: string, productName: string) => {
    try {
      const resp = await cafeApi.post('/productos', {
        nombre: productName,
        categoria: categoryId,
      });
      setProducts([...products, resp.data]);
      clearError();
    } catch (error: any) {
      setError(error.response.data.msg);
    }
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    try {
      //need token
      const resp = await cafeApi.put(`/productos/${productId}`, {
        nombre: productName,
        categoria: categoryId,
      });

      setProducts(
        products.map(p => {
          if (p._id === productId) {
            return resp.data;
          } else {
            return p;
          }
        }),
      );
      clearError();
    } catch (error: any) {
      setError(error.response.data.msg);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      console.log(id);

      const resp = await cafeApi.delete(`/productos/${id}`);
      await loadProducts();
      clearError();
    } catch (error: any) {
      setError(error.response.data.msg);
    }
  };

  const loadProductById = async (id: string) => {
    try {
      const resp = await cafeApi.get(`/productos/${id}`);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImg = async (id: string, data: Asset) => {
    const fileToUpload = {
      uri: data.uri,
      type: data.type,
      name: data.fileName,
    };

    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    try {
      /* 'http://localhost:8080/api' */
      await fetch(`https://cafe-bkend.herokuapp.com/api/uploads/productos/${id}`, {
        method: 'PUT',
        body: formData,
      });

      clearError();
    } catch (error: any) {
      setError(error.response.data.msg);
    }
  };

  const loadCathegorys = async () => {
    try {
      const resp = await cafeApi.get<CathegorysResponse>('/categorias');
      setCathegorys(resp.data.categorias);
    } catch (error) {
      console.log(error);
    }
  };

  const clearError = (err: string = '') => {
    if (err) {
      setError(err);
    } else {
      setError('');
    }
  };

  return (
    <ProductsCtx.Provider
      value={{
        products,
        cathegorys,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImg,
        loadCathegorys,
        error,
        clearError,
      }}>
      {children}
    </ProductsCtx.Provider>
  );
};
