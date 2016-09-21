#Smarteen App Challenge 2016 Today's Feeling API

============

##Database Schema
---------------
###User Schema

> _id : User's inherent id. String

> id : User's Login id. String

> password : User's Login Password. String

> user_type : User's Account type. Boolean

>> true : Normal User

>> false : Seller

> age : User's age. Number

> gender : User's Gender. String

> auth_token : Auto Login Access Token. String



###Place Schema

> _id : Place's inherent id. String

> place_name : Place's name. String

> place_seller : Place's Seller's id. String

> open_time : Place's opening time. String

> close_time : Place's closing time. String

> place_silence : Place's noize level. Number

> place_bright : Place's brightness. Number

> place_temp : Place's Temperature. Number.

> place_address : Place's Stringified Address. String

> place_category : Place's Category. String

> seller_talk : Seller's introduce of Place. String

> rate_average : Place's rating Average. String



###Review Schema

> _id : Review's inherent id. String

> place_id : Place's id of review. String

> writer_id : Writer's id of review. String

> writer_name : Writer's name of review. String

> review_content : Review's contents. String

> place_rate : Review's Rating for Place. String



##API Docs
-----------

* /auth/facebook/token : facebook token auth - GET

> Requiring params

>> access_token : fb oauth token. String

> Response

>> fb user data json




* /auth/register : Seller register - POST

> Requiring params

>> id : Seller's Login id. String

>> password : Seller's Login Password. String

> Response




* /auth/authenticate : Seller Auto Login With auth_token - POST

> Requiring params

>> auth_token : Seller's Access Token. String

> response

>> User Schema




* /place/list : Place List - POST

> Requiring params

>> none

> Response

>> Place Schema List



* /place/add : Place Adding (ONLY FOR SELLER) - POST

> Requiring params

>> seller_id : Seller's id. String

>> place_name : Place's name. String

>> place_address : Place's Stringified Address. String

>> place_category : Place's Category. String

>> seller_talk ; Seller's introduce of place. String

>> time_open : Place Opening Time. String

>> time_close : Place Closing Time. String

> Response

>> Place Schema




* /place/update : Place Updating - POST

> Requiring params

>> place_id : Place's id. String

> Response

>> Place Schema





* /place/{place_id} : displays place info - GET

> Requiring Params

>> place_id : Place's id. String

> Response

>> Place Schema





* /review/write : Writing review of place - POST

> Requiring Params

>> place_id : Place’s id. (String)

>> writer_id : Writer’s id. (String)

>> writer_name : Writer’s name. (String)

>> review_content : Review’s contents. (String)

>> place_rate : Place’s rating. (String)

>> place_theme : Place's Theme. (String)

> Response

>> Review Schema





* /review/{place_id} : Displays Review by Place_id - GET

> Requiring Params

>> place_id : Place's id. String

> Response

>> Review Schema Array





* /me/info : My info - POST

> Requiring Params

>> id : User's id. String

> Response

>> User Schema of me





* /me/review : My Reviews - POST

>Requiring Params

>> id : User's id. String

> Response

>> Review Array of me
