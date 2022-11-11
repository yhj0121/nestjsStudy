import * as express from "express"
import {Cat,CatType} from "./model"
import catRouter from "./router/catRouter"
const port:number = 8000

//싱글톤 패턴
//인스턴스화해서 기능 나눔
class Server {
  public app: express.Application 
    constructor(){
      const app:express.Application = express();
      this.app = app;
    }

    private SetRoute()
    {
      this.app.use('/',catRouter)

    }
    private setMiddleware()
    {
      this.app.use(express.json())
      this.app.use((req,res,next)=>{
      res.send({error:"404 not found"})
      next(); //라우터를 찾게 하는거
});

    }

    public listen()
    {
      this.setMiddleware();
      this.SetRoute();
      this.app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    }
}

function init()
{
  const server = new Server();
  server.listen();
}

init();