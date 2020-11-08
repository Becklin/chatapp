function Message(type, content, user, date) {
  return {
    id: Math.random(),
    type,
    content,
    user,
    date,
    getAll() {
      return this.id + this.user;
    },
  };
}
s