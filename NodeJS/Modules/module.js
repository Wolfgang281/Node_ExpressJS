//! modules --> it is a logical piece of code which can be reused

//? if we want to make this function available outside this current file: we have to export it

//? if we want to use this function outside this file: we have to import it

//! to import/export we have two module systems
//~ a) commonJS syntax (node follows this by default): if we want to export -> module.exports and for import -> require("")
//~ b) ES modules syntax (newer version, used in react by default): if we want to export -> export and for import -> import

//? we have total 3 types of modules
//~ a) user-defined modules: here modules(code) are defined by user and are imported and exported

// ~ b) built-in modules: these are also called core modules. these modules are part of the installation. examples -> fs, http, path, os, crypto, cluster, events, qs, etc...

//~ c) third-party modules
