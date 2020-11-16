import {
    returnsOne,
    returnsFirstParameter,
    invokesCallbackFunctionOnce,
    returnsSameAsCallback,
    invokesEachFunctionPassed,
    invokesCallbackFunctionPassedWith100AsParameterOne,
    invokeFunctionForEachItemInArray
} from './callbacks'

test('Create a function that returns 1', () => {
    const actualReturnValue = returnsOne()
    expect(actualReturnValue).toEqual(1)
})

test('Create a function that returns its first parameter', () => {
    // Arrange
    const firstParameter = "some parameter"

    // Act
    const receivedValue = returnsFirstParameter(firstParameter)

    // Assert
    expect(receivedValue).toEqual(firstParameter)
})

test('Create a function that takes a callback function as a parameter then invokes it', () => {
    // Arrange
    function callbackFunction() {
        callbackFunction.timesCalled++
    }
    callbackFunction.timesCalled = 0;

    // Act
    invokesCallbackFunctionOnce(callbackFunction)

    // Assert
    expect(callbackFunction.timesCalled).toEqual(1)
})

test(`Create a function that takes a callback function as a parameter,
 and returns whatever the callback function returns.`, () => {
    // Arrange
    function callbackFunction() {
        return "some return value"
    }

    // Act
    const returnedValue = returnsSameAsCallback(callbackFunction)

    // Assert
    expect(returnedValue).toEqual("some return value")
 })

 test('Create a function that takes a list of callback functions and invokes each of them', () => {
    // Arrange
    let invokedFunctions = []

    const functions = [
        () => { invokedFunctions.push(functions[0]) },
        () => { invokedFunctions.push(functions[1]) },
        () => { invokedFunctions.push(functions[2]) }
    ]

    // Act
    invokesEachFunctionPassed(functions)

    // Assert
    expect(invokedFunctions).toEqual(functions)
 })

 test(`Create a function that accepts a callback function and invokes that function with 100 as its first parameter`, () => {
    // Arrange
    const callbackFunction  = function(parameterOne) {
        // should be 100!
         callbackFunction.wasCalledWith = parameterOne
     }

     // Act
     invokesCallbackFunctionPassedWith100AsParameterOne(callbackFunction)

     // Assert
     expect(callbackFunction.wasCalledWith).toEqual(100)
})

test(`Create a function that accepts a list and a callback function, 
then invokes the function for each item in the list, 
passing the list item as the first parameter (NO Array.forEach allowed!)`, () => {
    // Arrange
    const someList = [1, 2, 3]

    const numbersFunctionWasInvokedWith = []

    const callbackFunction = function(number) {
        numbersFunctionWasInvokedWith.push(number)
    }

    // Act
    invokeFunctionForEachItemInArray(someList, callbackFunction)

    // Assert
    expect(numbersFunctionWasInvokedWith).toEqual(someList)

})