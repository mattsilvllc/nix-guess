module.exports = {
  random: function (user) {
    var deffered = Q.defer();
    var sql = 'SELECT * FROM `nutritionix-api`.items_with_package_photos as products ' +
        'where products.upc NOT IN(select upc from `nutritionix-lab`.`guess_user_response`' +
        ' where user_id=?) ORDER BY RAND() LIMIT 1'
    
    DB.query(sql, [user.id], function (error, result) {
      error ? deffered.reject(error) : deffered.resolve(result[0]);
    });
    return deffered.promise;
  },

  handle: function (item_id, answer, user) {
    var deffered = Q.defer();
    var self = this;

    self.already_answered(item_id, user)
    .then(function (has_answered) {
      if (has_answered) return deffered.reject('you have already answered');
      return self.get_item(item_id);
    })
    .then(function (item) {
      if (!item) return deffered.reject('no such item exists');

      var calories = parseFloat(item.nf_calories + '');
      var correct = (answer > calories*0.8 && answer < calories * 1.2);
      var guess = {
        item: item,
        correct: correct,
        answer: answer,
        user: user
      };

      self.save(guess)
      .then(function () {
        var result = {
          correct: correct,
          answer: calories
        };
        deffered.resolve(result);
      })
      .fail(deffered.reject);
    })
    .fail(deffered.reject);

    return deffered.promise;
  },

  get_item: function (id) {
    var deffered = Q.defer();
    var sql = 'SELECT * FROM `nutritionix-api`.items_with_package_photos WHERE upc=?';

    DB.query(sql, [id], function (error, result) {
      error ? deffered.reject(error) : deffered.resolve(result[0]);
    });

    return deffered.promise;
  },

  already_answered: function (upc, user) {
    var deffered = Q.defer();
    var sql = 'SELECT * FROM `nutritionix-lab`.`guess_user_response` WHERE upc=? AND user_id=?';

    DB.query(sql, [upc, user.id], function (error, result) {
      error ? deffered.reject(error) : deffered.resolve(result[0]);
    });

    return deffered.promise;
  },

  save: function (guess) {
    var deffered = Q.defer();
    var obj = {
      user_id: guess.user.id,
      upc: guess.item.upc,
      user_calories: guess.answer,
      item_calories: guess.item.nf_calories,
      item_serving_qty: guess.item.nf_serving_size_qty,
      item_serving_unit: guess.item.nf_serving_size_unit,
      item_image_http: guess.item.image_url,
      item_image_https: guess.item.image_url_ssl,
      item_name: guess.item.item_name,
      item_brand: guess.item.brand_name,
      created_at: new Date(),
      is_correct: guess.correct,
    };

    var sql = 'INSERT INTO `nutritionix-lab`.`guess_user_response` SET ?';
    DB.query(sql, obj, function (error, result) {
      error ? deffered.reject(error) : deffered.resolve();
    });

    return deffered.promise;
  }
};
