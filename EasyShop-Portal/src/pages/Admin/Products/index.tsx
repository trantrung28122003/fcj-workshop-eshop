import { useEffect, useState } from "react";
import type { Product } from "../../../model/Product";
import type { Category } from "../../../model/Category";
import Modal from "../../../components/Modal/Modal";
import ProductForm from "./components/ProductForm";
import styles from "./Products.module.css";
import AdminDashboard from "../../Admin/Dashboard";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../services/ProductService";
import { getAllCategories } from "../../../services/CategoryService";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Map<string, string>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ]);

      setProducts(productsResponse.data);

      const newCategoryMap = new Map<string, string>();
      categoriesResponse.data.forEach((cat: Category) => {
        newCategoryMap.set(cat.id, cat.name);
      });
      setCategoryMap(newCategoryMap);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = (productData: Omit<Product, "id">) => {
    setFormLoading(true);
    createProduct(productData)
      .then(() => {
        setShowCreateModal(false);
        fetchData(); // Refresh all data
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        alert("Lỗi khi tạo sản phẩm");
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  const handleUpdateProduct = (productData: Omit<Product, "id">) => {
    if (!selectedProduct) return;
    setFormLoading(true);
    updateProduct(selectedProduct.id, productData)
      .then(() => {
        setShowUpdateModal(false);
        setSelectedProduct(null);
        fetchData(); // Refresh all data
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Lỗi khi cập nhật sản phẩm");
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;
    setFormLoading(true);
    deleteProduct(selectedProduct.id)
      .then(() => {
        setShowDeleteModal(false);
        setSelectedProduct(null);
        fetchData(); // Refresh all data
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Lỗi khi xóa sản phẩm");
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  const openUpdateModal = (product: Product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const openDetailModal = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 10) return styles.stockLow;
    if (stock <= 50) return styles.stockMedium;
    return styles.stockHigh;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Đang tải danh sách sản phẩm...</p>
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
            <h2 className={styles.pageTitle}>Quản lý Sản phẩm</h2>
            <p className={styles.pageSubtitle}>
              {products.length} sản phẩm trong hệ thống
            </p>
          </div>
          <button
            className={styles.addButton}
            onClick={() => setShowCreateModal(true)}
          >
            <span>➕</span>
            Thêm sản phẩm
          </button>
        </div>

        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📦</div>
            <h3 className={styles.emptyStateTitle}>Chưa có sản phẩm nào</h3>
            <p className={styles.emptyStateText}>
              Bắt đầu bằng cách thêm sản phẩm đầu tiên vào hệ thống
            </p>
            <button
              className={styles.addButton}
              onClick={() => setShowCreateModal(true)}
            >
              <span>
                <i className="fas fa-plus"></i>
              </span>
              Thêm sản phẩm đầu tiên
            </button>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Tồn kho</th>
                  <th>Danh mục</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className={styles.idCell}>{product.id}</td>
                    <td className={styles.nameCell}>{product.name}</td>
                    <td className={styles.priceCell}>
                      {formatPrice(product.price)}
                    </td>
                    <td
                      className={`${styles.stockCell} ${getStockStatus(
                        product.stockCount
                      )}`}
                    >
                      {product.stockCount}
                    </td>
                    <td>
                      <span className={styles.categoryCell}>
                        {categoryMap.get(product.categoryId) ||
                          "Không xác định"}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        className={styles.detailButton}
                        onClick={() => openDetailModal(product)}
                      >
                        <span>
                          <i className="fas fa-info-circle"></i>
                        </span>
                        Xem
                      </button>
                      <button
                        className={styles.editButton}
                        onClick={() => openUpdateModal(product)}
                      >
                        <span>
                          <i className="fas fa-pencil-alt"></i>
                        </span>
                        Sửa
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => openDeleteModal(product)}
                      >
                        <span>
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
          title="Thêm sản phẩm mới"
        >
          <ProductForm
            onSubmit={handleCreateProduct}
            onCancel={() => setShowCreateModal(false)}
            isLoading={formLoading}
          />
        </Modal>

        <Modal
          isOpen={showUpdateModal}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedProduct(null);
          }}
          title="Cập nhật sản phẩm"
        >
          {selectedProduct && (
            <ProductForm
              product={selectedProduct}
              onSubmit={handleUpdateProduct}
              onCancel={() => {
                setShowUpdateModal(false);
                setSelectedProduct(null);
              }}
              isLoading={formLoading}
            />
          )}
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
          title="Xác nhận xóa"
          footer={
            <>
              <button
                className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProduct(null);
                }}
                disabled={formLoading}
              >
                Hủy
              </button>
              <button
                className={`${styles.modalButton} ${styles.modalButtonDanger}`}
                onClick={handleDeleteProduct}
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
              Bạn có chắc chắn muốn xóa sản phẩm
            </p>
            <p className={styles.deleteModalProductName}>
              "{selectedProduct?.name}"?
            </p>
            <p className={styles.deleteModalWarning}>
              Hành động này không thể hoàn tác!
            </p>
          </div>
        </Modal>

        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProduct(null);
          }}
          title="Chi tiết sản phẩm"
        >
          {selectedProduct && (
            <div className={styles.detailContainer}>
              <div className={styles.detailHeader}>
                {selectedProduct.imageUrl && (
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className={styles.detailImage}
                  />
                )}
                <h3 className={styles.detailProductName}>
                  {selectedProduct.name}
                </h3>
                <span
                  className={styles.categoryCell}
                  style={{ fontSize: "1rem" }}
                >
                  {categoryMap.get(selectedProduct.categoryId) ||
                    "Không xác định"}
                </span>
              </div>

              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>ID</span>
                  <p
                    className={styles.detailValue}
                    style={{ fontFamily: "monospace" }}
                  >
                    {selectedProduct.id}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Giá</span>
                  <p className={`${styles.detailValue} ${styles.price}`}>
                    {formatPrice(selectedProduct.price)}
                  </p>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Tồn kho</span>
                  <p
                    className={`${styles.detailValue} ${
                      selectedProduct.stockCount <= 10
                        ? styles["stock-low"]
                        : selectedProduct.stockCount <= 50
                        ? styles["stock-medium"]
                        : ""
                    }`}
                  >
                    {selectedProduct.stockCount}
                  </p>
                </div>
              </div>

              {selectedProduct.description && (
                <div className={styles.detailDescription}>
                  <h5
                    className={styles.detailLabel}
                    style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}
                  >
                    Mô tả sản phẩm
                  </h5>
                  <p>{selectedProduct.description}</p>
                </div>
              )}
            </div>
          )}
        </Modal>
      </>
    );
  };

  return <AdminDashboard>{renderContent()}</AdminDashboard>;
};

export default Products;
