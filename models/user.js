module.exports = {
  create: function (user) {
    var deffered = Q.defer();
    var sql = 'insert into guess_user set ?';
    var self = this;

    user.created_at = new Date();

    DB.query(sql, user, function (error, result) {
      if(error) return deffered.reject(error);
      self.find_by_id(result.insertId).then(deffered.resolve, deffered.reject);
    });

    return deffered.promise;
  },

  update: function (id, data) {
    var deffered = Q.defer();
    var sql = 'update guess_user set fb_token = ?, last_login = ? where id = ?';
    var self = this;

    data.push(id);
    DB.query(sql, data, function (error) {
      if(error) return deffered.reject(error);
      self.find_by_id(id).then(deffered.resolve, deffered.reject);
    });

    return deffered.promise;
  },

  find_by_id: function (id) {
    var deffered = Q.defer();
    var sql = 'select * from guess_user where id=?';

    DB.query(sql, [id], function (error, result) {
      if(error) return deffered.reject(error);
      deffered.resolve(result[0]);
    });

    return deffered.promise;
  },

  find_by_fb_id: function (fb_id) {
    var deffered = Q.defer();
    var sql = 'select * from guess_user where fb_id=' + fb_id;

    DB.query(sql, function (error, result) {
      if(error) return deffered.reject(error);
      deffered.resolve(result[0]);
    });

    return deffered.promise;
  }
};
