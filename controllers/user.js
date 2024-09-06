
const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const User = require("../models/user");
const AuthModel = require('../models/auth');
const { ERROR_MESSAGES, USER_ROLES } = require("../constants/constants");

const createUser = async (req = request, res = response) => {
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
        if( !Object.values(USER_ROLES).includes(data?.role) ){
            return res.status(403).json({
                msg : ERROR_MESSAGES?.NOT_VALID_ROLE
            })
        }
        const salt = bcryptjs.genSaltSync(12);
        const hashedPassword = bcryptjs.hashSync(data.password, salt);

        

        const newUser = await User.create(data);

        const authentication = {
            user: newUser._id,
            password : hashedPassword,
        }
        const authenticationInMongo = await AuthModel.create(authentication);

        await authenticationInMongo.save()
        await newUser.save();

        return res.status(201).json({
            msg: 'Usuario creado exitosamente',
            newUser
        })
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({
            msg: ERROR_MESSAGES?.SERVER_ERROR            
        })
    }
}

const getUsers = async (req = request, res = response) => {
    try {
        const { limite = 20, desde = 0 } = req.query;
        const query = { state: true };

        const [ total, users ] = await Promise.all([
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
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({
            msg: ERROR_MESSAGES?.SERVER_ERROR
        })
    }
}

const getUserById = (req = request, res = response) => {
    try {
        return res.status(201).json({
            msg: 'llamando api'
        })
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({
            msg: `Error en el sistema, comuniquese con el administrador`
        })
    }
}

const updateUser = (req = request, res = response) => {
    try {
        return res.status(201).json({
            msg: 'llamando api'
        })
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({
            msg: `Error en el sistema, comuniquese con el administrador`
        })
    }
}

const deleteUser = (req = request, res = response) => {
    try {
        return res.status(201).json({
            msg: 'llamando api'
        })
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({
            msg: `Error en el sistema, comuniquese con el administrador`
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}