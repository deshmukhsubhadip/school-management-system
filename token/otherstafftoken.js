import jwt from 'jsonwebtoken';

const sendCookiestaff = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETstaff);

    res
        .status(statusCode)
        .cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 60 minutes
        })
        .json({
            success: true,
            message,
            user
        });
};

export default sendCookiestaff;
