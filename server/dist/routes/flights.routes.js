"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flights_controller_1 = __importDefault(require("../controllers/flights.controller"));
const router = (0, express_1.Router)();
// POST /api/flights/search
router.post('/search', flights_controller_1.default.searchFlights);
exports.default = router;
