import mysql from 'mysql2/promise';

class Database {
  static instance = null;

  mysqlPool = null;

  constructor() {
    if(Database.instance)
      return Database.instance;

    this.mysqlPool = mysql.createPool({
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    Database.instance = this;
  }

  async getPosts(offset = 0, limit = 10) {
    const [ rows ] = await this.mysqlPool.execute('SELECT * FROM posts ORDER BY created DESC LIMIT ?, ?', [ offset, limit ]);

    const usersPromises = rows.map(row => this.getUser(row.user_id));
    const users = await Promise.all(usersPromises);

    return rows.map((row, index) => {
      return {
        id: row.id,
        author: users[index],
        permalink: row.permalink,
        title: row.title,
        tags: row.tags.split(',').map(tag => tag.trim()),
        content: row.content,
        created: new Date(row.created).getTime(),
        updated: new Date(row.updated).getTime(),
      }
    });
  }

  async getUser(id) {
    const [ rows ] = await this.mysqlPool.execute('SELECT id, display_name, username, created, updated FROM users WHERE id = ?', [ id ]);

    rows[0].created = new Date(rows[0].created).getTime();
    rows[0].updated = new Date(rows[0].updated).getTime();

    return rows[0]
  }
}

export default Database;