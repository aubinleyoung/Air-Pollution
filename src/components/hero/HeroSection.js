import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fecthCountry } from '../../redux/Country/countries';
import { baseImgSrc } from '../globalUtilities/utility';
import hero from './Hero.module.css';

const HeroSection = () => {
  const selectRef = useRef();

  const [region, setRegion] = useState('Europe');

  const dispatch = useDispatch();

  const setRefState = () => {
    const newRegion = selectRef.current.value;
    setRegion(newRegion);
  };

  const handleFetchCountry = () => {
    const regionPass = region.toLowerCase();
    dispatch(fecthCountry(regionPass));
  };

  const pollution = useSelector((state) => state.pollution.display);

  const countries = useSelector((state) => state.country_name);
  const { country } = countries;
  const headName = countries.regionName;

  const headNameFormat = headName.charAt(0).toUpperCase() + headName.slice(1);

  const regionSmallLetters = headName === 'americas' ? 'america' : headName;

  return (
    <div className="w-full h-fit mt-20 bg-[#cc4378]">
      <div
        className="flex items-center gap-2 w-full"
        style={pollution ? { display: 'none' } : { display: 'flex' }}
      >
        <div className="left w-1/2 h-fit">
          <img
            src={`${baseImgSrc}/${regionSmallLetters}/vector.svg`}
            alt="map"
            className={hero.image}
          />
        </div>
        <div className="w-1/2 h-fit">
          <p data-testid="header_name">{headNameFormat}</p>
          <span>
            {' '}
            {country.length !== 0 ? country[0].length : ' '}
            {' '}
            countries
            {' '}
          </span>
          <form className="mt-2 flex flex-col gap-2 w-4/5 ">
            <select name="selected" ref={selectRef} onChange={setRefState} className="rounded-xl p-1 outline-none bg-transparent border-2">
              <option className="text-[#d04379]">
                {headNameFormat}
                {' '}
                *
                {' '}
              </option>
              <option value="Asia" className="text-[#d04379]"> Asia</option>
              <option value="Oceania" className="text-[#d04379]">Oceania </option>
              <option value="Europe" className="text-[#d04379]"> Europe </option>
              <option value="Americas" className="text-[#d04379]"> Americas</option>
              <option value="Africa" className="text-[#d04379]"> Africa</option>
            </select>
            <NavLink
              to={`/country/${region}`}
              onClick={(e) => handleFetchCountry(e)}
            >
              <button type="button" data-testid="button" className="border-2 text-sm p-2 rounded-xl">
                {' '}
                Search Region
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
