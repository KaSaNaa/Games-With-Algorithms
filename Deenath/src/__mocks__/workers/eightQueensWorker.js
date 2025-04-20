export default class Worker {
  constructor() {
    this.onmessage = null;
  }

  postMessage(message) {
    if (this.onmessage) {
      this.onmessage({ data: 92 }); // Mock the total solutions as 92
    }
  }

  terminate() {
    // Mock terminate method
  }
}