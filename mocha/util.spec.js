const assert = require("assert");
const should = require("should");
const { resultDim } = require("./util");
const res = {
  id: 1,
};

//1.describe는 테스트할 코드의 기능 설명
describe("util.js의 모듈은", () => {
  it("문자열  문자열 대문자로 반환"),
    () => {
      const result = resultDim("HELLO");
      console.log(result);
      result.should.be.equal("HELLO");
      // assert.strictEqual(result, "Hello"); //assert함수로 맞는지 확인
    };
});
