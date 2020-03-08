import React, {useEffect, useState} from 'react';
import './App.css';

import Map from './map'

function App() {

  return (
    <div className="App">
      <Map  ></Map>
      <h1>마스크 정보 조회 API 현재 정식 오픈이 아닙니다.</h1>
      <h1>해당 정보는 100% 정확하지 않을 수 있습니다.</h1>
      <h1>참고용으로 사용해주세요.</h1>
    </div>
  );
}

export default App;
