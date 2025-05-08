export class Timer {
  private startTime = 0;
  private endTime = 0;

  start() {
    this.startTime = performance.now();
  }

  stop() {
    this.endTime = performance.now();
    return this.getElapsed();
  }

  getElapsed() {
    return (this.endTime - this.startTime) / 1000;
  }
}
