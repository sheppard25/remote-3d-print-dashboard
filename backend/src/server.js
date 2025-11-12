require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const repetierClient = require('./config/repetier');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'Remote 3D Print Dashboard API' });
});

// Route de test de connexion Repetier
app.get('/api/status', async (req, res) => {
  try {
    const status = await repetierClient.getPrinterState();
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route pour obtenir la liste des imprimantes
app.get('/api/printers', async (req, res) => {
  try {
    const printers = await repetierClient.listPrinters();
    res.json({ success: true, data: printers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route pour uploader un fichier
app.post('/api/upload', async (req, res) => {
  try {
    // TODO: Implémenter l'upload de fichier G-code
    res.json({ success: true, message: 'Upload endpoint - À implémenter' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route pour lancer une impression
app.post('/api/print/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const result = await repetierClient.startPrint(filename);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route pour arrêter une impression
app.post('/api/stop', async (req, res) => {
  try {
    const result = await repetierClient.stopPrint();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Socket.IO pour les mises à jour en temps réel
io.on('connection', (socket) => {
  console.log('Client connecté:', socket.id);

  // Envoyer les mises à jour de statut toutes les 2 secondes
  const statusInterval = setInterval(async () => {
    try {
      const status = await repetierClient.getPrinterState();
      socket.emit('printerStatus', status);
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  }, 2000);

  socket.on('disconnect', () => {
    console.log('Client déconnecté:', socket.id);
    clearInterval(statusInterval);
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Erreur serveur interne' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    
  // Authentification auprès de Repetier Server au démarrage
  repetierClient.authenticate();
  console.log(`📡 WebSocket disponible sur ws://localhost:${PORT}`);
});

module.exports = { app, server, io };
