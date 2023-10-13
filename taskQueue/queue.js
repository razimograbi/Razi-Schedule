class Queue {
    constructor() { this._items = []; }
    enqueue(item) { this._items.push(item); }
    dequeue()     { return this._items.shift(); }
    get size()    { return this._items.length; }
  }
  
  class AutoQueue extends Queue {
    constructor() {
      super();
      this._pendingPromise = false;
    }
  
    enqueue(action) {
      return new Promise((resolve, reject) => {
        super.enqueue({ action, resolve, reject });
        this.dequeue();
      });
    }
  
    async dequeue() {
     
  
      let item = super.dequeue();
  
      if (!item){
        console.log("EMPTY");
        return false;
      }
  
      try {
        this._pendingPromise = true;
        console.log("Hello!");
  
        let payload = await item.action(this);
        console.log("AFTER");
  
        this._pendingPromise = false;
        item.resolve(payload);
      } catch (e) {
        this._pendingPromise = false;
        item.reject(e);
      } finally {
        this.dequeue();
      }
  
      return true;
    }
  }
  
  // Helper function for 'fake' tasks
  // Returned Promise is wrapped! (tasks should not run right after initialization)
  let _ = ({ ms, ...foo } = {}) => () => new Promise(resolve => setTimeout(resolve, ms, foo));
  // ... create some fake tasks
  let p1 = _({ ms: 500, url: '❪𝟭❫', data: { w: 1 } });
  let p2 = _({ ms: 20, url: '❪𝟮❫', data: { x: 2 } });
  let p3 = _({ ms: 70, url: '❪𝟯❫', data: { y: 3 } });
  let p4 = _({ ms: 30, url: '❪𝟰❫', data: { z: 4 } });
  
  const aQueue = new AutoQueue();
  const start = performance.now();
  
  aQueue.enqueue(p1).then(({ url, data }) => console.log('%s DONE %fms', url, performance.now() - start)); //          = 50
  console.log("ENTERING p2 ZONE");
  aQueue.enqueue(p2).then(({ url, data }) => console.log('%s DONE %fms', url, performance.now() - start)); // 50 + 20  = 70
  console.log("ENTERING p3 ZONE");
  aQueue.enqueue(p3).then(({ url, data }) => console.log('%s DONE %fms', url, performance.now() - start)); // 70 + 70  = 140
  console.log("ENTERING p4 ZONE");
  aQueue.enqueue(p4).then(({ url, data }) => console.log('%s DONE %fms', url, performance.now() - start)); // 140 + 30 = 170
  console.log("p4 is zone");