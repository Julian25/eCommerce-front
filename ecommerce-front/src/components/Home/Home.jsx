import React from 'react'
import styles from './home.module.css'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
      <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" 
      alt="home banner" className={styles.home__banner}/>
      <div>
        <h2>Last products</h2>
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
      </div>
    </div>
  )
}

export default Home
