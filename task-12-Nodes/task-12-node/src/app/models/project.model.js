

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
      name: {
        type: Sequelize.STRING
      },
      desc:{
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    return Project;
  };

  