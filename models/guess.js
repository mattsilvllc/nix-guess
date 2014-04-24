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
  }
};
