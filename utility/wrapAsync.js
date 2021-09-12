module.exports = (fn) => {
    return function (req, res, next) {
        // console.log(err)
        fn(req, res, next).catch(err => next(err))
    }
}