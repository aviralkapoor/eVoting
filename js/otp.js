

module.exports={
    generateOTP:function () { 
          
    var digits = '0123456789'; 
    var OTP = ''; 
    for (i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
}
};