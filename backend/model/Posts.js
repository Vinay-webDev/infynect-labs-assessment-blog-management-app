import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db.js";
import User from "./User.js";

class Post extends Model {}

Post.init(
  {
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    post_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("Personal", "Tech", "Travel", "Food"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Draft", "Published"),
      allowNull: false,
      defaultValue: "Draft",
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "blog_posts",
    timestamps: false,
    hooks: {
      beforeUpdate: (post) => {
        post.updated_date = new Date();
      },
    },
  }
);


User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

export default Post;
