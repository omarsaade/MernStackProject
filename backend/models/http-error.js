class HttpError extends Error {
  constructor(message, errorCode) {
    // Inheriting classes should call the parent class constructor function
    //with super() if they also have a constructor function.
    super(message); // Add A "message" property ka 2anal elet
    this.code = errorCode; // Adds a "code" property /    int code = 404
  }
}

module.exports = HttpError;
// A class is a blueprint for a javascript object

/*
const HttpE = new HttpError(); // message and code only
console.log(HttpE);

The super() function is used to give access to methods and properties of a parent
 or sibling class.
 The super() function returns an object that represents the parent class.
Error() constructor
The Error() constructor creates an error object.


Thanks Max for answering.

But, can i do this!

class HttpError extends Error{
    constructor(message, errorCode){
        super();
        this.message = message;
        this.code = errorCode;
    }
}
Thank You



Max:
Sure, this is simply an alternative pattern - important is that you call super().
 So why not forward the data to it then?


*/
