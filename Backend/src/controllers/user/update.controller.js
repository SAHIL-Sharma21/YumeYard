//making update controller here.
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { requestHandler } from "../../utils/requestHandler.js"
import { cloudinaryLink } from "../../utils/uploadOnCloudinary.js"
import bcrypt from "bcrypt";
import { hashPassword } from "../../utils/hashPassword.js"



//update profile
//i want to make only username and name can be updated buy the user.
const updateProfile = requestHandler(async (req, res) => {

    //take new username and name form the user and it will be in re.body
    const { name, username } = req.body;

    // check if username is  provided or not
    if (!name || !username) {
        throw new ApiError(400, "Name and Username are required to update the profile.")
    }

    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "unauthorized access!");
    }

    const user = await prisma.user.findUnique(
        {
            where: {
                id: userId,
            }
        }
    );

    if (user.username === username || user.name === name) {
        throw new ApiError(400, "Cannot use same credentials again!");
    }

    //find the user and update it
    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name,
            username: username?.toLowerCase(),
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true
        }
    });

    if (!updatedUser) {
        throw new ApiError(500, "Error while updating the profile.")
    };

    //return the updated user
    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "User profile updated successfully!"));
});


//update profile pic or avatar
const updateAvatar = requestHandler(async (req, res) => {

    //taking file path from req.file
    //finding user first
    const user = await prisma.user.findUnique(
        {
            where: {
                id: req.user?.id,
            }
        }
    );

    if (!user) {
        throw new ApiError(401, "You are not authorized!");
    }

    const localFilePath = req.file?.path;
    if (!localFilePath) {
        throw new ApiError(400, "avatar image is required.")
    }

    const updatedLink = await cloudinaryLink(localFilePath);

    //updating the avatar in db
    const avatarUpdated = await prisma.user.update(
        {
            where: {
                id: user?.id,
            },
            data: {
                avatar: updatedLink?.url,
            },
            select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        }
    );

    if (!avatarUpdated) {
        throw new ApiError(500, "Error while updating avatar!");
    }

    //return the response
    return res
        .status(200)
        .json(new ApiResponse(200, avatarUpdated, "Avatar updated successfully!"));
});

//change password function
const changeUserPassword = requestHandler(async (req, res) => {
    //taking old password and new password
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
        throw new ApiError(400, "old password and new password are required");
    }

    if (oldPassword === newPassword) {
        throw new ApiError(400, "new password must be diffrent.");
    }

    if (newPassword !== confirmPassword) {
        throw new ApiError(401, "new password and confirm password are not same.");
    }

    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "You are not authorized");
    }

    const user = await prisma.user.findUnique(
        {
            where: {
                id: userId
            }
        }
    );

    //check the oldpassword with db stored password if correct then he can change to new password
    const validUser = await bcrypt.compare(oldPassword, user.password);

    if (!validUser) {
        throw new ApiError(401, "Incorrect Password!");
    }

    //old password is correct now we can hash the password and save to db
    const changedPassword = await hashPassword(newPassword);


    const passwordChange = await prisma.user.update(
        {
            where: {
                id: userId,
            },
            data: {
                password: changedPassword,
            }
        }
    );

    if (!passwordChange) {
        throw new ApiError(500, "Error while changing the password.")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Pasword changed successfully!"));
});


export { updateProfile, updateAvatar, changeUserPassword };