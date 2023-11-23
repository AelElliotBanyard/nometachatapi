db.createUser({
  user: "nometa",
  pwd: "donotlikemeta69",
  roles: [
    {
      role: "readWrite",
      db: "noMetaChatDB",
    },
  ],
});
