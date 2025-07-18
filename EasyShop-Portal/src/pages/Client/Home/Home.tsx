import { useState, useEffect } from "react";
import "./Home.css";
import ClientShared from "../Shared/ClientShared";

import type { Product } from "../../../model/Product";
import ProductCard from "./components/ProductCard";
import { getAllProducts } from "../../../services/ProductService";
import { getAllCategories } from "../../../services/CategoryService";
import type { Category } from "../../../model/Category";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryMap, setCategoryMap] = useState<Map<string, string>>(
    new Map()
  );
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          getAllProducts(),
          getAllCategories(),]);
        
          setProducts(productsResponse.data);
          const newCategoryMap = new Map<string, string>();
          categoriesResponse.data.forEach((cat: Category) => {
            newCategoryMap.set(cat.id, cat.name);
          });
          setCategoryMap(newCategoryMap);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderProductList = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-danger">{error}</p>;
    }

    if (products.length === 0) {
      return <p className="text-center">Chưa có sản phẩm nào để hiển thị.</p>;
    }

    return (
      <div className="row g-4 justify-content-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-lg-3 col-md-6 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <ProductCard product={product} categoryMap={categoryMap} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <ClientShared>
      <div className="container-xxl bg-white p-0">
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-primary px-3">
                Sản phẩm
              </h6>
              <h1 className="mb-5">Sản Phẩm Nổi Bật</h1>
            </div>
            {renderProductList()}
          </div>
        </div>
      </div>
    </ClientShared>
  );
};

export default Home;
