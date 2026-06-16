import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Constants } from "../apis/constant";
import "./styles/createProduct.css";

function CreateProduct() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        discount: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            return toast.error("Title is required");
        }
         if (!formData.description.trim()) {
            return toast.error("Description is required");
        }
        if (!formData.price) {
            return toast.error("Price is required");
        }
        if (!image) {
            return toast.error("Product image is required");
        }
        try {
            setLoading(true);
            const data = new FormData();
            data.append("title", formData.title);
            data.append("price", formData.price);
            data.append("description", formData.description);
            data.append("discount", formData.discount);
            data.append("image", image);
            const user = await JSON.parse(localStorage.getItem("user"));
            const response = await axios.post(`${Constants.development}/products/create`, data,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                        Authorization: `Bearer ${user?.token || ""}`,
                    },
                }
            );
            toast.success(response.data.message);
            setFormData({
                title: "",
                price: "",
                discount: "",
            });
            setImage(null);
            setPreview("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="create-product-page">
            <div className="create-product-card">
                <div className="product-left">
                    <h1>Add New Product</h1>

                    <p>
                        Create and manage your store
                        products with ease.
                    </p>

                    {preview ? (
                        <img
                            src={preview}
                            alt="preview"
                            className="product-preview"
                        />
                    ) : (
                        <div className="upload-placeholder">
                            Product Preview
                        </div>
                    )}
                </div>

                <div className="product-right">
                    <h2>Create Product</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Product Title</label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter product title"
                            />
                        </div>

                         <div className="input-group">
                            <label>Product Title</label>

                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                            />
                        </div>

                        <div className="input-group">
                            <label>Price</label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                            />
                        </div>

                        <div className="input-group">
                            <label>Discount (%)</label>

                            <input
                                type="number"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                placeholder="Enter discount"
                            />
                        </div>

                        <div className="input-group">
                            <label>Product Image</label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                            />
                        </div>

                        <button
                            type="submit"
                            className="create-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;