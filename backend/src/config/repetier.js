const axios = require('axios');

class RepetierClient {
  constructor() {
    this.host = process.env.REPETIER_HOST || '192.168.1.100';
    this.port = process.env.REPETIER_PORT || '3344';
    this.apiKey = process.env.REPETIER_API_KEY;
    this.login = process.env.REPETIER_LOGIN;
    this.password = process.env.REPETIER_PASSWORD;
    this.baseUrl = `http://${this.host}:${this.port}/printer/api/`;
    this.sessionId = null;
  }

  /**
   * Authentification auprès de Repetier Server
   * Nécessaire pour accéder aux endpoints protégés
   */
  async authenticate() {
    try {
      if (!this.login || !this.password) {
        console.warn('⚠️  Aucun login/password configuré, tentative avec API key uniquement');
        return false;
      }

      const response = await axios.post(this.baseUrl, {
        apikey: this.apiKey,
        data: {
          login: this.login,
          password: this.password,
          rememberMe: false
        },
        command: 'login'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data && response.data.sessionId) {
        this.sessionId = response.data.sessionId;
        console.log('✅ Authentification réussie, sessionId obtenu');
        return true;
      } else if (response.data && response.data.error) {
        console.error('❌ Erreur d\'authentification:', response.data.error);
        return false;
      }

      return false;
    } catch (error) {
      console.error('❌ Erreur lors de l\'authentification:', error.message);
      return false;
    }
  }

  /**
   * Effectue une requête à l'API Repetier Server
   */
  async request(command, data = {}) {
    try {
      const payload = {
        apikey: this.apiKey,
        data: {
          ...data
        }
      };

      // Ajouter le sessionId si disponible
      if (this.sessionId) {
        payload.sessionId = this.sessionId;
      }

      if (command) {
        payload.data.command = command;
      }

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000
      });

      return response.data;
    } catch (error) {
      console.error('Erreur requête Repetier:', error.message);
      
      // Si erreur de permission, tenter de se ré-authentifier
      if (error.response && error.response.data && 
          error.response.data.error && 
          error.response.data.error.includes('permission')) {
        console.log('🔄 Tentative de ré-authentification...');
        const authSuccess = await this.authenticate();
        if (authSuccess) {
          // Réessayer la requête avec le nouveau sessionId
          return this.request(command, data);
        }
      }
      
      throw error;
    }
  }

  /**
   * Récupère l'état de toutes les imprimantes
   */
  async getState() {
    return this.request('stateList');
  }

  /**
   * Récupère les jobs de la file d'attente
   */
  async getJobs() {
    return this.request('listJobs');
  }

  /**
   * Upload un fichier G-code
   */
  async uploadFile(filename, gcode) {
    try {
      const formData = new FormData();
      formData.append('apikey', this.apiKey);
      if (this.sessionId) {
        formData.append('sessionId', this.sessionId);
      }
      formData.append('name', filename);
      formData.append('a', 'upload');
      formData.append('file', gcode, filename);

      const response = await axios.post(
        `http://${this.host}:${this.port}/printer/model/`,
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 30000
        }
      );

      return response.data;
    } catch (error) {
      console.error('Erreur upload fichier:', error.message);
      throw error;
    }
  }

  /**
   * Démarre une impression
   */
  async startPrint(jobId) {
    return this.request('startJob', { id: jobId });
  }

  /**
   * Met en pause une impression
   */
  async pausePrint() {
    return this.request('pause');
  }

  /**
   * Arrête une impression
   */
  async stopPrint() {
    return this.request('stop');
  }
}

module.exports = new RepetierClient();
