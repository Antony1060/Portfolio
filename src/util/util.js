import qs from "querystring"

const baseUrl = process.env.VUE_APP_BACKEND_URL

export default {
  /**
   * 
   * @param  {...JSON} json
   * @returns {JSON} Final concatinated JSON
   */
  concatJson(...jsons) {
    let finalJson = {};

    for(let json of jsons) {
      for(let key in json) {
        finalJson[key] = json[key]
      }
    }
    
    return finalJson
  },

  /**
   * 
   * @param {String} url
   * @param {Object} options 
   * @param {Object} data
   * @returns {Promise} Promise from request
   */
  request(url, options, data, method) {
    if(!options) options = {}
    if(!data) data = {}
    if(!method) method = "POST"

    return new Promise((resolve, reject) => {
      if(!url.startsWith("/")) url = `/${url}`;
      fetch(`${baseUrl}${url}`, this.concatJson({
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": localStorage.getItem("jwtToken")
        },
      }, options, { body: method === "HEAD" || method === "GET" ? null : qs.stringify(data) })).then(async res => {
        const response = await res.json();
        if(res.status < 200 || res.status >= 300) {
          reject(response.error ? response.error : res.status);
          return
        }
        if(response.tokenData) {
          if(!response.tokenData.valid) {
            localStorage.removeItem("jwtToken");
            reject("Invalid JWT Token");
            return
          }
        }
        resolve(response)
      }).catch(reject)
    })
  }
}
