const fs = require("fs");

exports.getUser = async (req, res, next) => {
    try {
        const userBuffer = fs.readFileSync("user.json");
        const user = JSON.parse(userBuffer);
        res.json({ user });
    } catch (error) {
        next(error);
    }
};

exports.postUser = async (req, res, next) => {
    const newUser = req.body;
    const { name, gender, contact, address, photoUrl } = req.body;

    try {
        let uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
        newUser.id = uid;
        const userBuffer = fs.readFileSync("user.json");
        const user = JSON.parse(userBuffer);
        if (name && gender && contact && address && photoUrl) {
            user.push(newUser);
            fs.writeFileSync("user.json", JSON.stringify(user));
            res.json({ message: "User inserted success" });
        }
        res.json({ message: "All feild is required" });
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userBuffer = fs.readFileSync("user.json");
        const user = JSON.parse(userBuffer);

        const obj = user.find((item) => item.id === id);
        const updatedUser = { ...obj, ...req.body };

        const index = user.findIndex((item) => item.id === id);
        user[index] = updatedUser;

        fs.writeFileSync("user.json", JSON.stringify(user));
        res.json({ message: "User Updated success" });
    } catch (error) {
        next(error);
    }
};

exports.multipleUserUpdate = async (req, res, next) => {
    try {
        let selectedVersions = req.body;
        const userBuffer = fs.readFileSync("user.json");
        let versions = JSON.parse(userBuffer);

        var key = "id";
        versions = versions.map((el) => {
            var found = selectedVersions.find((s) => s[key] === el[key]);
            if (found) {
                el = Object.assign(el, found);
            }
            return el;
        });
        fs.writeFileSync("user.json", JSON.stringify(versions));
        res.json({ message: "User Updated success" });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userBuffer = fs.readFileSync("user.json");
        const user = JSON.parse(userBuffer);

        const obj = user.find((item) => item.id === id);
        if (!obj) {
            return res.json({ message: "User not found" });
        }
        const restUser = user.filter((item) => item.id !== id);
        fs.writeFileSync("user.json", JSON.stringify(restUser));
        res.json({ message: "User deleted success" });
    } catch (error) {
        next(error);
    }
};
