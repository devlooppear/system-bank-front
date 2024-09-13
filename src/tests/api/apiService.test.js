import apiService from "../../api/apiService";
import { describe, it, expect, beforeEach } from "vitest";

const applyRequestInterceptor = (config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

describe("apiService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should have the correct base URL and headers", () => {
    expect(apiService.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
    expect(apiService.defaults.headers["Content-Type"]).toBe("application/json");
    expect(apiService.defaults.headers["Accept"]).toBe("application/json");
  });

  it("should attach the Authorization header if the token is present", async () => {
    const mockToken = "mockToken123";
    localStorage.setItem("authToken", mockToken);

    const requestConfig = {
      headers: {},
    };

    const configWithToken = applyRequestInterceptor(requestConfig);

    expect(configWithToken.headers?.Authorization).toBe(`Bearer ${mockToken}`);
  });

  it("should reject the request if there is an error", async () => {
    const error = new Error("Request failed");

    apiService.get = async () => {
      throw error;
    };

    await expect(apiService.get("/some-endpoint")).rejects.toThrow("Request failed");
  });
});
