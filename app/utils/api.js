var axios = require('axios');

module.exports = {
  fetchMatchingFoods: function(food){
    var encodedURI = window.encodeURI('https://api.otreeba.com/v1/studies/conditions/' + food + '?count=10&sort=-year');

    return axios.get(encodedURI)
      .then(function(response){
        return response.data;
      })
  }
}

