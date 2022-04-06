import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import { useDispatch } from 'react-redux';


import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../../fireConfig";
import DeleteProduct from "./DeleteProduct";
import { AddProduts } from "../rudux/reducers";

export default function Products() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      dispatch(AddProduts(articles));
      console.log(articles);
    });
  }, []);
  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles found!</p>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,
            price,
            imageUrl,
            createdAt,
            createdBy,
            userId,
          }) => (
            <div className="border mt-3 p-3 bg-light" key={id}>
              <div className="row">
                <div className="col-lg-3 col-md-6col-sm-12">
                  <Link to={`/article/${id}`}>
                    <img
                      src={imageUrl}
                      alt="title"
                      style={{ height: 180, width: 180 }}
                    />
                  </Link>
                </div>
                <div className="col-lg-9 col-md-6 col-sm-12 "> 
                  <h3>{title}</h3>
                  <h2>{price}</h2>
                  <p>{createdAt.toDate().toDateString()}</p>
                  <h5>{description}</h5>
                <div className="col-9 ps-3">
                  <div className="row">
                    <div className="col-6">
                      {createdBy && (
                        <span className="badge bg-primary">{createdBy}</span>
                      )}
                    </div>
                    <div className="col-6 d-flex flex-row-reverse">
                      {user && user.uid === userId && (
                        <DeleteProduct id={id} imageUrl={imageUrl} />
                      )}
                    </div>
                  </div>
                  
                </div>
                  </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}