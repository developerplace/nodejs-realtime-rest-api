class AwaitThenable { // extends Promise<T> {

  constructor(thenable) {
    // super((resolve, reject) => ten.then(resolve, reject));
    this.promise = new Promise((resolve, reject) => thenable.then(resolve, reject));
  }

  async await() {
    return this.promise;
  }

}

module.exports = AwaitThenable;
