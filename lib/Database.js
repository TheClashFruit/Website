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

  ///////////

  VERSION_TYPES = {
    MODRINTH: 0,
    CURSEFORGE: 1,
    DIRECT: 2,
    OTHER: 16,
  };

  //////////

  async getPosts(offset = 0, limit = 10) {
    const [ rows ] = await this.mysqlPool.execute('SELECT * FROM posts ORDER BY created DESC LIMIT ?, ?', [ offset, limit ]);

    const usersPromises = rows.map(row => this.getUser(row.user_id));
    const users = await Promise.all(usersPromises);

    return rows.map((row, i) => {
      return {
        id: row.id,
        author: users[i],
        permalink: row.permalink,
        title: row.title,
        tags: row.tags.split(',').map(tag => tag.trim()),
        content: row.content,
        created: new Date(row.created).getTime(),
        updated: new Date(row.updated).getTime(),
      };
    });
  }

  async getProjects(offset = 0, limit = 10) {
    const [ rows ] = await this.mysqlPool.execute('SELECT * FROM projects ORDER BY created DESC LIMIT ?, ?', [ offset, limit ]);

    const versionsPromises = rows.map(row => this.getVersions(row.id));
    const versions = await Promise.all(versionsPromises);

    const licensePromises = rows.map(row => this.getLicense(row.license_id));
    const licenses = await Promise.all(licensePromises);

    return rows.map((row, i) => {
      return {
        id: row.id,
        permalink: row.permalink,
        title: row.title,
        icon: row.icon,
        tags: row.tags.split(',').map(tag => tag.trim()),
        short_readme: row.short_readme,
        readme: row.readme,
        versions: versions[i],
        license: licenses[i],
        created: new Date(row.created).getTime(),
        updated: new Date(row.updated).getTime(),
      };
    });
  }

  async getVersions(project) {
    const [ rows ] = await this.mysqlPool.execute('SELECT * FROM versions WHERE project_id = ?', [ project ]);

    return rows.map(row => {
      return {
        id: row.id,
        version: row.version,
        type: row.type,
        url: row.url,
        uses: row.uses,
      };
    });
  }

  async getUser(id) {
    const [ rows ] = await this.mysqlPool.execute('SELECT id, display_name, username, created, updated FROM users WHERE id = ?', [ id ]);

    rows[0].created = new Date(rows[0].created).getTime();
    rows[0].updated = new Date(rows[0].updated).getTime();

    return rows[0];
  }

  async getLicense(id) {
    const [ rows ] = await this.mysqlPool.execute('SELECT * FROM licenses WHERE id = ?', [ id ]);

    return rows[0];
  }
}

export default Database;