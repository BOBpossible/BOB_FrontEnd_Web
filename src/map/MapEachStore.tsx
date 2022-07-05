import React, {useState, useEffect } from "react";
import dummy from "./dummydataforMap.json";
import {useParams} from "react-router-dom";
import axios from 'axios';

// import "./MapEachStore.css";
declare global {
  interface Window {
    kakao: any;
  }
}
const MapEachStore = () => {
  const params = useParams();
  console.log(params.storeId);
  
  const [storeXY, setStoreXY] = useState([127.029005,37.586272]);

  useEffect(() => {
    // getXY(Number(params.storeId));
  }, [params.storeId]);


  //서버연결참고
//   const postReviewContent = async () => {
//     const data = {storeId: storeId, rate: rating, content: reviewContent};
//     try {
//       const response = await axios.post('https://bobpossible.shop/api/v1/reviews/me', data, {
//         headers: headers,
//       });
//       console.log('review register:', response.data);
//       return response.data.result;
//     } catch (error) {
//       console.log('review register:', error);
//     }
//   };

    //서버연결 확인
//   async function getXY(storeId: number) {
//   await axios.get(`/api/v1/stores/${params.storeId}`).then(
//     (res) => {
//         setStoreXY((storeXY) => []);
//         console.log(res);
//         res.data.result.result((e: any) =>{
//         setStoreLatLng((prev)=>[...prev,{
//             x: e.address.x,
//             y: e.address.y,
//         }]);
//         });
//         setDone(true);
//     }
//     )
//     .catch((err)=>{
//     console.log(err);
//     })
//   }

  useEffect(() => {
    function handleIwClick(e: any) {
        window.ReactNativeWebView.postMessage(e.target.id);
        // console.log(e.target.id);
      }
      
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(37.586272, 127.029005), //지도의 중심좌표. ((안암역))
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    let map = new window.kakao.maps.Map(container, options);
    let storeMarkerPosition = new window.kakao.maps.LatLng(37.586272, 127.029005); //서버로부터 받는 storeXY로 수정할것
    let storeMarker = new window.kakao.maps.InfoWindow({
        position: storeMarkerPosition,
        content: `<div class="inactive infowindow" id=${params.storeId}><span id=${params.storeId}>여기뿅</span></div>`,
        map: map,
    })
    var position = new window.kakao.maps.LatLng(37.586272, 127.029005);
    map.setCenter(position); //중심좌표 재설정

    var infoTitle = document.querySelectorAll(".infowindow");
    infoTitle.forEach(function (e: any) {
      var w = e.offsetWidth + 10;
      e.parentElement.style.width = w;
      e.parentElement.style.position = "relative";
      e.parentElement.style.top = "3px";
    //   e.parentElement.previousSibling.style.background ="url('https://user-images.githubusercontent.com/81412212/174342201-0ec0c927-97f1-49dd-8c23-d6a872d9dfad.png') no-repeat"; //꼭지
      e.parentElement.previousSibling.className = 'hi';
      e.parentElement.parentElement.style.display = "flex";
      e.parentElement.parentElement.style.background = "none";
      e.parentElement.parentElement.style.border = "none";
      e.parentElement.parentElement.style.justifyContent = "center";

      e.onclick = handleIwClick; //인포윈도우 클릭이벤트
      e.parentElement.parentElement.style.cursor = "pointer";
    });
  }, []);

  return (
    <div id="map" style={{ width: "100vw", height: "100vh" }} /> //너비,높이 모두 상대크기(%)로 꼭 지정해두어야 한다.
  );
};

export default MapEachStore;
