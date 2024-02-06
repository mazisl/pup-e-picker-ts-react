import { Link } from "react-router-dom";
import { useState } from "react";

import type { Dog } from "../types";
import type { SectionLayoutProps } from "../types";

export const FunctionalSection = ({children, favsAndUnfavsCountArr, allDogs, setCurrentView, activeSelector, setActiveSelector}: SectionLayoutProps) => {

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
          <div className={`selector ${activeSelector === 'Favorited' ? 'active' : ''}`} onClick={() => {
            setActiveSelector('Favorited')
            const favDogs = allDogs.filter((dog) => dog.isFavorite === true);
            setCurrentView(favDogs);
          }}>
            Favorited ({favAndUnfavNums[0]})
          </div>

          {/* This should display the unfavorited count */}
          <div className={`selector ${activeSelector === 'Unfavorited' ? 'active' : ''}`} onClick={() => {
            setActiveSelector('Unfavorited')
            const unfavDogs = allDogs.filter((dog) => dog.isFavorite === false);
            setCurrentView(unfavDogs);
          }}>
            Unfavorited ({favAndUnfavNums[1]})
          </div>
          
          <div className={`selector ${activeSelector === 'CreateDog' ? 'active' : ''}`} onClick={() => {
            setActiveSelector('CreateDog')
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
