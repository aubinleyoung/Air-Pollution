import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart, Tooltip, Title, ArcElement,
} from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import pollutionContent, {
  airRiskRate,
  spliter,
  gasValue,
} from './pollutionUtilitiesContent';
import { color, override, baseImgSrc } from '../globalUtilities/utility';
import {
  fecthPollution,
  displayCountryMap,
} from '../../redux/POLLUTION/pollution';
import pollution from './PollutionData.module.css';

Chart.register(Tooltip, Title, ArcElement);

// Component PollutionData
const PollutionData = () => {
  const [display, setDisplay] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { name, lat } = spliter(id);
  const latlag = lat;
  useEffect(() => {
    dispatch(fecthPollution(latlag, name[1]));
    dispatch(displayCountryMap(true));
    window.scrollTo(0, 0);
  }, [id]);

  const pollutionDisplay = useSelector((state) => state.pollution.display);
  const loading = useSelector((state) => state.pollution.loading);
  const gasVolume = useSelector((state) => state.pollution);
  const { gas } = gasVolume;

  const storeTest = gas.length !== 0;
  const airRate = storeTest ? airRiskRate(gas[0].rate) : ' ';
  const gasContent = pollutionContent(storeTest, gas);
  const dataShow = gasValue(storeTest, gas);

  const handleClosePop = () => {
    setDisplay(false);
  };

  const handleOpenPop = () => {
    setDisplay(true);
  };

  return (
    <div className="w-full h-full pt-5 text-white">
      <div className="img-container w-48 h-44 m-auto">
        <div
          className={pollution.img_container}
          style={pollutionDisplay ? { display: 'block ' } : { display: 'none' }}
        >
          <img
            src={`${baseImgSrc}/${name[2]}/vector.svg`}
            alt="map"
            className="image-map w-full h-full"
          />
        </div>
      </div>
      <div className="pl-5 mb-5 mt-5 text-xl" data-testid="pollution_data">
        {' '}
        <span className="font-bold text-2xl">{gasVolume.name}</span>
        {' '}
        air
        pollution ( μg/m3 ) stats - 2023
      </div>
      <BounceLoader color={color} css={override} loading={loading} size={60} className="loading m-auto" />
      <div className="grid grid-cols-1">
        <div className="flex pt-10 pl-5 gap-10">{gasContent}</div>
      </div>
      <div className="text-2xl w-4/5 text-center py-5 flex justify-center m-auto gap-5">
        Rate:
        {' '}
        {storeTest ? airRate : 'Unknown'}
        <button type="button" onClick={handleOpenPop} className="rate-btn border-2 rounded-xl text-sm p-2">
          {' '}
          See Rate
          {' '}
        </button>
      </div>

      <div
        className={pollution.chart_area}
        style={display ? { display: 'flex' } : { display: 'none' }}
      >
        <button
          type="button"
          className={pollution.cancle}
          onClick={handleClosePop}
        >
          &times;
        </button>
        <div className={pollution.chart_info}>
          <Doughnut data={dataShow} className={pollution.size_chart} />
        </div>
      </div>
    </div>
  );
};

export default PollutionData;
