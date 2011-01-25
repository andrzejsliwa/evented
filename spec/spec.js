(function() {
  beforeEach(function() {
    return this.addMatchers({
      toBeFunction: function() {
        return typeof this.actual === 'function';
      }
    });
  });
  describe("true", function() {
    return it("should be true", function() {
      return expect(true).toEqual(true);
    });
  });
}).call(this);
