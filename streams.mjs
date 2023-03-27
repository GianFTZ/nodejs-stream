import { pipeline, Readable, Transform, Writable } from 'node:stream'
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

const extract = new Readable({
  read(){
    for(const chunk of waterExtractor()){
      const stringfied = JSON.stringify(chunk)
      this.push(stringfied)
    }
    this.push(null)
  }
})

const betterWater = new Transform({
  transform(chunk, _ec, cb){
    const data = JSON.parse(chunk)
    data.water.mlQuantity = data.water.mlQuantity - 0.1
    const stringfied = JSON.stringify(data)
    cb(null, stringfied)
  }
})

asyncPipeLine(
  extract, 
  betterWater,
  process.stdout
)