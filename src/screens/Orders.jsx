import React from "react";

const orders = [
  {
    id: "#ORD1025",
    product: "Wireless Headphones",
    price: "$129",
    status: "Delivered",
    date: "20 May 2026",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: "#ORD1026",
    product: "Smart Watch",
    price: "$199",
    status: "Shipped",
    date: "18 May 2026",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: "#ORD1027",
    product: "Gaming Mouse",
    price: "$59",
    status: "Processing",
    date: "16 May 2026",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
  },
];

const Orders = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.heading}>My Orders</h1>

        <p style={styles.subText}>
          Track and manage your purchases
        </p>
      </div>

      {/* Orders */}
      <div style={styles.ordersWrapper}>
        {orders.map((item) => (
          <div key={item.id} style={styles.card}>
            {/* Left Section */}
            <div style={styles.leftSection}>
              <img
                src={item.image}
                alt={item.product}
                style={styles.image}
              />

              <div style={styles.info}>
                <h3 style={styles.productName}>
                  {item.product}
                </h3>

                <p style={styles.orderId}>
                  {item.id}
                </p>

                <p style={styles.date}>
                  Ordered on {item.date}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div style={styles.rightSection}>
              <h2 style={styles.price}>
                {item.price}
              </h2>

              <span
                style={{
                  ...styles.status,
                  backgroundColor:
                    item.status === "Delivered"
                      ? "#dcfce7"
                      : item.status === "Shipped"
                      ? "#dbeafe"
                      : "#fef9c3",

                  color:
                    item.status === "Delivered"
                      ? "#166534"
                      : item.status === "Shipped"
                      ? "#1d4ed8"
                      : "#854d0e",
                }}
              >
                {item.status}
              </span>

              <button style={styles.button}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    marginBottom: "35px",
  },

  heading: {
    fontSize: "40px",
    color: "#111827",
    marginBottom: "8px",
  },

  subText: {
    color: "#6b7280",
    fontSize: "16px",
  },

  ordersWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    flexWrap: "wrap",
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: 1,
    minWidth: "280px",
  },

  image: {
    width: "130px",
    height: "130px",
    borderRadius: "16px",
    objectFit: "cover",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  productName: {
    margin: 0,
    fontSize: "24px",
    color: "#111827",
  },

  orderId: {
    margin: 0,
    color: "#6b7280",
    fontSize: "15px",
  },

  date: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "14px",
  },

  rightSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "14px",
    minWidth: "180px",
  },

  price: {
    margin: 0,
    fontSize: "30px",
    color: "#111827",
  },

  status: {
    padding: "8px 16px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "600",
  },

  button: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#111827",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Orders;