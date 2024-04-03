import { Book } from "./book.entity";

describe("BookEntity", () => {
  it("should be defined", () => {
    expect(new Book()).toBeDefined();
  });
});
