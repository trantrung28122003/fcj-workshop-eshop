import React, { useState, useEffect } from "react";
import type { Product } from "../../../../model/Product";
import type { Category } from "../../../../model/Category";
import styles from "./ProductForm.module.css";
import { DoCallAPIWithOutToken } from "../../../../services/HttpService";
import { GET_ALL_CATEGORY } from "../../../../constants/API";
import { getPresignedUrl, UploadFileToS3Buket } from "../../../../services/ProductService";

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
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});


   const [formData, setFormData] = useState({
    name:        product?.name || "",
    price:       product?.price || 0,
    description: product?.description || "",
    stockCount:  product?.stockCount || 0,
    categoryId:  product?.categoryId?.toString() || "",
    key:         product?.imageUrl?.split("/").pop() || null,
  });


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
    if (!product && !file) newErrors.file = "Vui lòng chọn ảnh sản phẩm";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    if (errors.file) setErrors(prev => ({ ...prev, file: "" }));
  };

   async function uploadImageAndGetKey(file: File): Promise<string> {
  
    const { data } = await getPresignedUrl(file.name, file.type);

    const { uploadUrl, key } = data;
    if (!uploadUrl) throw new Error("Không lấy được URL upload");
    await UploadFileToS3Buket(uploadUrl, file);
    return key;
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    let imageKey = formData.key; 
    
    if (file) {
      imageKey = await uploadImageAndGetKey(file);
    }
    const payload: Omit<Product, "id"> = {
      name:        formData.name,
      price:       formData.price,
      stockCount:  formData.stockCount,
      description: formData.description ,
      categoryId:  formData.categoryId,
      key:         imageKey,
    };

    onSubmit(payload);
  } catch (err: any) {
    console.error("Lỗi khi upload hoặc tạo product:", err);
    alert(err.message || "Có lỗi, thử lại nhé");
  }
}


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

      <div className={styles.formGroup}>
        <label htmlFor="file" className={styles.formLabel}>
          Ảnh sản phẩm {product ? "(tùy chọn)" : "*"}
        </label>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        {errors.file && (
          <div className={styles.errorMessage}>{errors.file}</div>
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
