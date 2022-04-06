import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../../fireConfig";
import Layout from "../Layout";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [user] = useAuthState(auth);
  
    useEffect(() => {
      const docRef = doc(db, "Articles", id);
        onSnapshot(docRef, (snapshot) => {
        setProduct({ ...snapshot.data(), id: snapshot.id });
      });
    }, []);
    return (
        <Layout>
      <div className="container border bg-light" style={{ marginTop: 70 }}>
        {product && (
          <div className="row">
            <div className="col-3">
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{ width: "100%", padding: 10 }}
              />
            </div>
            <div className="col-9 mt-3">
              <h2>Name:{product.title}</h2>
              <hr />
              <h5>Price:{product.price}</h5>
              <h4>{product.description}</h4>
            </div>
          </div>
        )}
       </div>
      </Layout>
  )
}

export default ProductDetails