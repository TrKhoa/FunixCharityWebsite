const User = require('../model/User');

exports.postUserAdd = async (req, res) => {
    try {
        const userInfo = req.body.data;
        /*
        await User.findOne({ username: userInfo.username }).then(
            (userExist) => {
                if (!userExist) {
                    const user = new User(userInfo);
                    user.save()
                        .then((e) => {
                            return res.status(201).send({
                                error: false,
                                message:
                                    "Tạo user thành công, xin hãy đăng nhập lại",
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    return res
                        .status(202)
                        .send({ error: true, message: "Username đã tồn tại" });
                }
            }
        );*/
    } catch (err) {
        console.error(err);
    }
    
};