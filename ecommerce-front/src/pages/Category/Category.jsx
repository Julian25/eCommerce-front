import React from 'react';
import axios from '../../axios';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './category.module.css'
import { useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import ProductPreview from '../../components/ProductPreview/ProductPreview'

function Category() {

  const {category} = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() =>{
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then(({data}) =>{
        setLoading(false);
        setProducts(data)
      })
      .catch((e) =>{
        setLoading(false);
        console.log(e.message);
      })
  },[category]);

  if(loading) {
    return <Loading />
  };

  const productsSearch = products.filter((product) => product.name.toLowerCase(). includes(searchTerm.toLocaleLowerCase()));

  return (
    <div className={styles.category__container}>
      <div className={`pt-3 ${category}__banner__container category__banner__container`}>
        <h1 className={styles.text__center}>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <div className={styles.filter__container &"pt-4 pb-b4" }>
          <input type="search" placeholder="search" onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
      </div>
      {products.length === 0 ? (
        <h2>No products to show</h2>
      ) : (
        <Container>
          <Row>
            <Col md= {{span: 10, offset: 1}}>
              <div className={styles.preview__box}>
                {productsSearch.map((product) => (
                  <ProductPreview {...product} />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default Category
