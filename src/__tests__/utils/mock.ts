import { Request, Response } from "express-serve-static-core";


const mockRequest = {
    params: { id: "1" },
} as unknown as Request;

const mockResponse = {
    send: jest.fn(),
    json: jest.fn(),
    status: jest.fn(() => mockResponse)
} as unknown as Response;



export { mockRequest, mockResponse };