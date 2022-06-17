import React, { useEffect } from 'react';
import dummy from './dummydataforMap.json';
console.log( dummy);
declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer = () => {
    useEffect(() => {
        let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        let options = { //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.586272, 127.029005), //지도의 중심좌표. ((안암역))
          level: 3 //지도의 레벨(확대, 축소 정도)
        };
        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        for (let i=0; i< dummy.data.length; i++){
          displayMarker(dummy.data[i],i);
        }
        
        function displayMarker(data: object, i: number) {
          // 마커가 표시될 위치입니다 
          let markerPosition  = new window.kakao.maps.LatLng(dummy.data[i].location_y, dummy.data[i].location_x); 
        
          // 마커를 생성합니다
          let marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: map, // 마커가 지도 위에 표시되도록 설정합니다
          });
        }
      }, [])

    return (
        <div id="map" style={{ width: "100vw", height: "100vh" }} /> //너비,높이 모두 상대크기(%)로 꼭 지정해두어야 한다.
    );
}

export default MapContainer; 