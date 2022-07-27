import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MapContainer.css";

declare global {
  interface Window {
    kakao: any;
  }
}
export type StoreType = {
  addressDetail: string;
  addressStreet: string;
  category: string;
  distance: number;
  // imageUrl: string;
  mission: boolean;
  name: string;
  point: number;
  storeId: number;
  userX: number;
  userY: number;
};

const MapSearch = () => {
  const params = useParams();
  console.log("검색키워드 :", params.keyword);
  const [storeInfo, setStoreInfo] = useState<StoreType[]>([]);
  const [done, setDone] = useState(false);

  async function getData() {
    await axios
      .get(`https://bobpossible.shop/api/v1/search/${params.userId}`, {
        params: {
          keyword: params.keyword,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStoreInfo((storeInfo) => []);
        res.data.result.forEach((e: any) => {
          setStoreInfo((prev) => [
            ...prev,
            {
              addressDetail: e.addressDetail,
              addressStreet: e.addressStreet,
              category: e.category,
              distance: e.distance,
              // imageUrl: e.imageUrl,
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
  function handleIwClick(e: any) {
    window.ReactNativeWebView.postMessage(e.target.id);
  }
  console.log(done, storeInfo.length);
  useEffect(() => {
    if (done === true && storeInfo.length !== 0) {
      console.log(storeInfo);
      let container = document.getElementById("map");
      let options = {
        center: new window.kakao.maps.LatLng(
          storeInfo[0].userY,
          storeInfo[0].userX
        ), //지도의 중심좌표. ((안암역))
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      let map = new window.kakao.maps.Map(container, options);
      let geocoder = new window.kakao.maps.services.Geocoder();
      for (let i = 0; i < storeInfo.length; i++) {
        geocoder.addressSearch(
          storeInfo[i].addressStreet,
          function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              var coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              map.setCenter(coords); //중심좌표 재설정

              var inactiveInfoWindow = `<div class="inactive infowindow" id=${storeInfo[i].storeId}>
                  <span class="nameText" id=${storeInfo[i].storeId}>${storeInfo[i].name}</span>
                  </div>`;

              //인포윈도우
              let infowindow = new window.kakao.maps.InfoWindow({
                zIndex: 1,
                position: coords,
                content: inactiveInfoWindow,
                disableAutoPan: false,
                map: map,
              });

              var infoTitle = document.querySelectorAll(".infowindow");
              infoTitle.forEach(function (e: any) {
                var w = e.offsetWidth + 10;
                e.parentElement.style.width = w;
                e.parentElement.style.position = "relative";
                e.parentElement.style.top = "3px";
                e.parentElement.previousSibling.className = "black";
                e.parentElement.parentElement.style.display = "flex";
                e.parentElement.parentElement.style.background = "none";
                e.parentElement.parentElement.style.border = "none";
                e.parentElement.parentElement.style.justifyContent = "center";

                e.onclick = handleIwClick; //인포윈도우 클릭이벤트
                e.parentElement.parentElement.style.cursor = "pointer";
              });
            } else {
              console.log("주소 잘못됨: ", storeInfo[i].name);
            }
          }
        );
      }
    } else if (done === true && storeInfo.length === 0) {
      console.log("해당 가게 없음");
      let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      let options = {
        center: new window.kakao.maps.LatLng(37.603209077, 126.433067), ////////////////////////////
        level: 5, //지도의 레벨(확대, 축소 정도)
      };
      let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      // 현위치로 재설정
      let lat, lng;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            lat = position.coords.latitude; // 위도
            lng = position.coords.longitude; // 경도
            console.log(lat, lng);
            var coords = new window.kakao.maps.LatLng(lat, lng);
            map.setCenter(coords); //중심좌표 재설정
          },
          () => console.log("err")
        );
      } else {
        console.log("현위치 에러");
      }
    }
  }, [done]);

  return <div id="map" style={{ width: "100vw", height: "100vh" }} />;
};

export default MapSearch;
