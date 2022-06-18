import React, { useEffect } from 'react';
import dummy from './dummydataforMap.json';
import './MapContainer.css';

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
          level: 1 //지도의 레벨(확대, 축소 정도)
        };
        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        for (let i=0; i< dummy.data.length; i++){
          displayMarker(dummy.data[i],i);
        }
        
        function displayMarker<T extends {name: string, location_y: number, location_x: number, active: boolean}>(data: T, i: number) {
          // console.log(data);
          // console.log(data.active);
          // 인포윈도우 표시될 위치입니다 
          let iwPosition  = new window.kakao.maps.LatLng(data.location_y, data.location_x); 

           // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          var activeInfoWindow = `<div class="active infowindow">${data.name}</div>`;
          var unactiveInfoWindow = `<div class="unactive infowindow">${data.name}</div>`;
          // const infowindowStyle = {{

          // }}

          //인포윈도우
          let infowindow;
          if (data.active) {
            infowindow = new window.kakao.maps.InfoWindow({
              zIndex: 1,
              position: iwPosition,
              content: activeInfoWindow,
              disableAutoPan: false,
              map: map
            });
          } else{
            infowindow = new window.kakao.maps.InfoWindow({
              zIndex: 1,
              position: iwPosition,
              content: unactiveInfoWindow,
              disableAutoPan: false,
              map: map
            });
          }

          var position = new window.kakao.maps.LatLng(37.586272, 127.029005);
          map.setCenter(position); //중심좌표 재설정

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

        // https://sir.kr/g5_tip/14200
        var infoTitle = document.querySelectorAll('.infowindow');
        infoTitle.forEach(function(e: any) {
          // console.log(e,e.className.includes('unactive'));
          var w = e.offsetWidth + 10;
          var ml = w/2;
          e.parentElement.style.width = w;  
          // e.parentElement.style.top = "82px";
          e.parentElement.style.position = "relative";
          // e.parentElement.style.left = "50%";
          // e.parentElement.style.marginLeft = -ml+"px";
          // e.parentElement.style.width = w+"px";
          // e.parentElement.previousSibling.style.display = "none"; //꼭지
          if (e.className.includes('unactive')){
            e.parentElement.previousSibling.style.backgroundImage = "url('https://user-images.githubusercontent.com/81412212/174342201-0ec0c927-97f1-49dd-8c23-d6a872d9dfad.png')"; //꼭지
          } else {
            e.parentElement.previousSibling.style.backgroundImage = "url('https://user-images.githubusercontent.com/81412212/174341207-bbaa6a46-2d67-4731-8a51-9a429488affa.png')"; //꼭지
          }
          // e.parentElement.parentElement.style.width = 105; //부모(기본인포윈도우영역)
          e.parentElement.parentElement.style.display = "flex"; //부모(기본인포윈도우영역)
          e.parentElement.parentElement.style.background = "none"; //부모(기본인포윈도우영역)
          e.parentElement.parentElement.style.border = "none"; //부모(기본인포윈도우영역)
          e.parentElement.parentElement.style.justifyContent = "center"; //부모(기본인포윈도우영역)
          // e.parentElement.parentElement.style.border = "0px";
          // e.parentElement.parentElement.style.background = "unset";
        });
      }, [])

    return (
        <div id="map" style={{ width: "100vw", height: "100vh" }} /> //너비,높이 모두 상대크기(%)로 꼭 지정해두어야 한다.
    );
}

export default MapContainer; 