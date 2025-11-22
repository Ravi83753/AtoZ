import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './config';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: pageSize,
        sort: sortField,
        order: sortOrder
      };
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      const response = await axios.get(`${API_BASE_URL}/products`, { params });
      setProducts(response.data.products || response.data);
      setFilteredProducts(response.data.products || response.data);
      if (response.data.pagination) {
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      showToast('Error fetching products: ' + (error.response?.data?.error || error.message), 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, sortField, sortOrder, selectedCategory, showToast]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/categories/list`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search`, {
        params: { name: searchQuery }
      });
      setFilteredProducts(response.data);
    } catch (error) {
      showToast('Error searching products: ' + (error.response?.data?.error || error.message), 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, fetchProducts, showToast]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      fetchProducts();
    }
  }, [searchQuery, handleSearch, fetchProducts]);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditData({
      name: product.name,
      unit: product.unit || '',
      category: product.category || '',
      brand: product.brand || '',
      stock: product.stock,
      status: product.status || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, editData);
      setProducts(products.map(p => p.id === id ? response.data : p));
      setFilteredProducts(filteredProducts.map(p => p.id === id ? response.data : p));
      setEditingId(null);
      setEditData({});
      showToast('Product updated successfully');
    } catch (error) {
      showToast('Error updating product: ' + (error.response?.data?.error || error.message), 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
      setFilteredProducts(filteredProducts.filter(p => p.id !== id));
      showToast('Product deleted successfully');
    } catch (error) {
      showToast('Error deleting product: ' + (error.response?.data?.error || error.message), 'error');
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/export`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'products.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('Products exported successfully');
    } catch (error) {
      showToast('Error exporting products: ' + (error.response?.data?.error || error.message), 'error');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.name.endsWith('.csv')) {
        showToast('Please select a CSV file', 'error');
        return;
      }

      const formData = new FormData();
      formData.append('csvFile', file);

      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE_URL}/products/import`, formData, {
          headers: { 
            'Content-Type': 'multipart/form-data'
          },
          timeout: 30000 // 30 second timeout
        });
        const { added, skipped, duplicates } = response.data;
        let message = `Import completed: ${added} product(s) added`;
        if (skipped > 0) message += `, ${skipped} skipped`;
        if (duplicates && duplicates.length > 0) {
          message += `, ${duplicates.length} duplicate(s) found`;
        }
        showToast(message, 'success');
        fetchProducts();
      } catch (error) {
        console.error('Import error:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Failed to import CSV file';
        showToast('Error importing products: ' + errorMessage, 'error');
      } finally {
        setLoading(false);
      }
    };
    input.click();
  };

  const handleRowClick = async (product) => {
    setSelectedProduct(product);
    setShowHistory(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${product.id}/history`);
      setHistory(response.data);
    } catch (error) {
      showToast('Error fetching history: ' + (error.response?.data?.error || error.message), 'error');
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const getStockStatus = (stock) => {
    return stock === 0 ? { text: 'Out of Stock', class: 'status-out' } : { text: 'In Stock', class: 'status-in' };
  };

  return (
    <div className="app-container">
      {toast.show && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      <header className="app-header">
        <h1>Product Inventory Management</h1>
        <div className="header-controls">
          <div className="left-controls">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="category-filter"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="right-controls">
            <button onClick={handleImport} className="btn btn-primary">Import CSV</button>
            <button onClick={handleExport} className="btn btn-primary">Export CSV</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {loading && <div className="loading">Loading...</div>}

        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th onClick={() => handleSort('name')} className="sortable">
                  Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('unit')} className="sortable">
                  Unit {sortField === 'unit' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('category')} className="sortable">
                  Category {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('brand')} className="sortable">
                  Brand {sortField === 'brand' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('stock')} className="sortable">
                  Stock {sortField === 'stock' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">No products found</td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr
                    key={product.id}
                    onClick={() => handleRowClick(product)}
                    className={editingId === product.id ? 'editing' : ''}
                  >
                    <td>
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="product-image" />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        product.name
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editData.unit}
                          onChange={(e) => setEditData({ ...editData, unit: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        product.unit || '-'
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editData.category}
                          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        product.category || '-'
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editData.brand}
                          onChange={(e) => setEditData({ ...editData, brand: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        product.brand || '-'
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          type="number"
                          min="0"
                          value={editData.stock}
                          onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) || 0 })}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        product.stock
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editData.status}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className={getStockStatus(product.stock).class}>
                          {getStockStatus(product.stock).text}
                        </span>
                      )}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      {editingId === product.id ? (
                        <div className="action-buttons">
                          <button
                            onClick={() => handleSaveEdit(product.id)}
                            className="btn btn-small btn-success"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="btn btn-small btn-cancel"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="action-buttons">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(product);
                            }}
                            className="btn btn-small btn-edit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(product.id);
                            }}
                            className="btn btn-small btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-small"
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-small"
            >
              Next
            </button>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="page-size-select"
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
          </div>
        )}
      </main>

      {showHistory && (
        <div className="history-sidebar">
          <div className="history-header">
            <h2>Inventory History - {selectedProduct?.name}</h2>
            <button onClick={() => setShowHistory(false)} className="btn btn-small">Close</button>
          </div>
          <div className="history-content">
            {history.length === 0 ? (
              <p className="no-history">No history available for this product</p>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Old Stock</th>
                    <th>New Stock</th>
                    <th>Changed By</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(log => (
                    <tr key={log.id}>
                      <td>{new Date(log.change_date).toLocaleString()}</td>
                      <td>{log.old_quantity}</td>
                      <td>{log.new_quantity}</td>
                      <td>{log.user_info || 'admin'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {showHistory && <div className="sidebar-overlay" onClick={() => setShowHistory(false)}></div>}
    </div>
  );
}

export default App;
