module.exports = function Message({
  id,
  type = "text",
  content = "",
  user,
  name = "John Doe",
  percent = null,
  date = new Date(),
  address = null,
} = {}) {
  return {
    id: Math.random(),
    type,
    content,
    user,
    name,
    percent,
    date,
    address,
    // getAll() {
    //   return this.id + this.user;
    // },
  };
};
