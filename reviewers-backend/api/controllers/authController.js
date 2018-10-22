modulee.exports = {
  comparePassword: (inputPassword, cb) => {
    if (inputPassword === this.password) {
      cb(null, true);
    } else {
      cb('error');
    }
  }
}