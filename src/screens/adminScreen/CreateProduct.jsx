import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Constants } from "../../apis/constant";
import "../styles/createProduct.css";
import NavBar from "../NavBar";
import { mainWrapper } from "../../apis/main";

function CreateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const userData = useSelector(
        (state) => state.user.user
    );

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        discount: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setPageLoading(true);
            const response = await mainWrapper.get(`${Constants.URL}/products/product/${id}`);
            const product = response?.product;
            if (!product) {
                return toast.error("Product not found");
            }
            setFormData({
                title: product.title || "",
                description: product.description || "",
                price: product.price || "",
                discount: product.discount || "",
            });
            if (product.image) {
                setPreview(`data:image/jpeg;base64,${product.image}`);
            }
        } catch (error) {
            toast.error(
                error.response?.message ||
                "Failed to fetch product"
            );
        } finally {
            setPageLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.value,
        }));
    };

    const handleImage = (e) => {
        const file =
            e.target.files?.[0];

        if (!file) return;

        setImage(file);
        setPreview(
            URL.createObjectURL(file)
        );
    };

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        if (
            !formData.title.trim()
        ) {
            return toast.error(
                "Title is required"
            );
        }

        if (
            !formData.description.trim()
        ) {
            return toast.error(
                "Description is required"
            );
        }

        if (!formData.price) {
            return toast.error(
                "Price is required"
            );
        }

        if (
            !isEditMode &&
            !image
        ) {
            return toast.error(
                "Product image is required"
            );
        }

        try {
            setLoading(true);

            const data =
                new FormData();

            data.append(
                "title",
                formData.title
            );
            data.append(
                "description",
                formData.description
            );
            data.append(
                "price",
                formData.price
            );
            data.append(
                "discount",
                formData.discount
            );

            if (image) {
                data.append(
                    "image",
                    image
                );
            }

            let response;

            if (isEditMode) {
                response =
                    await axios.put(
                        `${Constants.URL}/products/update/${id}`,
                        data,
                        {
                            headers: {
                                "Content-Type":
                                    "multipart/form-data",
                                Authorization: `Bearer ${userData?.token || ""}`,
                            },
                        }
                    );
            } else {
                response =
                    await axios.post(
                        `${Constants.URL}/products/create`,
                        data,
                        {
                            headers: {
                                "Content-Type":
                                    "multipart/form-data",
                                Authorization: `Bearer ${userData?.token || ""}`,
                            },
                        }
                    );
            }

            toast.success(
                response.data.message
            );

            if (isEditMode) {
                navigate(
                    "/owner/all-products"
                );
                return;
            }

            setFormData({
                title: "",
                description: "",
                price: "",
                discount: "",
            });

            setImage(null);
            setPreview("");
        } catch (error) {
            toast.error(
                error.response?.data
                    ?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <>
                <NavBar />
                <div
                    className="loading"
                    style={{
                        padding:
                            "40px",
                        textAlign:
                            "center",
                    }}
                >
                    Loading...
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />

            <div className="create-product-page">
                <div className="create-product-card">
                    <div className="product-left">
                        <h2>
                            {isEditMode
                                ? "Edit Product"
                                : "Add New Product"}
                        </h2>

                        <p>
                            {isEditMode
                                ? "Update product information."
                                : "Create and manage your store products with ease."}
                        </p>

                        {preview ? (
                            <img
                                src={preview}
                                alt="preview"
                                className="product-preview"
                            />
                        ) : (
                            <div className="upload-placeholder">
                                Product
                                Preview
                            </div>
                        )}
                    </div>

                    <div className="product-right">
                        <h2>
                            {isEditMode
                                ? "Update Product"
                                : "Create Product"}
                        </h2>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >
                            <div className="input-group">
                                <label>
                                    Product
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter product title"
                                />
                            </div>

                            <div className="input-group">
                                <label>
                                    Product
                                    Description
                                </label>

                                <input
                                    type="text"
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter product description"
                                />
                            </div>

                            <div className="input-group">
                                <label>
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={
                                        formData.price
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter price"
                                />
                            </div>

                            <div className="input-group">
                                <label>
                                    Discount
                                    (%)
                                </label>

                                <input
                                    type="number"
                                    name="discount"
                                    value={
                                        formData.discount
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter discount"
                                />
                            </div>

                            <div className="input-group">
                                <label>
                                    Product
                                    Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleImage
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="create-btn"
                                disabled={
                                    loading
                                }
                            >
                                {loading
                                    ? isEditMode
                                        ? "Updating..."
                                        : "Creating..."
                                    : isEditMode
                                        ? "Update Product"
                                        : "Create Product"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProduct;