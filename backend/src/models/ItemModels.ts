import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import db from '../config/Database';

interface ItemAttributes {
  itemId: number;
  uuid: string;
  name: string;
  category: string;
  price: number;
  image: string;
  url: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'itemId' | 'uuid' | 'createdAt' | 'updatedAt'> {}

class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  public itemId!: number;
  public uuid!: string;
  public name!: string;
  public category!: string;
  public price!: number;
  public image!: string;
  public url!: string;
  public available!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Item.init({
  itemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  sequelize: db,
  tableName: 'items',
  timestamps: false,
  freezeTableName: true
});

(async () => {
  await db.sync();
})();

export default Item;
