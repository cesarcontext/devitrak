import React from "react";
import { ArticleCardSaved } from "../../components/admin/Articles/ArticleCardSaved";
import { ArticleContentCreation } from "../../components/admin/Articles/ArticleContentCreation";
import { Navbar } from "../../components/admin/ui/Navbar";

export const Articles = () => {
  return (
    <div>
      <Navbar />
      <h2>Articles</h2>
      <div>
        <div>
          <ArticleContentCreation />
        </div>
        <div>
          <hr />
          <label>Articles created</label>
        </div>
        <div>
          <ArticleCardSaved />
        </div>
      </div>
    </div>
  );
};
