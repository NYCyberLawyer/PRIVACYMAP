import { objectType } from "nexus";

const Module = objectType({
  name: "Module",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
  },
});

export default [Module];
