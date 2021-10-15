const rewire = require("rewire")
const UserCollection = rewire("./UserCollection")
const mapStateToProps = UserCollection.__get__("mapStateToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let param2 = [[false, false, false], [true, false, false], [true, false, false]]
        let callFunction = () => {
            mapStateToProps({ user: { exerciseCollection: false, exerciseCollectionLoaded: false, editorSession: { loaded: true } } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param2 = [[false, false, false], [false, false, true], [true, true, false]]
        let callFunction = () => {
            mapStateToProps({ user: { exerciseCollection: false, exerciseCollectionLoaded: false, editorSession: { loaded: false } } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param2 = [[true, false, true], [true, true, false], [false, true, true]]
        let callFunction = () => {
            mapStateToProps({ user: { exerciseCollection: true, exerciseCollectionLoaded: false, editorSession: { loaded: true } } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param2 = [[true, false, true], [false, true, true], [false, false, true]]
        let callFunction = () => {
            mapStateToProps({ user: { exerciseCollection: false, exerciseCollectionLoaded: false, editorSession: { loaded: false } } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param2 = [[false, true, true], [true, false, false], [false, true, false]]
        let callFunction = () => {
            mapStateToProps({ user: { exerciseCollection: false, exerciseCollectionLoaded: true, editorSession: { loaded: false } } }, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
