import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArticleCardSaved } from "../../components/admin/Articles/ArticleCardSaved";
import { Navbar } from "../../components/admin/ui/Navbar";

export const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <div>
      <Navbar />
      <h2>Articles</h2>
      <div>
        <div style={{ width: "70%", margin: "2% auto", display: "flex"}}> 
          <div style={{ width: "20%"}}>
          
          <NavLink to="/admin/create-article"><button>CREATE NEW </button></NavLink>
        </div>
        <div style={{ width: "70%", display: "flex"}}>
          <input name="searchTerm" value={ searchTerm } onChange={ event => setSearchTerm( event.target.value )} style={{ width: "80%"}} />
        </div>
        </div>
        <div>
          <ArticleCardSaved searchTerm={ searchTerm } />
        </div>
      </div>
    </div>
  );
};