// src/setupTests.js
import "@testing-library/jest-dom";

// Mocking ResizeObserver
class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
