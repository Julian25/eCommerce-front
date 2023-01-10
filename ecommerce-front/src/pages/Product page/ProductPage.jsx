import React, { useEffect, useState } from 'react';
import axios from '../../axios'
import { Container, Row, Col, Badge, ButtonGroup, Form, Button } from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SimilarProducts from '../../components/SimilarProduct/SimilarProducts';
import styles from './productPage.module.css';
import Loading from '../../components/Loading/Loading';
import { LinkContainer } from 'react-router-bootstrap';

function ProductPage() {
    const {id} = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() =>{
        axios.get(`/products/${id}`).then(({data}) => {
            setProduct(data.product);
            setSimilar(data.similar);
        })
    }, [id])
    
    if(!product) {
        return <Loading />
    };
    const responsive = {
        0:{items: 1},
        568:{items: 2},
        1024:{items: 3},
    }
    const images = product.pictures.map((picture) => <img className={styles.product__carousel__image} src={picture.url} onDragStart={handleDragStart} />);
    let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProducts {...product} />
            </div>
        ));
    }
  return (
    <Container className={'pt-4' && styles.product__container}>
        <Row>
            <Col lg={6}>
                <AliceCarousel mouseTracking items={images} controlsStrategy="alternate"/>
            </Col>
            <Col lg={6}>
                <h1>{product.name}</h1>
                <p>
                    <Badge bg="primary">
                        {product.category}
                    </Badge>
                </p>
                <p className={styles.product__price}>{product.price}</p>
                <p className={'py-3' & styles.product__description}>
                    <strong>Description:</strong>{product.description}
                </p>
                {user && !user.isAdmin && (
                    <ButtonGroup className={styles.button__group}>
                        <Form.Select size="lg" className={styles.form__select}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Select>
                        <Button size="lg">Add to cart</Button>
                    </ButtonGroup>
                )}
                {user && user.isAdmin && (
                    <LinkContainer to={`/product/${product._id}/edit`}>
                        <Button size="lg">
                            Edit product
                        </Button>
                    </LinkContainer>
                )}
            </Col>
        </Row>
        <dvi className="my-4">
            <h2>Similar products</h2>
            <div className={styles.carousel__box}>
                <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate"/>
            </div>
        </dvi>
    </Container>
  )
}

export default ProductPage
