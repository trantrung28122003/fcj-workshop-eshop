import React, { useState, useEffect } from "react";
import type { Product } from "../../../../model/Product";
import type { Category } from "../../../../model/Category";
import styles from "./ProductForm.module.css";
import { DoCallAPIWithOutToken } from "../../../../services/HttpService";
import { GET_ALL_CATEGORY } from "../../../../constants/API";

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    stockCount: product?.stockCount || 0,
    categoryId: product?.categoryId || "1",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await DoCallAPIWithOutToken(GET_ALL_CATEGORY, "GET");
      setCategories(response.data);
    } catch {
      console.error("Error fetching categories:");
    }
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống";
    }

    if (formData.price <= 0) {
      newErrors.price = "Giá phải lớn hơn 0";
    }

    if (formData.stockCount < 0) {
      newErrors.stockCount = "Số lượng tồn kho không được âm";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Vui lòng chọn danh mục";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stockCount" ? Number(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>
          Tên sản phẩm *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`${styles.formInput} ${errors.name ? styles.error : ""}`}
          placeholder="Nhập tên sản phẩm"
          required
          disabled={isLoading}
        />
        {errors.name && (
          <div className={styles.errorMessage}>{errors.name}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price" className={styles.formLabel}>
          Giá (VND) *
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className={`${styles.formInput} ${errors.price ? styles.error : ""}`}
          placeholder="0"
          min="0"
          step="1000"
          required
          disabled={isLoading}
        />
        {errors.price && (
          <div className={styles.errorMessage}>{errors.price}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="stockCount" className={styles.formLabel}>
          Số lượng tồn kho *
        </label>
        <input
          type="number"
          id="stockCount"
          name="stockCount"
          value={formData.stockCount}
          onChange={handleInputChange}
          className={`${styles.formInput} ${
            errors.stockCount ? styles.error : ""
          }`}
          placeholder="0"
          min="0"
          required
          disabled={isLoading}
        />
        {errors.stockCount && (
          <div className={styles.errorMessage}>{errors.stockCount}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="categoryId" className={styles.formLabel}>
          Danh mục *
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          className={`${styles.formSelect} ${
            errors.categoryId ? styles.error : ""
          }`}
          required
          disabled={isLoading}
        >
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <div className={styles.errorMessage}>{errors.categoryId}</div>
        )}
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
          disabled={isLoading}
        >
          Hủy
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading && <div className={styles.loadingSpinner}></div>}
          {product ? "Cập nhật" : "Tạo mới"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
