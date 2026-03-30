"use client";
import { useState } from "react";
import { apiClient } from "../api/client";
import { apiResponse } from "@/src/api/types/api.types";


export default function Home() {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{
    code: string;
    isError: boolean;
  } | null>(null);

  const login = async (): Promise<apiResponse> => {
    try {
      const { data } = await apiClient.post<apiResponse>("/auth/login", {
        document: Number(document),
        password,
      });
      return data;
    } catch (error: any) {
      // Axios pone el cuerpo del error en error.response.data
      if (error.response?.data) {
        return error.response.data as apiResponse;
      }
      return {
        success: false,
        result: {},
        message: "ERROR.SERVER.CONNECTION",
      };
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const apiData = await login();

    if (apiData.message == null || apiData.message === "") {
      apiData.message = `success ${JSON.stringify(apiData.result)}`;
    }

    setStatus({
      code: apiData.message,
      isError: !apiData.success,
    });

    if (apiData.success) {
      console.log("Login exitoso:", apiData.result);
      // Aquí podrías guardar el token: localStorage.setItem('token', apiData.result.token);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>SmartQR-Tool</h1>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input
          type="number"
          placeholder="Documento"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ cursor: 'pointer', padding: '8px' }}>
          Iniciar Sesión
        </button>
      </form>

      {status && (
        <div style={{
            marginTop: "20px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: status.isError ? "#fee2e2" : "#dcfce7",
            color: status.isError ? "#991b1b" : "#166534",
            fontWeight: "bold",
            fontSize: "0.9rem"
          }}>
          {status.code}
        </div>
      )}
    </main>
  );
}
