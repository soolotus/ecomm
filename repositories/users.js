const fs = require("fs");

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    // // Open the file called this.filename
    // const contents = await fs.promises.readFile(this.filename, {encoding: 'utf8'})
   
    // // Parse the contents
    // const data = JSON.parse(contents)
    // // Return the parsed data
    // return data
return JSON.parse(await fs.promises.readFile(this.filename, {encoding: 'utf8'}))

  }

  async create(attrs){
    // {email: daea, password: dfas}
    const records =await this.getAll()
    records.push(attrs)

    await fs.promises.writeFile(this.filename, JSON.stringify(records))

  }
}
const test = async ()=>{
   const repo =new UsersRepository("users.json");
   
   await repo.create({email:"test", password: "test"})

   const users = await repo.getAll()
    console.log(users)
}

test()