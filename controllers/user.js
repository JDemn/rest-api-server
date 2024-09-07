
const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const User = require("../models/user");
const AuthModel = require('../models/auth');
const { 
    ERROR_MESSAGES,
    USER_ROLES 
} = require("../constants/constants");

/**
 * @method POST
 * @route /api/user/create
 * @description Create a new user and store authentication details
 * @access Private
 * @param {Object} req.body - The user data including name, email, password, and role
 * @returns {Object} 201 - Success message and newly created user
 * @returns {Object} 400 - Error if the user already exists
 * @returns {Object} 403 - Error if the role provided is not valid
 * @returns {Object} 500 - Server error message
 */
const createUser = async (req = request, res = response , next) => {
    try {
        const { ...data } = req.body;
        const existUsr = await User.findOne({
            email: data?.email
        })

        if (existUsr) {
            return res.status(400).json({
                msg: 'El usuario que intenta crear, ya existe'
            })
        }
        if (!Object.values(USER_ROLES).includes(data?.role)) {
            return res.status(403).json({
                msg: ERROR_MESSAGES?.NOT_VALID_ROLE
            })
        }
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(data.password, salt);



        const newUser = await User.create(data);

        const authentication = {
            user: newUser._id,
            password: hashedPassword,
        }
        const authenticationInMongo = await AuthModel.create(authentication);

        await authenticationInMongo.save()
        await newUser.save();
        
        return res.status(201).json({
            msg: 'Usuario creado exitosamente',
            newUser
        })
    } catch (error) {        
        next( error );
    }
}

/**
 * @method GET
 * @route /api/users
 * @description Retrieve a paginated list of users
 * @access Private
 * @param {number} [limite=20] - The number of users to retrieve (optional, default is 20)
 * @param {number} [desde=0] - The offset from where to start retrieving users (optional, default is 0)
 * @returns {Object} 200 - Success message, total number of users, and list of users
 * @returns {Object} 500 - Server error message
 */
const getUsers = async ( req = request, res = response , next ) => {
    try {
        const { limite = 20, desde = 0 } = req.query;
        const query = { state: true };

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            msg: 'Usuarios traídos con éxito',
            total,
            users
        });
    } catch (error) {
        next( error )
    }
}

/**
 * @method GET
 * @route /api/user/:id
 * @description Retrieve a user by their ID
 * @access Private
 * @param {string} id - The ID of the user to retrieve
 * @returns {Object} 200 - Success message and user data
 * @returns {Object} 404 - Error message if user not found
 * @returns {Object} 500 - Server error message
 */
const getUserById = async ( req = request, res = response, next ) => {
    try {
        const userById = req?.params?.id;

        const user = await User.findOne({
            _id: userById,
            state: true
        });

        if (!user) {
            return res.status(404).json({ msg: ERROR_MESSAGES?.NOT_FOUND });
        }

        return res.status(200).json({ user });

    } catch (error) {
        next( error )
    }
}

/**
 * @method PUT
 * @route /api/user/update/:id
 * @description Update user data by their ID
 * @access Private
 * @param {string} id - The ID of the user to update
 * @param {Object} body - The user data to update (excluding password)
 * @returns {Object} 200 - Success message and updated user data
 * @returns {Object} 404 - Error message if user not found
 * @returns {Object} 400 - Error message if role is not valid
 * @returns {Object} 500 - Server error message
 */
const updateUser = async ( req = request, res = response , next ) => {
    try {
        const userById = req?.params?.id;
        const { password, ...data } = req?.body;
        const user = await User.findOne({
            _id: userById,
            state: true
        });

        if (!user) {
            return res.status(404).json({ msg: ERROR_MESSAGES?.NOT_FOUND });
        }
        if (user?.role && !Object.values(USER_ROLES).includes(user?.role)) {
            return res.status(400).json({
                msg: ERROR_MESSAGES?.NOT_VALID_ROLE
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userById, data, {
            new: true,
            runValidators: true
        });

        return res.status(200).json({
            msg: 'Usuario actualizado exitosamente',
            user: updatedUser
        });

    } catch (error) {
        next( error )
    }
}

/**
 * @method DELETE
 * @route /api/user/delete/:id
 * @description Delete a user by their ID and remove associated authentication data if it exists
 * @access Private
 * @param {string} id - The ID of the user to delete
 * @returns {Object} 200 - Success message and deleted user data
 * @returns {Object} 404 - Error message if user not found
 * @returns {Object} 500 - Server error message
 */
const deleteUser = async ( req = request, res = response , next ) => {
    try {
        const { id } = req?.params;
        const userToDelete = await User.findById(id);
        
        if (!userToDelete) {
            return res.status(404).json({ error: ERROR_MESSAGES?.NOT_FOUND });
        }
        const authDocument = await AuthModel.findOne({ user: id });

        const deletedUser = await User.findByIdAndDelete(id);  
        if( authDocument ){
            await AuthModel.deleteOne({
                user : id
            });
        }     

        return res
            .status(200)
            .json({ msg: "Usuario eliminado exitósamente!", deletedUser });            
    } catch (error) {
        next( error )
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}