import React, {useEffect, useState} from 'react';
import './App.css';

import Map from './map'

function App() {

  return (
    <div className="App">
      <Map></Map>
      <div className="helper">
        <div className="hospital">
          <label>약국 </label>
          <div className="dot"></div>
        </div>
        <div className="post">
          <label>우체국 </label>
          <div className="dot"></div>
        </div>
        <div className="bank">
          <label>농협 </label>
          <div className="dot"></div>
        <p>
          지도상의 마커 색상에 따라 약국/농협/우체국을 구분합니다.
        </p>
        </div>
      </div>
      <div>
        <h1>마스크 정보 조회 API 현재 정식 오픈이 아닙니다.</h1>
        <h1>모바일 반응 미지원.</h1>
        <h1>해당 정보는 100% 정확하지 않을 수 있습니다.</h1>
        <h1>참고용으로 사용해주세요.</h1>
      </div>
    </div>
  );
}

export default App;
