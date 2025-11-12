import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [printerStatus, setPrinterStatus] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connexion Socket.IO pour les updates en temps réel
    const socket = io(API_URL);

    socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
      setConnected(true);
    });

    socket.on('printerStatus', (status) => {
      setPrinterStatus(status);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    // Récupérer le statut initial
    axios.get(`${API_URL}/api/status`)
      .then(response => {
        if (response.data.success) {
          setPrinterStatus(response.data.data);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du statut:', error);
      });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🖨️ Remote 3D Print Dashboard</h1>
        <div className="status-indicator">
          <span className={`dot ${connected ? 'connected' : 'disconnected'}`}></span>
          {connected ? 'Connecté' : 'Déconnecté'}
        </div>
      </header>

      <main className="container">
        {printerStatus ? (
          <div className="printer-info">
            <h2>État de l'imprimante</h2>
            <pre>{JSON.stringify(printerStatus, null, 2)}</pre>
          </div>
        ) : (
          <p>Chargement du statut de l'imprimante...</p>
        )}
      </main>
    </div>
  );
}

export default App;
