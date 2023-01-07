import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../../services/appApi';
import styles from './newProducts.module.css'


function NewProducts() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, {isError, error, isLoading, isSucces}] = useCreateProductMutation();
  return (
    <div>
      New Product
    </div>
  )
}

export default NewProducts
