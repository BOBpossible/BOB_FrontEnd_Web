import React, {useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';

// import "./MapEachStore.css";
declare global {
  interface Window {
    kakao: any;
  }
}
export type StoreType = {
  addressDetail: string,
  addressStreet: string,
  category: string,
  distance: number,
  mission: boolean,
  name: string,
  point: number,
  storeId: number,
  userX: number,
  userY: number,
}

const MapEachStore = () => {
  const params = useParams();
  console.log(params.missionId, '번 미션');
  const [storeInfo, setStoreInfo] = useState<StoreType>();
  const [done, setDone] = useState(false);

  async function getData() {
    await axios.get(`https://bobpossible.shop/api/v1/map/mission/${params.missionId}`).then(
      (res) => {
        console.log(res.data.result);
        setStoreInfo({
          addressDetail: res.data.result.addressDetail,
          addressStreet: res.data.result.addressStreet,
          category: res.data.result.category,
          distance: res.data.result.distance,
          mission: res.data.result.mission,
          name: res.data.result.name,
          point: res.data.result.point,
          storeId: res.data.result.storeId,
          userX: res.data.result.userX,
          userY: res.data.result.userY,
        });
        setDone(true);
      }
    ) 
    .catch((err) => {
      console.log("ERR", err);
    });
  }
  useEffect(() => {
    getData();
  },[])
  function handleIwClick(e: any) {
    window.ReactNativeWebView.postMessage(e.target.id);
  }
  useEffect(() => {
    if (storeInfo !== undefined) {
      console.log(storeInfo);
      let container = document.getElementById("map");
      let options = {
        center: new window.kakao.maps.LatLng(37.586272, 127.029005), //지도의 중심좌표. ((안암역))
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      let map = new window.kakao.maps.Map(container, options);
      let geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        storeInfo.addressStreet,
        function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            let storeMarkerPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            let storeMarker = new window.kakao.maps.InfoWindow({
              position: storeMarkerPosition,
              content: `<div class="mission infowindow" id=${params.missionId}>
              <span class="pointText" id=${params.missionId}>${storeInfo.point}P</span>
              <span class="nameText" id=${params.missionId}>${storeInfo.name}</span>
              </div>`,
              map: map,
            })
            map.setCenter(storeMarkerPosition); //중심좌표
            var infoTitle = document.querySelectorAll(".infowindow");
            infoTitle.forEach(function (e: any) {
              var w = e.offsetWidth + 10;
              e.parentElement.style.width = w;
              e.parentElement.style.position = "relative";
              e.parentElement.style.top = "3px";
              e.childNodes[1].style.display = "block";
              e.childNodes[1].style.margin = "-8px";
              e.parentElement.style.top = "-9px";
              e.parentElement.previousSibling.className = 'black';
              e.parentElement.parentElement.style.display = "flex";
              e.parentElement.parentElement.style.background = "none";
              e.parentElement.parentElement.style.border = "none";
              e.parentElement.parentElement.style.justifyContent = "center";
      
              e.onclick = handleIwClick; //인포윈도우 클릭이벤트
              e.parentElement.parentElement.style.cursor = "pointer";
            });
          }
        }
      )

    }
  }, [storeInfo]);

  return (
    <div id="map" style={{ width: "100vw", height: "100vh" }} /> //너비,높이 모두 상대크기(%)로 꼭 지정해두어야 한다.
  );
};

export default MapEachStore;
