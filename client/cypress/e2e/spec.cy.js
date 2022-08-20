describe("HomePage", () => {
  it("Renders correctly", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Renders correctly", () => {
    cy.visit("http://localhost:3000/");
  });
});

describe("Hotels Page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/hotels");
  });
});

describe("Log in page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/login");
  });
});

describe("Forgot-password page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/forgot-password");
  });
});

describe("profile page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/profile");
  });
});

describe("Edit profile page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/profile/edit");
  });
});

describe(" Profile Change Password page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/profile/change-password");
  });
});

describe("Timeline page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/profile/timeline");
  });
});

describe("Profile Deactivate page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/profile/deactivate");
  });
});

describe("Admin page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/admin");
  });
});

describe("Admin Booking page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/admin/booking");
  });
});

describe("Admin Hotels page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/admin/hotels");
  });
});

describe("Admin Customers page", () => {
  it("renders correctly", () => {
    cy.visit("http://localhost:3000/admin/hotels");
  });
});
