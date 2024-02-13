// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";

import type { SectionLayoutProps } from "../types";

export class ClassSection extends Component<SectionLayoutProps, Record<string, never>> {
  render() {
    const {
      children,
      favsAndUnfavsCountArr,
      handleActiveSelector,
      activeSelector,
    } = this.props;

    const favAndUnfavNums = favsAndUnfavsCountArr();

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
              Favorited ({favAndUnfavNums[0]})
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
              Unfavorited ({favAndUnfavNums[1]})
            </div>

            <div
              className={`selector ${
                activeSelector === "CreateDog" ? "active" : ""
              }`}
              onClick={() => {
                handleActiveSelector("CreateDog");
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
