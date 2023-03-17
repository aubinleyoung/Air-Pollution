import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone } from 'react-icons/fa';
import { IoIosSettings, IoIosArrowBack } from 'react-icons/io';

import { displayCountryMap } from '../../redux/POLLUTION/pollution';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setDisplay = () => {
    navigate(-1);
    dispatch(displayCountryMap(false));
  };

  return (
    <div className="flex items-center text-white justify-between bg-[#ec4c8b] fixed top-0 left-0 right-0 z-10 h-20 pr-2">
      <div className="flex   items-center 0">
        <button
          type="button"
          onClick={setDisplay}
          className=""
        >
          <IoIosArrowBack className="cursor-pointer text-3xl" />
        </button>
        <span className="font-bold text-xl" data-testid="year">
          {' '}
          2023
        </span>
      </div>
      <h3>Most views</h3>

      <div className="flex justify-center items-center cursor-pointer text-xl gap-10">
        <FaMicrophone />
        <IoIosSettings className="text-2xl" />
      </div>
    </div>
  );
};

export default Header;
