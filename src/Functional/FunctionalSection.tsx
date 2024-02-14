import { Link } from "react-router-dom";

import type { SectionLayoutProps } from "../types";

export const FunctionalSection = ({
  children,
  favoritesCount,
  unfavoritesCount,
  handleActiveSelector,
  activeSelector,
}: SectionLayoutProps) => {

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              activeSelector === "favorited" ? "active" : ""
            }`}
            onClick={() => {
              handleActiveSelector("favorited");
            }}
          >
            Favorited ({favoritesCount})
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeSelector === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              handleActiveSelector("unfavorited");
            }}
          >
            Unfavorited ({unfavoritesCount})
          </div>

          <div
            className={`selector ${
              activeSelector === "createDog" ? "active" : ""
            }`}
            onClick={() => {
              handleActiveSelector("createDog");
            }}
          >
            Create Dog
          </div>
        </div>
      </div>

      <div className="content-container">{children}</div>
    </section>
  );
};
