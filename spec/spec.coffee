beforeEach ->
  @addMatchers
    toBeFunction: -> typeof @actual == 'function'

describe "true", ->
  it "should be true", ->
    expect(true).toEqual(true)

