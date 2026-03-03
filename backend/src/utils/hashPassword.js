import bcrypt from 'bcrypt';

const comparePassword = async ( entered, hashed ) => {
    return await bcrypt.compare(entered, hashed)
};

export default comparePassword;