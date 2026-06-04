import React from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);

  console.log(orders)

  return (
    <>
      <NavBar />

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.heading}>
            My Orders
          </h1>

          <p style={styles.subText}>
            Track and manage your purchases
          </p>
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <h2>No Orders Yet</h2>

            <p>
              Complete a purchase to see
              your orders here.
            </p>
          </div>
        ) : (
          <div style={styles.ordersWrapper}>
  {orders.map((order) => (
    <div key={order.id} style={styles.orderCard}>
      {/* ORDER HEADER */}
      <div style={styles.orderHeader}>
        <div>
          <h3 style={styles.orderTitle}>
            Order #{order.id}
          </h3>

          <p style={styles.date}>
            {new Date(order.date).toLocaleString()}
          </p>
        </div>

        <div style={styles.orderSummary}>
          <span style={styles.status}>
            Paid
          </span>

          <h3 style={styles.total}>
            ${order.total.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* PRODUCTS */}
      {order.items.map((item) => (
        <div
          key={item.id}
          style={styles.productRow}
        >
          <div style={styles.leftSection}>
            <img
              src={item.thumbnail}
              alt={item.title}
              style={styles.image}
            />

            <div style={styles.info}>
              <h3 style={styles.productName}>
                {item.title}
              </h3>

              <p style={styles.orderId}>
                Brand: {item.brand}
              </p>

              <p style={styles.date}>
                Quantity: {item.quantity}
              </p>
            </div>
          </div>

          <div style={styles.rightSection}>
            <h3 style={styles.price}>
              $
              {(
                item.price *
                item.quantity
              ).toFixed(2)}
            </h3>
          </div>
        </div>
      ))}
    </div>
  ))}
</div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
orderCard: {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
},

orderHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: "16px",
  marginBottom: "20px",
},

orderTitle: {
  margin: 0,
  fontSize: "22px",
  color: "#111827",
},

orderSummary: {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "8px",
},

total: {
  margin: 0,
  fontSize: "24px",
  color: "#111827",
},

productRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 0",
  borderBottom: "1px solid #f3f4f6",
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