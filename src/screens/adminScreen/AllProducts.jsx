import "../styles/allorder.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import {
    fetchProducts,
    setCurrentPage,
    setSearch,
} from "../../redux/features/products/productSlice";
import { mainWrapper } from "../../apis/main";
import toast from "react-hot-toast";
import { Constants } from "../../apis/constant";

const AllProducts = () => {

    const [showDeleteModal, setShowDeleteModal] = useState  (false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        products,
        loading,
        currentPage,
        limit,
        total,
        search,
    } = useSelector((state) => state.products);

    useEffect(() => {
        const skip = (currentPage - 1) * limit;

        dispatch(
            fetchProducts({
                limit,
                skip,
                search,
            })
        );
    }, [
        dispatch,
        currentPage,
        limit,
        search,
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));


    const deleteProduct = async (id) => {
        try {
            const response = await mainWrapper._delete(`${Constants.URL}/products/delete/${id}`);
            if (response.success) {
                toast.success(response.message);
                dispatch(
                    fetchProducts({
                        limit,
                        skip:
                            (currentPage - 1) *
                            limit,
                        search,
                    })
                );
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.response?.message || "Delete failed");
        }
    };


    return (
        <>
            <NavBar />

            <div className="admin-orders">
                <div className="admin-header">
                    <div>
                        <h1>
                            Products Management
                        </h1>

                        <p>
                            Manage all products
                        </p>
                    </div>

                    <div className="header-right">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => {
                                dispatch(
                                    setSearch(
                                        e.target.value
                                    )
                                );
                            }}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Final Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {[...Array(6)].map(
                                    (_, index) => (
                                        <tr
                                            key={index}
                                        >
                                            <td>
                                                <div className="skeleton skeleton-text"></div>
                                            </td>

                                            <td>
                                                <div className="skeleton skeleton-text"></div>
                                            </td>

                                            <td>
                                                <div className="skeleton skeleton-text"></div>
                                            </td>

                                            <td>
                                                <div className="skeleton skeleton-text"></div>
                                            </td>

                                            <td>
                                                <div className="skeleton skeleton-text"></div>
                                            </td>

                                            <td>
                                                <div className="skeleton skeleton-text"></div>
                                            </td>

                                            <td>
                                                <div className="skeleton skeleton-text"></div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Final Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products?.length >
                                        0 ? (
                                        products.map(
                                            (
                                                product
                                            ) => (
                                                <tr
                                                    key={
                                                        product._id
                                                    }
                                                >
                                                    <td>
                                                        #
                                                        {product._id.slice(
                                                            -8
                                                        )}
                                                    </td>

                                                    <td>
                                                        <img
                                                            src={`data:image/jpeg;base64,${product.image}`}
                                                            alt={
                                                                product.title
                                                            }
                                                            className="product-image"
                                                        />
                                                    </td>

                                                    <td className="product-title">
                                                        {
                                                            product.title
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {
                                                            product.price
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            product.discount
                                                        }
                                                        %
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {(
                                                            product.price -
                                                            (product.price *
                                                                product.discount) /
                                                            100
                                                        ).toFixed(
                                                            2
                                                        )}
                                                    </td>

                                                    <td>
                                                        <select
                                                            className="action-select"
                                                            defaultValue=""
                                                            onChange={(e) => {
                                                                const action =
                                                                    e.target.value;

                                                                if (action === "edit") {
                                                                    navigate(
                                                                        `/owner/edit-product/${product._id}`
                                                                    );
                                                                }

                                                                if (action === "delete") {
                                                                    setSelectedProduct(
                                                                        product
                                                                    );
                                                                    setShowDeleteModal(
                                                                        true
                                                                    );
                                                                }

                                                                e.target.value = "";
                                                            }}
                                                        >
                                                            <option
                                                                value=""
                                                                disabled
                                                            >
                                                                Select
                                                            </option>

                                                            <option value="edit">
                                                                Edit
                                                            </option>

                                                            <option value="delete">
                                                                Delete
                                                            </option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                style={{
                                                    textAlign:
                                                        "center",
                                                    padding:
                                                        "30px",
                                                }}
                                            >
                                                No
                                                products
                                                found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">
                            <button
                                disabled={
                                    currentPage ===
                                    1
                                }
                                onClick={() =>
                                    dispatch(
                                        setCurrentPage(
                                            currentPage -
                                            1
                                        )
                                    )
                                }
                            >
                                Previous
                            </button>

                            <span>
                                {
                                    currentPage
                                }{" "}
                                /{" "}
                                {
                                    totalPages
                                }
                            </span>

                            <button
                                disabled={
                                    currentPage >=
                                    totalPages
                                }
                                onClick={() =>
                                    dispatch(
                                        setCurrentPage(
                                            currentPage +
                                            1
                                        )
                                    )
                                }
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                {showDeleteModal && (
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <h3>
                                Delete Product
                            </h3>

                            <p>
                                Are you sure you want
                                to delete{" "}
                                <strong>
                                    {
                                        selectedProduct?.title
                                    }
                                </strong>
                                ?
                            </p>

                            <div className="modal-actions">
                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setShowDeleteModal(
                                            false
                                        );
                                        setSelectedProduct(
                                            null
                                        );
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        deleteProduct(
                                            selectedProduct._id
                                        );

                                        setShowDeleteModal(
                                            false
                                        );

                                        setSelectedProduct(
                                            null
                                        );
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AllProducts;