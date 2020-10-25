function Message(type, data, user) {
  return {
    id: Math.random(),
    type,
    data,
    user,
    getAll() {
      return this.id + this.user;
    },
  };
}
