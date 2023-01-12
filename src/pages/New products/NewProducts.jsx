import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../../services/appApi';
import axios from "../../axios";
import styles from './newProducts.module.css'


function NewProducts() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imageToRemove, setImageToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, {isError, error, isLoading, isSuccess}] = useCreateProductMutation();

  const showWidget = () =>{
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dwvzkahxn",
        uploadPreset: "kcosqkjk",
      }, 
      (error, result) => {
        if(!error && result.event === "success") {
          setImages((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}])
        }
      }
    );
    widget.open();
  };

  function handleRemoveImg(imgObj) {
    setImageToRemove(imgObj.public_id);
    axios
        .delete(`/images/${imgObj.public_id}/`)
        .then((res) => {
            setImageToRemove(null);
            setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
        })
        .catch((e) => console.log(e));
}
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if(!name || !description || !price || !category || !images.length) {
        return alert('Please fill out yhe fields')
      }
      createProduct({name, description, price, category, images}).then(({data}) => {
        if(data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500 )
        }
      });
    }

    return (
    <Container>
      <Row>
        <Col md={6} className={styles.product__form__container}>
          <Form className={styles.form} onSubmit={handleSubmit}>
            <h1 className='mt-4'>Create a product</h1>
            {isSuccess && (
              <Alert variant="succes">Product created with succes</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="enter product description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter product price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
              {console.log(price)}
            </Form.Group>
            <Form.Group
              className="mb-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Categories</Form.Label>
              <Form.Select>
                <option disabled selected>
                  --Select one--
                </option>
                <option value="technology">Technology</option>
                <option value="tablets">Tablets</option>
                <option value="laptops">Laptops</option>
                <option value="phones">Phones</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>Upload images</Button>
              <div className={styles.images_preview_container}>
                {images.map((image) =>(
                  <div className={styles.image_preview}>
                    <img src={image.url} alt="" />
                    {imageToRemove != image.public_id && <i className='fa fa-times-circle'onClick={()=>handleRemoveImg(image)}></i>}
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                  Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className={styles.product__image__container}></Col>
      </Row>
    </Container>
  );
}

export default NewProducts
