// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";

import type { SectionLayoutProps } from "../types";

export class ClassSection extends Component<SectionLayoutProps, Record<string, never>> {
  render() {
    const {
      children,
      favoritesCount,
      unfavoritesCount,
      handleActiveSelector,
      activeSelector,
    } = this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
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
  }
}
