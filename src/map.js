import React, { useEffect, useState } from 'react';
import {getMasks} from './APIS/mask';
import './map.css';
let { kakao } = window


let Map = function (props) {
  let [position, setPosition] = useState([37.831971499683, 126.8197768370203])
  let [m, setM] = useState(0)
  let [address, setAddress] = useState('')

  let [map, setMap] = useState()
  let [marker, setMarker] = useState()

  const addressChange = (e) => {
    setAddress(e.target.value)
  }

  const c = (e) => {
    let geocoder = new kakao.maps.services.Geocoder();
    if(address.trim().length <1) {
      alert('주소를 입력하세요')
      return
    }
    geocoder.addressSearch(address.trim(), function(result, status) {
      console.log(result)
      result.map(item => {
        setPosition([item.y, item.x])
      })
    });    
  }

  useEffect(() => {
    let container = document.getElementById('map');
    console.log(position)
    let options = {
      center: new kakao.maps.LatLng(position[0], position[1]),
      // level: 3
    };
    let map = new kakao.maps.Map(container, options);
    
    setMap(map)
    setMarker(marker)
  }, [])

  useEffect(() => {
    if(!marker && !map) return
    
    console.log(position)
    marker = new kakao.maps.Marker({
      map: map,
      // position: new kakao.maps.LatLng(position[0], position[1])
    });
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});
    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    // focus 중심이동
    let coords = new kakao.maps.LatLng(position[0], position[1]);
    map.setCenter(coords);

    (async () => {
      let {count, stores} = await getMasks({
        lat: position[0],
        lng: position[1],
        m: 10000
      })
      console.log(stores)
      console.log(count)

      for(let i = 0 ; i < stores.length; ++i) {
        console.log(stores[i])
        let itemEl = getListItem(i, stores[i])

        let type_map={
          "01": 'hospital',
          "02": 'post',
          "03": 'bank'
        }

        var content = '<div class="customoverlay">' +
          `  <a href="#" target="_blank" class="${type_map[stores[i].type]}">` +
          `    <span class="title">${stores[i].name}(${stores[i].remain_cnt}개)</span>` +
          '  </a>' +
          '</div>';

          marker = await new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(stores[i].lat.toString(), stores[i].lng.toString()),
          content: content
        });

        var customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          position: new kakao.maps.LatLng(stores[i].lat, stores[i].lng),
          content: content,
          yAnchor: 1 
        });

        fragment.appendChild(itemEl);
      }

      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;
      
    })()
  }, [position])

  function getListItem(index, store) {
    let type_map={
      "01": '약국',
      "02": '우체국',
      "03": '농협'
    }
    var el = document.createElement('li'),
    itemStr = '<span className="markerbg marker_' + (index+1) + '"></span>' +
                '<div className="info">' +
                '   <h5>' + store.name + '</h5>';
    itemStr += '    <span>' +  store.addr  + '</span>'; 
    itemStr += '  <span className="tel"> 남은수량:'  + store.remain_cnt  + '</span>' + '</div>';           
    itemStr += '  <span className="tel"> 종류:'  + type_map[store.type]  + '</span>' + '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

  function removeMarker() {
    // for ( var i = 0; i < marker.length; i++ ) {
    //   marker[i].setMap(null);
    // }   
    // marker = [];
    setMarker([])
  }

  function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
  }

  return (
    <div className="map_wrap">

      <div id="menu_wrap" className="bg_white">
          <div className="option">
              <div>
                <span className="text">주소 : </span>
                <input type="text" className="input" onChange={addressChange}/> 
                <button type="submit" className="search" onClick={c}>검색하기</button> 
              </div>
          </div>
          <hr />
          <ul id="placesList"></ul>
          <div id="pagination"></div>
      </div>
      <div id="map"></div>
    </div>
  )
}

export default Map;