"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format_date = exports.parse_date = void 0;
const parse_date = (input) => {
    const [year, month, day] = input.split("-").map((num) => parseInt(num, 10));
    return new Date(year, month - 1, day);
};
exports.parse_date = parse_date;
const format_date = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
exports.format_date = format_date;
