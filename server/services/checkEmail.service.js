import User from "../models/user.js";

export default (email) => {
    User.findOne({ email: email }).exec((error, user) => {
        if (error) return res.status(500).json({ message: error.message });
        if (!user) return res.status(404).json({ message: "Email not found" });
        else return res.status(200).json({ message: "Email found" });
    });
};