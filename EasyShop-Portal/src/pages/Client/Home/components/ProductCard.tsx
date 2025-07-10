import React from "react";
import type { Product } from "../../../../model/Product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  categoryMap: Map<string, string>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, categoryMap  }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const imageUrl = `https://picsum.photos/seed/${product.id}/400/400`;

  return (
    <div className={styles.productCard}>
      <div className={styles.cardImageContainer}>
        <img src={imageUrl} alt={product.name} className={styles.cardImage} />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{categoryMap.get(product.categoryId) || "Không xác định"}</span>
        <h3 className={styles.cardTitle}>{product.name}</h3>
        <p className={styles.cardPrice}>{formatPrice(product.price)}</p>
        <div className={styles.cardActions}>
          <button className={`${styles.cardButton} ${styles.viewDetails}`}>
            <span>
              <i className="fas fa-info-circle"></i>
            </span>
            Chi tiết
          </button>
          <button className={`${styles.cardButton} ${styles.addToCart}`}>
            <span>
              <i className="fa-solid fa-cart-plus"></i>
            </span>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
