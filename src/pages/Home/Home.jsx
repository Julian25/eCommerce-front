import React, { useEffect } from 'react';
import styles from './home.module.css';
import categories from '../../categories';
import {Link} from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../../features/productSlice';
import ProductPreview from '../../components/ProductPreview/ProductPreview';



function Home() {
  const dispatch = useDispatch();
  const products = useSelector( state => state.products);
  console.log(products);
  const lastProducts = products.slice(0,8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);

  return (
    <div>
      <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" 
      alt="home banner" className={styles.home__banner}/>
      <div>
        <h2>Last products</h2>
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
              <ProductPreview {...product} />
          ))}
        </div>
        <div>
          <Link to='/category/all' className={styles.all__link}>
            See all {'>>'}
          </Link>
        </div>
      </div>
      <div className={styles.sale__banner__container}>
        <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png" 
        alt="sales banner" />
      </div>
      <div className={styles.recent_products_container && styles.container}>
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
              <Col md={4}>
                <div style= {{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.img})`, gap: "10px"}} className={styles.category_style}>
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Home
