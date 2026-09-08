const db = require("../../config/db");

class Profile {
  static async get() {
    const profile = await db("profiles").first();
    if (profile && profile.photos) {
      try {
        profile.photos =
          typeof profile.photos === "string"
            ? JSON.parse(profile.photos)
            : profile.photos;
      } catch {
        profile.photos = [];
      }
    }
    return profile;
  }

  static async update(id, data) {
    if (data.aboutMe) data.aboutMe = JSON.stringify(data.aboutMe);
    if (data.photos) data.photos = JSON.stringify(data.photos);
    return db("profiles").where({ id }).update(data);
  }
}

module.exports = Profile;
