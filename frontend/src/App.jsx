import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const categoryOptions = ["Phone", "Laptop", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "PC"];
const companyOptions = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

function App() {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState('AMZ');
  const [category, setCategory] = useState('Laptop');
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortField, setSortField] = useState('price');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10); // State for products per page

  useEffect(() => {
    fetchProducts();
  }, [company, category, top, minPrice, maxPrice, sortField]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/companies/${company}/categories/${category}/products`, {
        params: {
          top: top,
          minPrice: minPrice,
          maxPrice: maxPrice,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching the products:', error);
    }
  };

  const sortedProducts = products.sort((a, b) => {
    if (sortField === 'price') return a.price - b.price;
    if (sortField === 'rating') return b.rating - a.rating;
    if (sortField === 'discount') return b.discount - a.discount;
    return 0;
  });

  const filteredProducts = sortedProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);

  // Update number of products per page when top N changes
  useEffect(() => {
    setProductsPerPage(top);
  }, [top]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container mt-4">
          <h1 className="display-4">E-commerce</h1>
          <div className="row mt-4">
            <div className="col-md-2">
              <label htmlFor="company" className="form-label">Company:</label>
              <select id="company" className="form-select" value={company} onChange={handleCompanyChange}>
                {companyOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="category" className="form-label">Category:</label>
              <select id="category" className="form-select" value={category} onChange={handleCategoryChange}>
                {categoryOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="top" className="form-label">Top N:</label>
              <input id="top" className="form-control" type="number" value={top} onChange={(e) => setTop(e.target.value)} />
            </div>
            <div className="col-md-2">
              <label htmlFor="minPrice" className="form-label">Min Price:</label>
              <input id="minPrice" className="form-control" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </div>
            <div className="col-md-2">
              <label htmlFor="maxPrice" className="form-label">Max Price:</label>
              <input id="maxPrice" className="form-control" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <div className="col-md-2">
              <label htmlFor="sortField" className="form-label">Sort By:</label>
              <select id="sortField" className="form-select" value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <div className="row">
            {currentProducts.map((product, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img src={product.img} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: Rs.{product.price}</p>
                    <p className="card-text">Rating: {product.rating}</p>
                    <p className="card-text">Discount: {product.discount}%</p>
                    <p className="card-text">Description: {product.description}</p>
                    <p className="card-text">Status: {product.availability === 'yes' ? 'Available' : 'Out of Stock'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container mt-4">
          <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
                  <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
