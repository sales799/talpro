import { describe, expect, it } from "vitest";
import {
  DatabaseUnavailableError,
  UnavailableStorage,
} from "../../server/storage";

describe("database-degraded storage", () => {
  it("fails database-backed work explicitly without crashing server startup", async () => {
    const storage = new UnavailableStorage();

    await expect(storage.getBlogPosts()).rejects.toMatchObject({
      name: "DatabaseUnavailableError",
      statusCode: 503,
    });
    await expect(storage.createContactInquiry({} as never)).rejects.toBeInstanceOf(
      DatabaseUnavailableError,
    );
  });
});
