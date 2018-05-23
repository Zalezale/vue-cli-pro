
var PENDING = 1,
    FULFILLED = 2,
    REJECJT = 3,
    BREACK = 4;

function MyPromise(fn) {
    if (typeof fn !== 'function') throw new TypeError("传入参数非函数")
    var mypromise = this;
    mypromise.value = null, mypromise.status = PENDING, mypromise.resolve = null, mypromise.reject = null;
    //想象成ajax中的sucess方法
    function resolve(data) {
        mypromise.over(FULFILLED, data);
    }
    //想象成ajax中的err方法
    function reject(err) {
        mypromise.over(REJECJT, err);
    }
    //把回掉注册到ajax中的suc与err之中
    fn(resolve, reject)
}

MyPromise.prototype.over = function (status, value) {
    var mypromise = this,
        callback = null;
    if (mypromise.status === BREACK) return;
    mypromise.status = status, mypromise.value = value;
    setTimeout(function () {
        callback = (status === FULFILLED ? mypromise.resolve : mypromise.reject);
        callback && callback(value)
    })
}
MyPromise.prototype.then = function (resolve, reject) {
    var mypromise = this;
    return new MyPromise(function (onResolv, onReject) {
        function trigerResolv(value) {
            var nextPromise = typeof resolve === 'function' && resolve(value) || value
            if (nextPromise instanceof MyPromise) {
                nextPromise.then(function (value) {
                    onResolv(value);
                }, function (value) {
                    onReject(value);
                })
            } else {
                //判断在成功之后是否需要终止回掉
                if (nextPromise === BREACK) {
                    mypromise.status = BREACK;
                    return;
                }
                onResolv(nextPromise);
            }
        }

        function trigerReject(value) {
            var nextPromise = typeof reject === 'function' && reject(value) || value
            onReject(nextPromise)
        }
        if (mypromise.status === PENDING) {
            mypromise.resolve = trigerResolv;
            mypromise.reject = trigerReject;
        }
        if (mypromise.status === FULFILLED) {
            trigerResolv(mypromise.value)
        }
        if (mypromise.status === REJECJT) {
            trigerReject(mypromise.value)
        }
    })
}

export default MyPromise ;