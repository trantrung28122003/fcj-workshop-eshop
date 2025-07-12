import { useEffect, useState } from "react";
import type { Category } from "../../../model/Category";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/CategoryService";
import Modal from "../../../components/Modal/Modal";
import CategoryForm from "./components/CategoryForm";
import styles from "./Categories.module.css";
import AdminDashboard from "../../Admin/Dashboard";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    getAllCategories()
      .then((response) => {
        setCategories(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Không thể tải danh sách danh mục");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCreateCategory = (categoryData: Omit<Category, "id">) => {
    setFormLoading(true);
    createCategory(categoryData)
      .then(() => {
        setShowCreateModal(false);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        alert("Lỗi khi tạo danh mục");
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  const handleUpdateCategory = (categoryData: Omit<Category, "id">) => {
    if (!selectedCategory) return;

    setFormLoading(true);
    updateCategory(selectedCategory.id, categoryData)
      .then(() => {
        setShowUpdateModal(false);
        setSelectedCategory(null);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        alert("Lỗi khi cập nhật danh mục");
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    setFormLoading(true);
    deleteCategory(selectedCategory.id)
      .then(() => {
        setShowDeleteModal(false);
        setSelectedCategory(null);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        alert("Lỗi khi xóa danh mục");
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  const openUpdateModal = (category: Category) => {
    setSelectedCategory(category);
    setShowUpdateModal(true);
  };

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const openDetailModal = (category: Category) => {
    setSelectedCategory(category);
    setShowDetailModal(true);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Đang tải danh sách danh mục...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>⚠️</div>
          <h3 className={styles.emptyStateTitle}>Lỗi tải dữ liệu</h3>
          <p className={styles.emptyStateText}>{error}</p>
        </div>
      );
    }

    return (
      <>
        <div className={styles.pageHeader}>
          <div>
            <h2 className={styles.pageTitle}>Quản lý Danh mục</h2>
            <p className={styles.pageSubtitle}>
              {categories.length} danh mục trong hệ thống
            </p>
          </div>
          <button
            className={styles.addButton}
            onClick={() => setShowCreateModal(true)}
          >
            <span>➕</span>
            Thêm danh mục
          </button>
        </div>

        {categories.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>🏷️</div>
            <h3 className={styles.emptyStateTitle}>Chưa có danh mục nào</h3>
            <p className={styles.emptyStateText}>
              Bắt đầu bằng cách thêm danh mục đầu tiên vào hệ thống
            </p>
            <button
              className={styles.addButton}
              onClick={() => setShowCreateModal(true)}
            >
              <span>
                <i className="fas fa-plus"></i>
              </span>
              Thêm danh mục đầu tiên
            </button>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className={styles.idCell}>{category.id}</td>
                    <td className={styles.nameCell}>{category.name}</td>
                    <td className={styles.descriptionCell}>
                      {category.description || "Không có mô tả"}
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        className={styles.detailButton}
                        onClick={() => openDetailModal(category)}
                      >
                        <span>
                          {" "}
                          <i className="fas fa-info-circle"></i>
                        </span>
                        Xem
                      </button>
                      <button
                        className={styles.editButton}
                        onClick={() => openUpdateModal(category)}
                      >
                        <span>
                          {" "}
                          <i className="fas fa-pencil-alt"></i>
                        </span>
                        Sửa
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => openDeleteModal(category)}
                      >
                        <span>
                          {" "}
                          <i className="fas fa-trash-alt"></i>
                        </span>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modals */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Thêm danh mục mới"
        >
          <CategoryForm
            onSubmit={handleCreateCategory}
            onCancel={() => setShowCreateModal(false)}
            isLoading={formLoading}
          />
        </Modal>

        <Modal
          isOpen={showUpdateModal}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedCategory(null);
          }}
          title="Cập nhật danh mục"
        >
          {selectedCategory && (
            <CategoryForm
              category={selectedCategory}
              onSubmit={handleUpdateCategory}
              onCancel={() => {
                setShowUpdateModal(false);
                setSelectedCategory(null);
              }}
              isLoading={formLoading}
            />
          )}
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCategory(null);
          }}
          title="Xác nhận xóa"
          footer={
            <>
              <button
                className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCategory(null);
                }}
                disabled={formLoading}
              >
                Hủy
              </button>
              <button
                className={`${styles.modalButton} ${styles.modalButtonDanger}`}
                onClick={handleDeleteCategory}
                disabled={formLoading}
              >
                {formLoading ? (
                  <div className={styles.loadingSpinner}></div>
                ) : (
                  "Xác nhận Xóa"
                )}
              </button>
            </>
          }
        >
          <div className={styles.deleteModalContent}>
            <div className={styles.deleteModalIcon}>
              {" "}
              <i className="fas fa-trash-alt"></i>
            </div>
            <p className={styles.deleteModalText}>
              Bạn có chắc chắn muốn xóa danh mục
            </p>
            <p className={styles.deleteModalCategoryName}>
              "{selectedCategory?.name}"?
            </p>
            <p className={styles.deleteModalWarning}>
              Hành động này không thể hoàn tác!
            </p>
          </div>
        </Modal>

        {/* Detail Modal */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedCategory(null);
          }}
          title="Chi tiết danh mục"
        >
          {selectedCategory && (
            <div className={styles.detailContainer}>
              <div className={styles.detailHeader}>
                <p className={styles.detailLabel}>ID: {selectedCategory.id}</p>
                <h3 className={styles.detailCategoryName}>
                  {selectedCategory.name}
                </h3>
              </div>

              <div>
                <h5
                  className={styles.detailLabel}
                  style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}
                >
                  Mô tả
                </h5>
                <p className={styles.detailDescription}>
                  {selectedCategory.description ||
                    "Không có mô tả cho danh mục này."}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </>
    );
  };

  return <AdminDashboard>{renderContent()}</AdminDashboard>;
};

export default Categories;
