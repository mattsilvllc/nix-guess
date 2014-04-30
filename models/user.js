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
  },

  stats: function (user) {
    var deffered = Q.defer();
    var sql = 'SELECT COUNT(*) AS response_count, SUM(is_correct) AS response_correct ' +
        'FROM `nutritionix-lab`.`guess_user_response` WHERE user_id=?';

    DB.query(sql, [user.id], function (error, result) {
      if(error) return deffered.reject(error);
      
      result = {
        correct: result[0].response_correct,
        all: result[0].response_count
      };
      deffered.resolve(result);
    });

    return deffered.promise;
  },

  results: function (user) {
    var deffered = Q.defer();
    var sql = 'SELECT * FROM `nutritionix-lab`.`guess_user_response` WHERE user_id=? ' +
        'ORDER BY id DESC LIMIT 10';

    DB.query(sql, [user.id], function (error, result) {
      if (error) return deffered.reject(error);
      
      result.map(function (guess) {
        guess.percent = Math.abs(guess.item_calories - guess.user_calories);
        guess.percent = (guess.percent / guess.item_calories) * 100;
        
        guess.percent = Math.round(guess.percent);
        return guess;
      });
      
      deffered.resolve(result);
    });

    return deffered.promise;
  }
};
