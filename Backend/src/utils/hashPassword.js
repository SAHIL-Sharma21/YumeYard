//making utility function which will hash our passwords

//using bcrypt libraray npm package
import bcrypt from 'bcrypt'


const hashPassword = async (password) => {

    if (!password) return null;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(`password cannot be hashed ERR: ${error}`);
    }
}


export { hashPassword }

