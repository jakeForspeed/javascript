const backBtn = document.querySelector('.backBtn')
const sendOTPBtn = document.querySelector('#sendOtpBtn')
const verifyBtn = document.querySelector('#verifyBtn')
const moblieVerification = document.querySelector('.mobile-verification')
const otpVerification = document.querySelector('.otp-verification')
const number = document.querySelector('#number')
const textNumber = document.querySelector('.text-number')
const expireText = document.querySelector('.expire-text')
const mkeypads = document.querySelectorAll('.keypad .m-btns')
const okeypads = document.querySelectorAll('.keypad .o-btns')
const resendOTP = document.querySelector('.resend')


// console.log(keypads)

const inputs = document.querySelectorAll('.code-input input')

console.log(inputs.length)

let kid = 0

okeypads.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        
    })
})

mkeypads.forEach((btn)=>{
    btn.addEventListener('click',()=>{

        if(number.value.length !== 11){
            number.value += btn.innerHTML 
            console.log(number.value)
            console.log(number.value.length)
        }
    })
})


5697

// OTP
let expire = 15
let OTP
let countDown
let yourinputNumber
let yourCode = ''



backBtn.addEventListener('click',()=>{
    moblieVerification.style.transform = 'translateX(0)'
    
    otpVerification.style.transform = 'translateX(340px)'
    
    console.log(1)
})


sendOTPBtn.addEventListener('click', function(){

   
    
    let num = number.value

    if(num.length !== 0){
        if(num.length == 11){
            
           OTP = randomOTP() 

           alert(`OTP: ${ OTP}`)



           moblieVerification.style.transform = 'translateX(-300px)'
           otpVerification.style.transform = 'translateX(0)'


           console.log(inputs[0])

           inputs[0].focus()


           textNumber.innerText = number.value.split('').slice(0,7).join('').toString() + '****'

           
            
            countdown = setInterval(() => {
                expire--;
                expireText.innerText = expire + 's'
                if(expire===0){
                    clearInterval(countdown)
                    resendOTP.style.display = 'block'
                    resendOTP.addEventListener('click',()=>{
                        let newOtp = randomOTP()
                        alert(`OTP: ${ newOtp }`)
                        OTP = newOtp
                        console.log(OTP)
                        yourCode = ''
                        inputs.forEach((input) => {
                            input.value = ''
                        })
                        inputs[0].focus()
                        expire = 15
                    })
                }
            }, 1000);

            

            

            inputs.forEach((input) => {
                input.addEventListener('keyup',(e)=>{

                    let element = e.target;

                    yourCode += element.value

                    if(element.nextElementSibling){
                        element.nextElementSibling.focus()
                    }

                })
            })

            verifyBtn.addEventListener('click',()=>{
                console.log(OTP)
                console.log(yourCode)

                
                if(expire !== 0){
                    if(yourCode.trim() === OTP){
                        console.log('verified')
                    }else{
                        console.log('invalid')
                        yourCode = ''
                    }
                }else{
                    console.log('OTP expired')
                }

            })

        }
    }

    
})




function randomOTP(){
    let random = '';
    Array.from({ length: 4 }, ()=>{
        random += Math.floor(Math.random()*10).toString()
    })
    return random
}


8887