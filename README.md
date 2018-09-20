# Events Around You Service

## Usage

1. **Resource description (API reference tutorial), Endpoints and methods** 

    1.1 POST/register
        Description: For users to register. During registration, users shall provide information about their
        preferences for events, namely the category and genre of the events they are interested in
        attending. These preferences will be used to filter events later.

    1.2 POST/login
        Description: For users to login to use the service. You may choose how/if to maintain sessions. There
        should be authentication checks for each subsequent API call.

    1.3 GET/getEvents
        Description: To get the events corresponding to the user’s preferences. To get this data, existing          preferences have been used, no further data is required. Also external /events API provided has been used. 

    1.4 POST/setPreferences
        Description: To allow the user to change his/her preferences for events

2. **Parameters and Request Example**   
    Parameters include only request paramaters with JSON body.

    2.1 /register
        Request Body:
	
        {
            "email": "email@email.com",
            "password": "pass",
            "firstName": "FirstName",
            "lastName": "LastName",
            "classifications": [
                    {
                        "name": "ClassificationName_1",
                        "genres": [
                            {"genreId": "genre_id_1", "genreName": "Genre1"},
                            {"genreId": "genre_id_2", "genreName": "Genre2"}
                        ]
                    },
                    {
                        "name": "ClassificationName_2",
                        "genres": [
                            {"genreId": "genre_id_3", "genreName": "Genre3"},
                            {"genreId": "genre_id_4", "genreName": "Genre4"}
                        ]
                    }
                ]
        }

    2.2 /login
        Request Body:
	
        {
            "email": "email@email.com",
            "password": "pass"
        }

    2.3 /getEvents
        Request Body:
	
        {
	        "token": "auth_token"
    
        }

    2.4 /setPreferences
        Request Body:
	
        {		
            "token": "auth_token",
            "classifications": [
                    {
                        "name": "ClassificationName_1",
                        "genres": [
                            {"genreId": "genre_id_1", "genreName": "Genre1"},
                            {"genreId": "genre_id_2", "genreName": "Genre2"}
                        ]
                    },
                    {
                        "name": "ClassificationName_2",
                        "genres": [
                            {"genreId": "genre_id_3", "genreName": "Genre3"},
                            {"genreId": "genre_id_4", "genreName": "Genre4"}
                        ]
                    }
                ]
        }

3. **Response example**

    If any URL is passed except the given below, a 404 HTTP Code is returned along with a message stating that
    the page wasn't found.

    3.1 /register

        Success:
	
            HTTP Code: 201
            Example: 
                    {
                        "message": "User registration successful"
                    }

        Failure:
            HTTP Code: 409
            Reason: user already registered
            Example: 
                    {
                        "message": "User already exists"
                    } 

            HTTP Code: 500
            Reason: some error on server
            Example: 
                    {
                        "message": "Server Error"
                    }
    3.2 /login
            HTTP Code: 401
            Reason: authentication failure
            Example: 	 
	    
                    {
                        "message": "Auth Failed"
                    }
		    
            HTTP Code: 200
            Reason: authentication success
            Example: 
	    
                    {
                        "message": "Auth Successful",
                        "token": "auth_token"
                    }
    3.3 /getEvents
            HTTP Code: 200
            Reason: Request OK Completed
            Example: 
	    
                    {
                        "message": "Sucess"
                    }

            HTTP Code: 401
            Reason: authentication failure
            Example: 
	    
                    {
                        "message": "Auth Failed"
                    }
		    
    3.4 /setPreferences

            HTTP Code: 201 
            Reason: Created/success
	    
            {
                "message": "Preferences Changed",
                "preferences": [
                   {
                        "name": "ClassificationName_1",
                        "genres": [
                            {"genreId": "genre_id_1", "genreName": "Genre1"},
                            {"genreId": "genre_id_2", "genreName": "Genre2"}
                        ]
                    },
                    {
                        "name": "ClassificationName_2",
                        "genres": [
                            {"genreId": "genre_id_3", "genreName": "Genre3"},
                            {"genreId": "genre_id_4", "genreName": "Genre4"}
                        ]
                    }
                ]
            }

            HTTP Code: 500
            Reason: Server error
            Example:
	    
            {
                message: "error"
            }
