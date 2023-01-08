import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
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
    <Container>
      <Row>
        <Col md={6} className={styles.product__form__container}>
          <Form className={styles.form}>
            <h1>Createa product</h1>
            {isSucces && (
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
              <Button type="button">Upload images</Button>
              <div className={styles.images_preview_container}>
                {images.map((image) =>(
                  <div className={styles.image_preview}>
                    <img src={image.url} alt="" />
                    {/*add icon for removig*/}
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group className={styles.form__box} disabled={isLoading}>
              <Button type="submit">Login</Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className={styles.product__form__container}></Col>
      </Row>
    </Container>
  );
}

export default NewProducts
