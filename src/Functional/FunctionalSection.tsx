import { Link } from "react-router-dom";
import { useState } from "react";

import type { Dog } from "../types";
import type { SectionLayoutProps } from "../types";

export const FunctionalSection = ({children, favsAndUnfavsCountArr, handleActiveSelector, activeSelector}: SectionLayoutProps) => {

  const favAndUnfavNums = favsAndUnfavsCountArr();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div className={`selector ${activeSelector === 'favorited' ? 'active' : ''}`} onClick={() => {
            handleActiveSelector('favorited')
            // const favDogs = allDogs.filter((dog) => dog.isFavorite === true);
            // setCurrentView(favDogs);
          }}>
            Favorited ({favAndUnfavNums[0]})
          </div>

          {/* This should display the unfavorited count */}
          <div className={`selector ${activeSelector === 'unfavorited' ? 'active' : ''}`} onClick={() => {
            handleActiveSelector('unfavorited')
            // const unfavDogs = allDogs.filter((dog) => dog.isFavorite === false);
            // setCurrentView(unfavDogs);
          }}>
            Unfavorited ({favAndUnfavNums[1]})
          </div>
          
          <div className={`selector ${activeSelector === 'CreateDog' ? 'active' : ''}`} onClick={() => {
            handleActiveSelector('CreateDog')
          }}>
            Create Dog
          </div>
        </div>
      </div>

      <div className="content-container">
        {children}
      </div>
    </section>
  );
};
