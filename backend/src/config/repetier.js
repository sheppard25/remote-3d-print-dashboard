const axios = require('axios');

class RepetierClient {
  constructor() {
    this.host = process.env.REPETIER_HOST || '192.168.1.100';
    this.port = process.env.REPETIER_PORT || '3344';
    this.apiKey = process.env.REPETIER_API_KEY;
    this.baseUrl = `http://${this.host}:${this.port}/printer/api/`;
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

      if (command) {
        payload.data.command = command;
      }

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      console.error(`Erreur API Repetier (${command}):`, error.message);
      throw new Error(`Erreur de communication avec Repetier Server: ${error.message}`);
    }
  }

  /**
   * Récupère l'état de l'imprimante
   */
  async getPrinterState() {
    return await this.request('stateList');
  }

  /**
   * Liste toutes les imprimantes disponibles
   */
  async listPrinters() {
    return await this.request('listPrinter');
  }

  /**
   * Récupère les informations d'un modèle
   */
  async getModelInfo(modelId) {
    return await this.request('getModelInfo', { id: modelId });
  }

  /**
   * Liste les fichiers G-code disponibles
   */
  async listModels() {
    return await this.request('listModels');
  }

  /**
   * Lance une impression
   */
  async startPrint(filename, printerId = 0) {
    return await this.request('copyModel', {
      id: printerId,
      filename: filename,
      autostart: 1
    });
  }

  /**
   * Arrête l'impression en cours
   */
  async stopPrint(printerId = 0) {
    return await this.request('send', {
      printer: printerId,
      cmd: 'M112' // Emergency stop
    });
  }

  /**
   * Met en pause l'impression
   */
  async pausePrint(printerId = 0) {
    return await this.request('send', {
      printer: printerId,
      cmd: 'M25' // Pause SD print
    });
  }

  /**
   * Reprend l'impression
   */
  async resumePrint(printerId = 0) {
    return await this.request('send', {
      printer: printerId,
      cmd: 'M24' // Resume SD print
    });
  }

  /**
   * Définit la température de l'extrudeur
   */
  async setExtruderTemp(temp, printerId = 0) {
    return await this.request('send', {
      printer: printerId,
      cmd: `M104 S${temp}`
    });
  }

  /**
   * Définit la température du lit chauffant
   */
  async setBedTemp(temp, printerId = 0) {
    return await this.request('send', {
      printer: printerId,
      cmd: `M140 S${temp}`
    });
  }

  /**
   * Envoie une commande G-code personnalisée
   */
  async sendGCode(gcode, printerId = 0) {
    return await this.request('send', {
      printer: printerId,
      cmd: gcode
    });
  }

  /**
   * Récupère les logs de l'imprimante
   */
  async getLogs(printerId = 0) {
    return await this.request('messages', {
      id: printerId
    });
  }

  /**
   * Home tous les axes
   */
  async homeAll(printerId = 0) {
    return await this.request('send', {
      printer: printerId,
      cmd: 'G28' // Home all axes
    });
  }
}

module.exports = new RepetierClient();
