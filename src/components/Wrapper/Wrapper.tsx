import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import generate from "./../../../public/images/generate.svg";
import history from "./../../../public/images/history.svg";
import SS from "./../../../public/images/SS.png";
import upload from "./../../../public/images/upload.svg";
import style from "./style.module.css";


export default function Wrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const [direction, setDirection] = useState<string>("");

  useEffect(() => {
    setDirection(location.pathname.slice(1));
  }, [location.pathname]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.header__logo}>
          <img src={SS} alt="Летняя школа" />
          <span>Межгалактическая аналитика</span>
        </div>
        <div className={style.header__menu}>
          <div
            className={style.header__menu__item}
            onClick={() => {
              navigate("/analytics");
              setDirection("analytics");
            }}
          >
            <img src={upload} alt="Аналитик" />
            <span>CSV Аналитик</span>
            {direction == "analytics" ? (
              <div data-testid="line-analytic" className={style.underlined} />
            ) : null}
          </div>
          <div
            className={style.header__menu__item}
            onClick={() => {
              navigate("/generate");
              setDirection("generate");
            }}
          >
            <img src={generate} alt="Генератор CSV" />
            <span>CSV Генератор</span>
            {direction == "generate" ? (
              <div data-testid="line-generating" className={style.underlined} />
            ) : null}
          </div>
          <div
            onClick={() => {
              navigate("/history");
              setDirection("history");
            }}
            className={style.header__menu__item}
          >
            <img src={history} alt="История" />
            <span>История</span>
            {direction == "history" ? (
              <div data-testid="line-history" className={style.underlined} />
            ) : null}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
