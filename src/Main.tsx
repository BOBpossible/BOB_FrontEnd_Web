import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import apple from "./assets/main/apple.png";
import googleplay from "./assets/main/googleplay.png";
import bobplace from "./assets/main/bobplace.png";
import bobtext from "./assets/main/bobtext.png";
import bobpool from "./assets/main/bobpool.png";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      {isMobile ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "#6C69FF",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              paddingTop: "15vh",
            }}
          >
            <img
              style={{ width: "310px", display: "block" }}
              src={bobplace}
              alt="bobplace"
            />
            <img
              style={{ width: "313px", paddingTop: "1vh" }}
              src={bobtext}
              alt="bobtext"
            />
          </div>
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a href="https://apps.apple.com/kr/app/%EB%B0%A5%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4/id1634665858">
              <img
                style={{ width: "200px", height: "60px", marginBottom: 8 }}
                src={apple}
                alt="AppStore"
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.bob_frontend">
              <img
                style={{ width: "200px", height: "60px" }}
                src={googleplay}
                alt="GooglePlay"
              />
            </a>
          </div>
          <div
            style={{
              margin: "0 auto",
              top: 5,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              style={{ width: "100%", objectFit: "contain" }}
              src={bobpool}
              alt="bobpool"
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "#6C69FF",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ margin: "0 auto", paddingTop: "15vh" }}>
            <img
              style={{ width: "402px", display: "block" }}
              src={bobplace}
              alt="bobplace"
            />
            <img
              style={{ width: "402px", paddingTop: "1vh" }}
              src={bobtext}
              alt="bobtext"
            />
          </div>
          <div style={{ margin: "0 auto" }}>
            <a href="https://apps.apple.com/kr/app/%EB%B0%A5%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4/id1634665858">
              <img
                style={{ width: "200px", height: "60px", marginRight: 14 }}
                src={apple}
                alt="AppStore"
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.bob_frontend">
              <img
                style={{ width: "200px", height: "60px" }}
                src={googleplay}
                alt="GooglePlay"
              />
            </a>
          </div>
          <div
            style={{
              margin: "0 auto",
              top: 5,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img style={{ width: "75vw" }} src={bobpool} alt="bobpool" />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
