module.exports = (sequelize, Sequelize) => {
    const Auth = sequelize.define("auth", {
        username:{
            type:Sequelize.STRING,
            allowNull:false,
            unique: true
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            unique: true
        },
        gender:{
            type:Sequelize.STRING,
            allowNull:false
        },
        phone:{
            type:Sequelize.BIGINT,
            allowNull:false
        },
        address:{
            type:Sequelize.STRING
        },
        isadmin:{
            type:Sequelize.BOOLEAN,
            defaultValue: false

        },
        password:{
            type:Sequelize.STRING,
            allowNull:false
        }

    });
    return Auth;
}