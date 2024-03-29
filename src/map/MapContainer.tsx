import React, { useEffect, useState } from "react";
import "./MapContainer.css";
import axios from "axios";
import { useParams } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}
interface PlaceInterface {
  addressDetail: string;
  addressStreet: string;
  category: string;
  distance: number;
  imageUrl: string;
  mission: boolean;
  name: string;
  point: number;
  storeId: number;
  userX: number;
  userY: number;
}
export type Contents = {};

const MapContainer = () => {
  const params = useParams();
  const [Places, setPlaces] = useState<PlaceInterface[]>([]); // 검색결과 배열에 담아줌
  const [done, setDone] = useState(false);

  async function getData() {
    await axios
      .get(`https://bobpossible.shop/api/v1/map/stores/${params.userId}`)
      .then((res) => {
        setPlaces((Places) => []);
        res.data.result.forEach((e: any) => {
          setPlaces((prev) => [
            ...prev,
            {
              addressDetail: e.addressDetail,
              addressStreet: e.addressStreet,
              category: e.category,
              distance: e.distance,
              imageUrl: e.imageUrl,
              mission: e.mission,
              name: e.name,
              point: e.point,
              storeId: e.storeId,
              userX: e.userX,
              userY: e.userY,
            },
          ]);
        });
        setDone(true);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(Places.length);
    if (done === true && Places.length !== 0) {
      let container = document.getElementById("map");
      let options = {
        center: new window.kakao.maps.LatLng(Places[0].userY, Places[0].userX),
        level: 3,
      };
      let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      let geocoder = new window.kakao.maps.services.Geocoder();
      for (let i = 0; i < Places.length; i++) {
        geocoder.addressSearch(
          Places[i].addressStreet,
          function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              var coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
              var activeInfoWindow = `<div class="active infowindow" id=${Places[i].storeId}>
              <span class="pointText" id=${Places[i].storeId}>${Places[i].point}P</span>
              <span class="nameText" id=${Places[i].storeId}>${Places[i].name}</span>
              </div>`;
              var inactiveInfoWindow = `<div class="inactive infowindow" id=${Places[i].storeId}>
              <span class="nameText" id=${Places[i].storeId}>${Places[i].name}</span>
              </div>`;

              //인포윈도우
              let infowindow;
              if (Places[i].mission) {
                infowindow = new window.kakao.maps.InfoWindow({
                  zIndex: 1,
                  position: coords,
                  content: activeInfoWindow,
                  disableAutoPan: false,
                  map: map,
                });
              } else {
                infowindow = new window.kakao.maps.InfoWindow({
                  zIndex: 1,
                  position: coords,
                  content: inactiveInfoWindow,
                  disableAutoPan: false,
                  map: map,
                });
              }
              var position = new window.kakao.maps.LatLng(
                Places[i].userY,
                Places[i].userX
              );
              map.setCenter(position); //중심좌표 재설정

              var infoTitle = document.querySelectorAll(".infowindow");
              infoTitle.forEach(function (e: any) {
                var w = e.offsetWidth + 10;
                e.parentElement.style.width = w;
                e.parentElement.style.position = "relative";
                if (e.className.includes("inactive")) {
                  //비활성화 핀
                  e.parentElement.style.top = "3px";
                  e.parentElement.previousSibling.className = "black";
                } else {
                  e.parentElement.previousSibling.className = "purple";
                  e.childNodes[1].style.display = "block";
                  e.childNodes[1].style.margin = "-8px";
                  e.parentElement.style.top = "-9px";
                }
                e.parentElement.parentElement.style.display = "flex";
                e.parentElement.parentElement.style.background = "none";
                e.parentElement.parentElement.style.border = "none";
                e.parentElement.parentElement.style.justifyContent = "center";

                e.onclick = handleIwClick; //인포윈도우 클릭이벤트
                e.parentElement.parentElement.style.cursor = "pointer";
              });
            } else {
              console.log("주소 잘못됨: ", Places[i].name);
            }
          }
        );
      }
    } else if (done === true && Places.length === 0) {
      console.log("주변 가게 없음");
      let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        center: new window.kakao.maps.LatLng(
          Number(params.lat),
          Number(params.lng)
        ),
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      console.log(options);
      let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    }
    function handleIwClick(e: any) {
      window.ReactNativeWebView.postMessage(e.target.id);
    }
  }, [done]);

  return (
    <div id="map" style={{ width: "100vw", height: "100vh" }} /> //너비,높이 모두 상대크기(%)로 꼭 지정해두어야 한다.
  );
};

export default MapContainer;
