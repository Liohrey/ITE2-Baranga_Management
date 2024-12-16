"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Seed Users
                return [4 /*yield*/, prisma.user.createMany({
                        data: [
                            { email: "user1@example.com", password: "password123", name: "John Doe" },
                            { email: "user2@example.com", password: "password456", name: "Jane Smith" },
                        ],
                    })];
                case 1:
                    // Seed Users
                    _a.sent();
                    // Seed Residents
                    return [4 /*yield*/, prisma.residents.createMany({
                            data: [
                                {
                                    firstName: "John",
                                    middleName: "A",
                                    lastName: "Doe",
                                    age: 35,
                                    address: "123 Main St",
                                    contactNumber: "1234567890",
                                },
                                {
                                    firstName: "Jane",
                                    middleName: "B",
                                    lastName: "Smith",
                                    age: 28,
                                    address: "456 Elm St",
                                    contactNumber: "0987654321",
                                },
                            ],
                        })];
                case 2:
                    // Seed Residents
                    _a.sent();
                    // Seed Households
                    return [4 /*yield*/, prisma.houseHold.createMany({
                            data: [
                                {
                                    houseHoldHead: "John Doe",
                                    address: "123 Main St",
                                    memberCount: 3,
                                    type: "Family",
                                },
                                {
                                    houseHoldHead: "Jane Smith",
                                    address: "456 Elm St",
                                    memberCount: 2,
                                    type: "Couple",
                                },
                            ],
                        })];
                case 3:
                    // Seed Households
                    _a.sent();
                    // Seed Certificates
                    return [4 /*yield*/, prisma.cerificates.createMany({
                            data: [
                                {
                                    certificateType: "Birth Certificate",
                                    requestedBy: "John Doe",
                                    purpose: "Job Application",
                                },
                                {
                                    certificateType: "Barangay Clearance",
                                    requestedBy: "Jane Smith",
                                    purpose: "Loan Application",
                                },
                            ],
                        })];
                case 4:
                    // Seed Certificates
                    _a.sent();
                    // Seed Blotters
                    return [4 /*yield*/, prisma.blotter.createMany({
                            data: [
                                {
                                    complaintant: "John Doe",
                                    repondent: "Jane Smith",
                                    natureOfCase: "Noise Complaint",
                                },
                                {
                                    complaintant: "Jane Smith",
                                    repondent: "John Doe",
                                    natureOfCase: "Property Dispute",
                                },
                            ],
                        })];
                case 5:
                    // Seed Blotters
                    _a.sent();
                    // Seed Barangay Officials
                    return [4 /*yield*/, prisma.barangayOfficials.createMany({
                            data: [
                                {
                                    position: "Captain",
                                    name: "Captain John",
                                    contactNumber: "1231231234",
                                    email: "captainjohn@example.com",
                                    termStartToEnd: "2023-2025",
                                },
                                {
                                    position: "Secretary",
                                    name: "Secretary Jane",
                                    contactNumber: "5675675678",
                                    email: "secretaryjane@example.com",
                                    termStartToEnd: "2023-2025",
                                },
                            ],
                        })];
                case 6:
                    // Seed Barangay Officials
                    _a.sent();
                    // Seed Projects
                    return [4 /*yield*/, prisma.projects.createMany({
                            data: [
                                {
                                    projectName: "Road Repair",
                                    projectDescription: "Fixing potholes on Main St.",
                                    projectBudget: 10000.0,
                                    projectStartDate: new Date("2024-01-01"),
                                    projectEndDate: new Date("2024-06-01"),
                                    address: "Main St",
                                },
                                {
                                    projectName: "Park Renovation",
                                    projectDescription: "Upgrading facilities in Central Park.",
                                    projectBudget: 20000.0,
                                    projectStartDate: new Date("2024-03-01"),
                                    projectEndDate: new Date("2024-09-01"),
                                    address: "Central Park",
                                },
                            ],
                        })];
                case 7:
                    // Seed Projects
                    _a.sent();
                    // Seed Announcements
                    return [4 /*yield*/, prisma.announcement.createMany({
                            data: [
                                {
                                    title: "Community Meeting",
                                    content: "A meeting will be held at the Barangay Hall.",
                                    category: "Public Service",
                                    priority: true,
                                    validUntil: new Date("2024-12-31"),
                                    targetAudience: "All Residents",
                                    status: "Published",
                                },
                                {
                                    title: "Garbage Collection Schedule",
                                    content: "New schedule for garbage collection.",
                                    category: "Public Service",
                                    priority: false,
                                    validUntil: new Date("2024-12-31"),
                                    targetAudience: "All Residents",
                                    status: "Published",
                                },
                            ],
                        })];
                case 8:
                    // Seed Announcements
                    _a.sent();
                    console.log("Seeding completed!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
