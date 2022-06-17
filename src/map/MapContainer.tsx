import React, { useEffect } from 'react';
import dummy from './dummydataforMap.json';
console.log( dummy);
declare global {
  interface Window {
    kakao: any;
  }
}
interface mapData {
  name: string,
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
        
        function displayMarker<T extends {name: string, location_y: number, location_x: number, active: boolean}>(data: T, i: number) {
          // 마커가 표시될 위치입니다 
          let markerPosition  = new window.kakao.maps.LatLng(data.location_y, data.location_x); 
        
          // 마커를 생성합니다 (핀 모양!)
          let marker = new window.kakao.maps.Marker({
              position: markerPosition,
              map: map, // 마커가 지도 위에 표시되도록 설정합니다
          });

           // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          var activeInfoWindow = '<div style="padding:5px;">Hello World!</div>';
          var unactiveInfoWindow = '<div style="padding:5px;">nooo!</div>';

          //인포윈도우
          var infowindow = new window.kakao.maps.InfoWindow({
            zIndex: 1,
            position: markerPosition,
            content: activeInfoWindow
          });
          infowindow.open(map) //(map,marker)하면 마커(핀)도 나타납니다.

          //클릭이벤트
          // window.kakao.maps.event.addListener(marker, 'click', function () {
          //   if (data.active) {
          //     infowindow.setContent('<div style="padding:5px;font-size:12px;">' + data.name + '</div>')
          //   } else {
          //     infowindow.setContent('<div style="padding:2px;font-size:5px;">' + data.name + '</div>')
          //   }
          //   infowindow.open(map, marker)
          // })
        }
      }, [])

    return (
        <div id="map" style={{ width: "100vw", height: "100vh" }} /> //너비,높이 모두 상대크기(%)로 꼭 지정해두어야 한다.
    );
}

export default MapContainer; 