"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockRequest = void 0;
const mockRequest = {
    params: { id: "1" },
};
exports.mockRequest = mockRequest;
const mockResponse = {
    send: jest.fn(),
    json: jest.fn(),
    status: jest.fn(() => mockResponse)
};
exports.mockResponse = mockResponse;
