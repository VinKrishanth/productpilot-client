import React, { useState } from "react";
import { PlusCircle, Eye, Pencil, Trash2 , ArrowLeftToLineIcon, ArrowRightToLine} from "lucide-react";
import AddProductForm from "../../components/admin/products/AddProductForm";
import ViewProductDetails from "../../components/admin/products/ViewProductDetails";
import EditProductForm from "../../components/admin/products/EditProductForm";
import DeleteProductConfirmation from "../../components/admin/products/DeleteProductConfirmation";
import { useAppContext } from "../../context/AppContext";


export default function ShopProducts() {
  const { products, setProducts, navigate } = useAppContext();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // const filteredProducts = (products || []).filter((product) => product.type === 'Popular').slice(0, 10);
  const filteredProducts = (products || []);


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    setIsEditOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setIsDeleteOpen(false);
  };

  const toggleStock = (id) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)));
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-10 text-center">All Products</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 focus:outline-none rounded px-4 py-2 w-full md:max-w-sm"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <button
          onClick={() => {
            setIsAddOpen(true);
            navigate("/admin/products/add");
          }}
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded mt-4">
        <table className="w-full min-w-[800px] table-auto text-sm">
          <thead className="bg-gray-100 text-left font-medium">
            <tr>
              <th className="p-3 w-[250px]">Product Name</th>
              <th className="p-3 hidden md:table-cell">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Offer [%]</th>
              <th className="p-3">Offer Price</th>
              <th className="p-3">In Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded border border-gray-300 object-cover"
                    />
                    <span className="truncate">{product.name}</span>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell">{product.category}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">{product.offer}</td>
                <td className="p-3">${product.offerPrice.toFixed(2)}</td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={product.inStock}
                    onChange={() => toggleStock(product._id)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="p-3 text-right space-x-2 min-w-25">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsViewOpen(true);
                    }}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsEditOpen(true);
                    }}
                    className="text-gray-600 hover:text-yellow-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsDeleteOpen(true);
                    }}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination with Prev/Next */}
      <div className="flex justify-center items-center mt-6 mb-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border text-sm ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-600 hover:bg-blue-50"
          }`}
        >
          <ArrowLeftToLineIcon className="h-5 w-5" />
        </button>

        {Array.from(
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              {i + 1}
            </button>
          )
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(filteredProducts.length / productsPerPage)
              )
            )
          }
          disabled={
            currentPage === Math.ceil(filteredProducts.length / productsPerPage)
          }
          className={`px-3 py-1 rounded border text-sm ${
            currentPage === Math.ceil(filteredProducts.length / productsPerPage)
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-600 hover:bg-blue-50"
          }`}
        >
           <ArrowRightToLine className="h-5 w-5" />
        </button>
      </div>

      {/* Modals */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <AddProductForm />
          </div>
        </div>
      )}

      {isViewOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <ViewProductDetails
              product={selectedProduct}
              onClose={() => setIsViewOpen(false)}
            />
          </div>
        </div>
      )}

      {isEditOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <EditProductForm
              product={selectedProduct}
              onUpdateProduct={handleUpdateProduct}
              onCancel={() => setIsEditOpen(false)}
            />
          </div>
        </div>
      )}

      {isDeleteOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
            <DeleteProductConfirmation
              product={selectedProduct}
              onConfirmDelete={handleDeleteProduct}
              onCancel={() => setIsDeleteOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
