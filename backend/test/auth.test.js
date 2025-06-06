import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import server from "../server";

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

describe("To Test auth endpoints", () => {
  it("should register a user", async () => {
    const endpoint = "/api/register";

    const userPayload = {
      username: "Jirin",
      name: "john",
      email: "jirin@universe9.com",
      password: "Password123$$",
      dob: "1199-04-22",
      phone: "0987654321",
      surname: "Doe",
    };

    const response = await request(server).post(endpoint).send(userPayload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      status: "success",
      message: "User created successfully",
    });
  });

  it("should login a user", async () => {
    const endpoint = "/api/login";

    const userPayload = {
      email: "jirin@universe9.com",
      password: "Password123$$",
    };

    const response = await request(server).post(endpoint).send(userPayload);

    // expect(response.body).toBeDefined({ data });
    // console.log(response.body);

    expect(response.body).toHaveProperty("status", "success");
    expect(response.body).toHaveProperty("data.token");
    expect(typeof response.body.data.token).toBe("string");
    expect(response.body.data.token.length).toBeGreaterThan(0);
  });
});
