import axios from "axios"
import qs from "querystring"

const baseUrl = "https://backend.antony.red"

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
   * @param {import("axios").AxiosRequestConfig} options 
   * @param {JSON} data
   * @returns {Promise} Promise from request
   */
  request(url, options, data, method) {
    if(!options) options = {}
    if(!data) data = {}
    if(!method) method = "POST"

    return new Promise((resolve, reject) => {
      axios(this.concatJson({
        url: baseUrl + url,
        method,
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": localStorage.getItem("jwtToken")
        } 
      }, options, { data: qs.stringify(data) })).then(response =>  {
        if(response.data.tokenData) {
          if(!response.data.tokenData.valid) {
            localStorage.removeItem("jwtToken")
            reject("Invalid JWT Token")
          }
        }
        resolve(response)
      }).catch(reject)
    })
  }
}
