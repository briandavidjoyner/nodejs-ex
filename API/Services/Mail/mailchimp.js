var Mailchimp = require('mailchimp-api-v3')
var apiKey = process.env.mailchimpAPIKey;
var list_id = process.env.mailchimpListID;
var mailchimp = new Mailchimp(apiKey);
var Promise = require('promise');
var md5 = require('md5');

exports.subscribe = function(email,size,brand){
  return new Promise(function(resolve,reject){
    mailchimp.put('/lists/' + list_id + '/members/' + md5(email),
    {
      email_address: email,
      double_optin: false,
      status: 'subscribed',
      merge_fields:{
        Size:size, 
        Brand:brand
      }
    })
    .then(function(results){
      resolve({status:'success',inputs:{email:email,size:size,brand:brand},results:results});
    }).catch(function(error){
      if (error.error) {
          resolve (error);
        } else {
          resolve(error);
          //resolve ({'status':'error'});
        }
    });
  });
};









/*
exports.subscribe = function(email, brand, size){
  
  return new Promise(function(resolve,reject) {
    
    mailchimp.lists.subscribe({
  		id: list_id, 
  		email:{ email:email },
  		double_optin: false,
  		update_existing: true,
      merge_vars:{
        Size:size, 
        Brand:brand
      }
  	}, function(data) {
      	resolve ({'status':'success'});
    },
    function(error) {
      	if (error.error) {
          resolve (error);
      	} else {
          resolve ({'status':'error'});
    	  }
	  });
  });
};
*/