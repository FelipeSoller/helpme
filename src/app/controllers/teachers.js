const {
    age,
    date,
    graduation
} = require("../../lib/utils");
const Intl = require('intl');

module.exports = {
    index(req, res) {
        return
    },
    create(req, res) {
        return
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill out all fields in the form!");
            }
        }
    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill out all fields in the form!");
            }
        }
    },
    delete(req, res) {
        return
    }
}