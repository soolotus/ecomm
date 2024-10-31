const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async comparePasswords(saved, supplied) {
    // saved -> password saved in our database. 'hashed.salt'
    // supplied -> password given to us by a user trying sign in
    //
    // const result = saved.split(".");
    // const hashed = result[0];
    // const salt = result[1];
    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuf.toString("hex");
  }

  async create(attrs) {
    // {email: "", password: ""}
    attrs.id = this.randomId();
    const salt = crypto.randomBytes(8).toString("hex");
    // crypto.scrypt(attrs.password, salt, 64, (err, buf) => {
    //   const hashed = buf.toString("hex");
    // }); => Turn it into Promise
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = { ...attrs, password: `${buf.toString("hex")}.${salt}` };
    records.push(record);

    await this.writeAll(records);

    return record;
  }
}
module.exports = new UsersRepository("users.json");
