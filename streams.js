import { pipeline, Readable, Writable } from 'node:stream'
import { promisify } from 'node:util'

const asyncPipeLine = promisify(pipeline)

function * waterExtractor () {
  for(let i = 0; i < 1e5; i++){
    const matter = {
      water: {
        mlQuantity: Math.random()
      }
    }
    yield matter
  }
}

const fillTank = new Readable({
  read(){
    for(const chunk of waterExtractor()){
      this.push(chunk)
    }
    this.push(null)
  }
})