import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  await prisma.user.createMany({
    data: [
      { email: "user1@example.com", password: "password123", name: "John Doe" },
      { email: "user2@example.com", password: "password456", name: "Jane Smith" },
    ],
  });

  // Seed Residents
  await prisma.residents.createMany({
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
  });

  // Seed Households
  await prisma.houseHold.createMany({
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
  });

  // Seed Certificates
  await prisma.cerificates.createMany({
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
  });

  // Seed Blotters
  await prisma.blotter.createMany({
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
  });

  // Seed Barangay Officials
  await prisma.barangayOfficials.createMany({
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
  });

  // Seed Projects
  await prisma.projects.createMany({
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
  });

  // Seed Announcements
  await prisma.announcement.createMany({
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
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
