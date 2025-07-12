import { useState } from "react";
import type { Category } from "../../../../model/Category";
import styles from "./CategoryForm.module.css";

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: Omit<Category, "id">) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>
          Tên danh mục
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.formInput}
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.formLabel}>
          Mô tả
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className={styles.formTextarea}
          rows={4}
          disabled={isLoading}
        />
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
          {category ? "Lưu thay đổi" : "Tạo danh mục"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
