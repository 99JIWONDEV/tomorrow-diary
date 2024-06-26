import React, { useState } from "react";
import "./Login.css";
import BackHeader from "../components/BackHeader";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/apiClient";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 체크
  const navigate = useNavigate();
  const today = new Date();
  const date = new Date(today.setDate(today.getDate() + 1));
  const year = date.getFullYear();
  sessionStorage.setItem("year", year);
  if (date.getMonth() + 1 < 10) {
    const month = `0${date.getMonth() + 1}`;
    sessionStorage.setItem("month", month);
  } else {
    const month = date.getMonth() + 1;
    sessionStorage.setItem("month", month);
  }
  if (date.getDate() < 10) {
    const day = `0${date.getDate()}`;
    sessionStorage.setItem("day", day);
  } else {
    const day = date.getDate();
    sessionStorage.setItem("day", day);
  }

  const gotoRegister = () => {
    navigate("/register");
  };

  const handleLogin = async (event) => {
    // 로그인 처리 로직을 구현합니다.
    event.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        id: id,
        password: password,
      }),
    });
    const result = await response.json();

    if (response.status === 200) {
      setLoginCheck(false);

      // Store token in local storage
      sessionStorage.setItem("userId", result.response.body.userId);
      sessionStorage.setItem("nickname", result.response.body.nickname);
      sessionStorage.setItem("emotion", "0");
      navigate("/home");
    } else {
      setLoginCheck(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <BackHeader />
      <div className="LoginTitle">LOGIN</div>
      <form className="LoginForm" onSubmit={handleLogin}>
        <input type="text" id="username" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="password" id="password" placeholder="PW" value={password} onChange={(e) => setPassword(e.target.value)} />
        {loginCheck && <label style={{ color: "red", marginTop: "-10px", marginLeft: "5px", fontSize: "12px" }}>ID 혹은 비밀번호가 틀렸습니다.</label>}
      </form>
      <button className="LoginButton" onClick={handleLogin}>
        {isLoading ? <div>Loading...</div> : <div>Login</div>}
      </button>
      <div className="LoginRegister" onClick={gotoRegister}>
        회원가입
      </div>
    </div>
  );
};

export default Login;