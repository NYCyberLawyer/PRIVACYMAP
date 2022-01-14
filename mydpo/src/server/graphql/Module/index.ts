import {objectType} from "nexus";

const Module = objectType({
    name: 'Module',
    definition(t) {
        t.model.id()
        t.model.name()
    }
})

export default [Module]