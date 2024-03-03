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

  async getPosts(offset = 0, limit = 10, q) {
    const finalQuery = q !== undefined ? 'SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? ORDER BY created DESC LIMIT ?, ?' : 'SELECT * FROM posts ORDER BY created DESC LIMIT ?, ?';
    const finalParams = q !== undefined ? [ `%${q}%`, `%${q}%`, offset, limit ] : [ offset, limit ];

    const [ rows ] = await this.mysqlPool.execute(finalQuery, finalParams);

    const usersPromises = rows.map(row => this.getUser(row.user_id));
    const users = await Promise.all(usersPromises);

    const licensePromises = rows.map(row => this.getLicense(row.license_id));
    const licenses = await Promise.all(licensePromises);

    return rows.map((row, i) => {
      return {
        id: row.id,
        author: users[i],
        license: licenses[i],
        permalink: row.permalink,
        image_url: rows[0].image_url,
        title: row.title,
        tags: row.tags.split(',').map(tag => tag.trim()),
        content: row.content,
        created: new Date(row.created).getTime(),
        updated: new Date(row.updated).getTime(),
      };
    });
  }

  async getPost(permalink) {
    const [ rows ] = await this.mysqlPool.execute('SELECT * FROM posts WHERE permalink = ?', [ permalink ]);

    if(rows.length === 0)
      return null;

    const licensePromises = rows.map(row => this.getLicense(row.license_id));
    const licenses = await Promise.all(licensePromises);

    return {
      id: rows[0].id,
      author: await this.getUser(rows[0].user_id),
      license: licenses[0],
      permalink: rows[0].permalink,
      image_url: rows[0].image_url,
      title: rows[0].title,
      tags: rows[0].tags.split(',').map(tag => tag.trim()),
      content: rows[0].content,
      created: new Date(rows[0].created).getTime(),
      updated: new Date(rows[0].updated).getTime(),
    };
  }

  async getPostCount(q) {
    const [ rows ] = await this.mysqlPool.execute('SELECT COUNT(*) AS count FROM posts WHERE title LIKE ? OR content LIKE ?', [ q !== undefined ? `%${q}%` : '%', q !== undefined ? `%${q}%` : '%' ]);

    return rows[0].count;
  }

  async getProjects(offset = 0, limit = 10, q) {
    const finalQuery = q !== undefined ? 'SELECT * FROM projects WHERE title LIKE ? ORDER BY created DESC LIMIT ?, ?' : 'SELECT * FROM projects ORDER BY created DESC LIMIT ?, ?';
    const finalParams = q !== undefined ? [ `%${q}%`, offset, limit ] : [ offset, limit ];

    const [ rows ] = await this.mysqlPool.execute(finalQuery, finalParams);

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

  async getProjectCount(q) {
    const [ rows ] = await this.mysqlPool.execute('SELECT COUNT(*) AS count FROM projects WHERE title LIKE ? OR readme LIKE ?', [ q !== undefined ? `%${q}%` : '%', q !== undefined ? `%${q}%` : '%' ]);

    return rows[0].count;
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

  async getGallery(offset = 0, limit = 10, q) {
    const finalQuery = q !== undefined ? 'SELECT * FROM gallery WHERE title LIKE ? ORDER BY id LIMIT ?, ?' : 'SELECT * FROM gallery ORDER BY id LIMIT ?, ?';
    const finalParams = q !== undefined ? [ `%${q}%`, offset, limit ] : [ offset, limit ];

    const [ rows ] = await this.mysqlPool.execute(finalQuery, finalParams);

    const usersPromises = rows.map(row => this.getUser(row.user_id));
    const users = await Promise.all(usersPromises);

    const picturePromises = rows.map(row => this.getPictures(row.id));
    const pictures = await Promise.all(picturePromises);

    const licensePromises = rows.map(row => this.getLicense(row.license_id));
    const licenses = await Promise.all(licensePromises);

    return rows.map((row, i) => {
      return {
        id: row.id,
        author: users[i],
        license: licenses[i],
        title: row.title,
        tags: row.tags.split(',').map(tag => tag.trim()),
        preview: row.preview,
        pictures: pictures[i],
        created: new Date(row.created).getTime(),
        updated: new Date(row.updated).getTime(),
      };
    });
  }

  async getGalleryCount(q) {
    const [ rows ] = await this.mysqlPool.execute('SELECT COUNT(*) as count FROM gallery WHERE title LIKE ?', [ q !== undefined ? `%${q}%` : '%' ]);

    return rows[0].count;
  }

  async getPictures(galleryId) {
    const [ rows ] = await this.mysqlPool.execute('SELECT * FROM pictures WHERE gallery_id = ?', [ galleryId ]);

    return rows.map(row => {
      return {
        id: row.id,
        type: row.type,
        name: row.name,
        url: row.url
      };
    });
  }

  async getUser(id) {
    const [ rows ] = await this.mysqlPool.execute('SELECT id, display_name, username, created, updated FROM users WHERE id = ?', [ id ]);

    rows[0].created = new Date(rows[0].created).getTime();
    rows[0].updated = new Date(rows[0].updated).getTime();

    return rows[0];
  }

  async getUserFromUsername(username) {
    const [ rows ] = await this.mysqlPool.execute('SELECT id, display_name, username, profile_picture, public_key, created, updated FROM users WHERE username = ?', [ username ]);

    if(rows.length === 0)
      return null;

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